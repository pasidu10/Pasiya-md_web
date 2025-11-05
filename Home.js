// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* 🔹 Header Section */}
      <header className="header">
        <h1 className="logo">Passify</h1>
        <nav className="nav">
          <Link to="/subjects" className="nav-link">A/L</Link>
          <Link to="/subjects" className="nav-link">O/L</Link>
          <Link to="/register" className="login-btn">Log In / Register</Link>
        </nav>
      </header>

      {/* 🔹 Hero Section */}
      <section className="hero">
        <h2>විභාග ජයගැනීමේ ඔබේ මඟ - <span>Passify</span></h2>
        <p>ශ්‍රී ලංකාවේ A/L සහ O/L සිසුන් සඳහා සම්පූර්ණ අධ්‍යාපනික මාර්ගෝපදේශ.</p>
        <Link to="/subjects" className="explore-btn">
          විෂයයන් ගවේෂණය කරන්න
        </Link>
      </section>
    </div>
  );
};

export default Home;
