// src/pages/SubjectDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./SubjectDetail.css";

export default function SubjectDetail() {
  const { id } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch(`/api/content/${id}`)
      .then((r) => r.json())
      .then((j) => setContent(j))
      .catch(console.error);
  }, [id]);

  if (!content) return <div>Loading...</div>;

  return (
    <div className="subject-detail">
      <header className="sd-header">
        <Link to="/subjects">← Back</Link>
        <h2>{content.subject} — {content.lessonTitle}</h2>
      </header>

      <section className="pdf-section">
        {content.notesPDFUrl ? (
          <iframe
            title="Notes PDF"
            src={content.notesPDFUrl}
            className="pdf-frame"
          />
        ) : (
          <p>No notes PDF available.</p>
        )}

        {content.pastPaperPDFUrl && (
          <div className="paper-box">
            <h4>Past Paper</h4>
            <a href={content.pastPaperPDFUrl} target="_blank" rel="noreferrer">Open Past Paper</a>
          </div>
        )}
      </section>
    </div>
  );
}
