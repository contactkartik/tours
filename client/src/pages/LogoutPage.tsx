import React from "react";
import { useLocation } from "wouter";

export default function LogoutPage() {
  const [, setLocation] = useLocation();
  React.useEffect(() => {
    localStorage.removeItem("user");
    setTimeout(() => setLocation("/"), 1000);
  }, [setLocation]);
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Logged Out</h1>
        <p className="mb-6">You have been logged out. Redirecting to home...</p>
      </div>
    </div>
  );
}
