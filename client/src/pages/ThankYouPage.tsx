import React from "react";
import { useLocation } from "wouter";

export default function ThankYouPage() {
  const [, setLocation] = useLocation();
  const user = localStorage.getItem("user");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
        <p className="text-lg mb-4">{user ? `Dear ${user}, your booking is confirmed.` : "Your booking is confirmed."}</p>
        <p className="mb-6">We will contact you shortly with further details.</p>
        <button className="bg-primary text-white px-6 py-2 rounded font-bold" onClick={() => setLocation("/")}>Go to Home</button>
      </div>
    </div>
  );
}
