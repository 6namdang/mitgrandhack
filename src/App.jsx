import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router"; 
import { supabase } from "./lib/SupabaseClient.js";

// Components
import LandingPage from "./components/LandingPage.jsx";
import AuthPage from "./components/AuthPage.jsx";
import Onboarding from "./components/Onboarding.jsx"; // New Onboarding Flow
import Dashboard from "./components/Dashboard.jsx";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
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
        {/* Public Landing Page */}
        <Route 
          path="/" 
          element={!session ? <LandingPage /> : <Navigate to="/dashboard" />} 
        />

        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={!session ? <AuthPage /> : <Navigate to="/dashboard" />} 
        />
        <Route path="/signup" element={<Navigate to="/login" />} />

        {/* Onboarding Route: 
            This is the bridge between Signup and Dashboard.
        */}
        <Route 
          path="/onboarding" 
          element={session ? <Onboarding /> : <Navigate to="/login" />} 
        />

        {/* Protected Dashboard */}
        <Route 
          path="/dashboard" 
          element={session ? <Dashboard session={session} /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}