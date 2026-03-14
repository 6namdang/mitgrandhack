import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router"; // Use 'react-router-dom' if standard
import { supabase } from "./lib/SupabaseClient.js";
import Dashboard from "./components/Dashboard.jsx";

import BurxOnboarding from "./components/BurxOnboarding.jsx";
import AuthPage from "./components/AuthPage.jsx"; // The new consolidated component

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing/Onboarding */}
        <Route 
          path="/" 
          element={!session ? <BurxOnboarding /> : <Navigate to="/dashboard" />} 
        />

        {/* Unified Auth Route */}
        <Route 
          path="/login" 
          element={!session ? <AuthPage /> : <Navigate to="/dashboard" />} 
        />
        
        {/* Redirect /signup to /login so the toggle handles it */}
        <Route path="/signup" element={<Navigate to="/login" />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={session ? <Dashboard session={session} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}