// client/src/pages/HomeTailwind.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HomeTailwind() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <header className="flex items-center justify-between px-6 py-4 bg-blue-700 text-white">
        <h1 className="text-2xl font-bold">Passify</h1>
        <nav className="flex gap-4">
          <Link to="/subjects" className="hover:underline">A/L</Link>
          <Link to="/subjects" className="hover:underline">O/L</Link>
          <Link to="/login" className="bg-white text-blue-700 px-3 py-1 rounded-md">Log In / Register</Link>
        </nav>
      </header>

      <main className="px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold text-blue-800">විභාග ජයගැනීමේ ඔබේ මඟ - <span className="text-blue-900">Passify</span></h2>
        <p className="mt-4 text-gray-700">O/L සහ A/L සඳහා සිසුන්ට අදාළ නිවැරදි මාර්ගෝපදේශ හා past papers.</p>
        <Link to="/subjects" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md">විෂයයන් ගවේෂණය කරන්න</Link>
      </main>
    </div>
  );
}
