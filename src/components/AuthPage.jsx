import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./Signup";

export default function AuthPage() {
  // Logic to toggle between Login and Signup
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${isLogin ? 'bg-blue-600/10' : 'bg-indigo-600/10'}`} />
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${isLogin ? 'bg-indigo-600/10' : 'bg-blue-600/10'}`} />

      <div className="w-full max-w-[440px] z-10 transition-all duration-500 ease-in-out">
        {isLogin ? (
          <Login onSwitch={() => setIsLogin(false)} />
        ) : (
          <SignUp onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
}