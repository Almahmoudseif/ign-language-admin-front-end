import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newResult, setNewResult] = useState({
    studentId: "",
    assessmentId: "",
    score: "",
    grade: "",
  });

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/results");
      setResults(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleChange = (e) => {
    setNewResult({ ...newResult, [e.target.name]: e.target.value });
  };

  const handleAddResult = async (e) => {
    e.preventDefault();
    if (!newResult.studentId || !newResult.assessmentId || !newResult.score) {
      alert("Student, Assessment and Score are required");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/results", {
        student: { id: parseInt(newResult.studentId) },
        assessment: { id: parseInt(newResult.assessmentId) },
        score: parseFloat(newResult.score),
        grade: newResult.grade || null,
        submittedAt: new Date().toISOString(),
      });
      alert("Result added successfully");
      setNewResult({ studentId: "", assessmentId: "", score: "", grade: "" });
      fetchResults();
    } catch (err) {
      alert("Failed to add result");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/results/${id}`);
      alert("Result deleted");
      setResults(results.filter((r) => r.id !== id));
    } catch {
      alert("Failed to delete result");
    }
  };

  if (loading) return <p>Loading results...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: "1200px", margin: "auto", padding: 30, fontSize: 16 }}>
      <h2 style={{ marginBottom: 20, fontSize: 24 }}>Results</h2>

      {/* Add Result Form */}
      <form onSubmit={handleAddResult} style={{ marginBottom: 30 }}>
        <input
          type="number"
          name="studentId"
          placeholder="Student ID"
          value={newResult.studentId}
          onChange={handleChange}
          required
          style={{ marginRight: 12, padding: "8px 10px", fontSize: 16 }}
        />
        <input
          type="number"
          name="assessmentId"
          placeholder="Assessment ID"
          value={newResult.assessmentId}
          onChange={handleChange}
          required
          style={{ marginRight: 12, padding: "8px 10px", fontSize: 16 }}
        />
        <input
          type="number"
          step="0.01"
          name="score"
          placeholder="Score"
          value={newResult.score}
          onChange={handleChange}
          required
          style={{ marginRight: 12, padding: "8px 10px", fontSize: 16 }}
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade (optional)"
          value={newResult.grade}
          onChange={handleChange}
          style={{ marginRight: 12, padding: "8px 10px", fontSize: 16 }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Add Result
        </button>
      </form>

      {/* Results Table */}
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "2px solid #ccc",
            fontSize: 16,
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px 12px" }}>#</th>
              <th style={{ padding: "10px 12px" }}>Student ID</th>
              <th style={{ padding: "10px 12px" }}>Assessment ID</th>
              <th style={{ padding: "10px 12px" }}>Score</th>
              <th style={{ padding: "10px 12px" }}>Grade</th>
              <th style={{ padding: "10px 12px" }}>Submitted At</th>
              <th style={{ padding: "10px 12px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.id} style={{ textAlign: "center", height: 50 }}>
                <td style={{ padding: "10px 12px" }}>{i + 1}</td>
                <td style={{ padding: "10px 12px" }}>{r.student?.id}</td>
                <td style={{ padding: "10px 12px" }}>{r.assessment?.id}</td>
                <td style={{ padding: "10px 12px" }}>{r.score}</td>
                <td style={{ padding: "10px 12px" }}>{r.grade ?? "N/A"}</td>
                <td style={{ padding: "10px 12px" }}>
                  {r.submittedAt ? new Date(r.submittedAt).toLocaleString() : "Unknown"}
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <button
                    onClick={() => handleDelete(r.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      cursor: "pointer",
                      borderRadius: 4,
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultList;
