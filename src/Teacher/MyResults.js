import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state to add new result
  const [newResult, setNewResult] = useState({
    studentId: "",
    assessmentId: "",
    score: "",
    grade: "",
  });

  // Fetch all results
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

  // Handle form inputs
  const handleChange = (e) => {
    setNewResult({ ...newResult, [e.target.name]: e.target.value });
  };

  // Submit new result
  const handleAddResult = async (e) => {
    e.preventDefault();

    // Simple validation
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

  // Delete result
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
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2>Results</h2>

      {/* Add Result Form */}
      <form onSubmit={handleAddResult} style={{ marginBottom: 30 }}>
        <input
          type="number"
          name="studentId"
          placeholder="Student ID"
          value={newResult.studentId}
          onChange={handleChange}
          required
          style={{ marginRight: 10, padding: 5 }}
        />
        <input
          type="number"
          name="assessmentId"
          placeholder="Assessment ID"
          value={newResult.assessmentId}
          onChange={handleChange}
          required
          style={{ marginRight: 10, padding: 5 }}
        />
        <input
          type="number"
          step="0.01"
          name="score"
          placeholder="Score"
          value={newResult.score}
          onChange={handleChange}
          required
          style={{ marginRight: 10, padding: 5 }}
        />
        <input
          type="text"
          name="grade"
          placeholder="Grade (optional)"
          value={newResult.grade}
          onChange={handleChange}
          style={{ marginRight: 10, padding: 5 }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
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
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Assessment ID</th>
              <th>Score</th>
              <th>Grade</th>
              <th>Submitted At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={r.id}>
                <td>{i + 1}</td>
                <td>{r.student?.id}</td>
                <td>{r.assessment?.id}</td>
                <td>{r.score}</td>
                <td>{r.grade}</td>
                <td>{new Date(r.submittedAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(r.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
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
