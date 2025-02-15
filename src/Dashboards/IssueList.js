import React, { useEffect, useState } from "react";
import { db } from "../Firebase/FirebaseConfig"; // Import Firestore
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods

const IssuesList = () => {
  const [issues, setIssues] = useState([]);

  // Fetch unresolved issues from Firestore
  const fetchIssues = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "issues"));
      const issuesData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((issue) => issue.status !== "Resolved"); // Show only unresolved issues

      setIssues(issuesData);
    } catch (e) {
      console.error("Error fetching issues:", e);
    }
  };

  useEffect(() => {
    fetchIssues(); // Fetch unresolved issues when component mounts
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>Unresolved Issues</h2>

      {issues.length === 0 ? (
        <p style={{ textAlign: "center", color: "green" }}>No unresolved issues.</p>

      ) : (
        issues.map((issue) => (
          <div
            key={issue.id}
            style={{
              marginBottom: "15px",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "rgba(246, 161, 98, 0.7)", // Transparent color
              backdropFilter: "blur(5px)", // Optional: Adds a glass effect
            }}
          >
            <h4>{issue.description}</h4>
            <p>
              <strong>Location:</strong> {issue.location}
            </p>
            <p>
              <strong>Priority:</strong> {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
            </p>
            <p>
              <strong>Status:</strong> {issue.status}
            </p>
            <p>
              <strong>Date & Time:</strong> {new Date(issue.createdAt.seconds * 1000).toLocaleString()}
            </p>

            {issue.comment && (
              <div style={{ marginTop: "10px", fontStyle: "italic" }}>
                <strong>Comment:</strong> {issue.comment}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default IssuesList;
