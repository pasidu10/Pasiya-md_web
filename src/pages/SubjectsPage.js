// src/pages/SubjectsPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SubjectsPage.css";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [qGrade, setQGrade] = useState("O/L");
  const [loading, setLoading] = useState(false);
  const [aiResp, setAiResp] = useState("");

  useEffect(() => {
    fetch("/api/content/subjects")
      .then((r) => r.json())
      .then((data) => setSubjects(data))
      .catch(console.error);
  }, []);

  const askAI = async () => {
    setLoading(true);
    setAiResp("");
    try {
      const res = await fetch("/api/ai-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gradeLevel: qGrade,
          prompt: `Give 6 short lesson/topic suggestions for a Sri Lankan ${qGrade} ${""} student.`,
        }),
      });
      const j = await res.json();
      setAiResp(j.recommendation || "No recommendation.");
    } catch (e) {
      setAiResp("AI error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subjects-page">
      <header className="sp-header">
        <h2>Passify - Subjects</h2>
        <div>
          <label>Grade: </label>
          <select value={qGrade} onChange={(e) => setQGrade(e.target.value)}>
            <option value="O/L">O/L</option>
            <option value="A/L">A/L</option>
          </select>
          <Link to="/admin" className="admin-link">Admin</Link>
        </div>
      </header>

      <main>
        <section className="ai-box">
          <p>Ask the AI for topic suggestions for {qGrade} students.</p>
          <button onClick={askAI} disabled={loading}>
            {loading ? "Thinking..." : "Ask AI for suggestions"}
          </button>
          {aiResp && <pre className="ai-resp">{aiResp}</pre>}
        </section>

        <section className="subject-list">
          {subjects.length === 0 && <p>No subjects yet.</p>}
          {subjects.map((s) => (
            <article key={s._id} className="subject-card">
              <h3>{s.subject} <span className="grade-pill">{s.gradeLevel}</span></h3>
              <p>{s.lessonTitle}</p>
              <Link to={`/subject/${s._id}`} className="view-btn">View</Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
