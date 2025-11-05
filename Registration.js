// src/pages/Registration.js
import React, { useState } from "react";
import "./Registration.css";

const Registration = () => {
  const [grade, setGrade] = useState("");

  const handleGoogleLogin = () => {
    alert("🔐 Google Sign-In integration coming soon!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🎓 Grade Selected: ${grade}`);
  };

  return (
    <div className="register-container">
      <h2>Passify - Log In / Register</h2>

      <button onClick={handleGoogleLogin} className="google-btn">
        Google සමඟින් ලොග් වන්න
      </button>

      <div className="divider">හෝ</div>

      <form onSubmit={handleSubmit}>
        <label>ඔබේ ශ්‍රේණිය තෝරන්න:</label>
        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value="">තෝරන්න</option>
          <option value="O/L">O/L</option>
          <option value="A/L">A/L</option>
        </select>

        <button type="submit" className="submit-btn">
          ලියාපදිංචි වන්න
        </button>
      </form>
    </div>
  );
};

export default Registration;
