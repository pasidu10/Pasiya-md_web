// src/pages/AdminDashboard.js
import React, { useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("O/L");
  const [lessonTitle, setLessonTitle] = useState("");
  const [notesFile, setNotesFile] = useState(null);
  const [paperFile, setPaperFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Uploading...");
    try {
      const form = new FormData();
      if (notesFile) form.append("notes", notesFile);
      if (paperFile) form.append("paper", paperFile);

      // upload files
      const uploadRes = await fetch("/api/upload-paper", {
        method: "POST",
        headers: { "x-admin-key": "PASIYA-MD-TEAM" }, // basic admin auth header
        body: form,
      });
      const uploadJson = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadJson.error || "Upload failed");

      // uploadJson may include filePaths object
      // create content entry
      const contentRes = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key":"PASIYA-MD-TEAM" },
        body: JSON.stringify({
          subject,
          gradeLevel,
          lessonTitle,
          notesPDFUrl: uploadJson.notesPath || uploadJson.filePath || uploadJson.filePaths?.notes,
          pastPaperPDFUrl: uploadJson.paperPath || uploadJson.filePaths?.paper,
        }),
      });

      const contentJson = await contentRes.json();
      if (!contentRes.ok) throw new Error(contentJson.error || "Create content failed");

      setMessage("Uploaded & Content created successfully!");
      setSubject(""); setLessonTitle(""); setNotesFile(null); setPaperFile(null);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard — Upload Notes & Past Papers</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject (e.g., Physics)" required />
        <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}>
          <option>O/L</option>
          <option>A/L</option>
        </select>
        <input value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} placeholder="Lesson Title" required />

        <label>Notes PDF</label>
        <input type="file" accept="application/pdf" onChange={(e) => setNotesFile(e.target.files[0])} />

        <label>Past Paper PDF</label>
        <input type="file" accept="application/pdf" onChange={(e) => setPaperFile(e.target.files[0])} />

        <button type="submit">Upload & Create</button>
      </form>

      {message && <p className="status">{message}</p>}
    </div>
  );
}
