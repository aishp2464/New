import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/FirebaseConfig"; // Import Firestore
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore"; // Import Firestore methods

const AddIssue = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("medium");
  const [comment, setComment] = useState("");
  const [isResolved, setIsResolved] = useState(false); // Track if issue is resolved
  const [issues, setIssues] = useState([]);
  const [activeTab, setActiveTab] = useState("addIssue"); // To track which tab is active

  // Fetch issues from Firestore
  const fetchIssues = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "issues"));
      const issuesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIssues(issuesData);
    } catch (e) {
      console.error("Error fetching issues:", e);
    }
  };

  useEffect(() => {
    fetchIssues(); // Fetch issues when component mounts
  }, []);

  // Handle form submission for adding an issue
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const issueData = {
        description,
        location,
        priority,
        status: isResolved ? "Resolved" : "Unresolved",
        comment: isResolved ? "" : comment, // Add comment only if unresolved
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "issues"), issueData);
      console.log("Issue added with ID:", docRef.id);

      // Reset form fields after submission
      setDescription("");
      setLocation("");
      setPriority("medium");
      setComment("");
      setIsResolved(false);
      fetchIssues(); // Fetch updated issues after adding a new one
    } catch (e) {
      console.error("Error adding issue:", e);
    }
  };

  // Mark issue as resolved
  const markAsResolved = async (id) => {
    try {
      const issueRef = doc(db, "issues", id);
      await updateDoc(issueRef, { status: "Resolved" });
      fetchIssues(); // Fetch updated issues after marking as resolved
    } catch (e) {
      console.error("Error marking issue as resolved:", e);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        width: "800px",
        margin: "0 auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Issue Management</h2>

      {/* Tabs for Add Issue and Issues */}
      <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("addIssue")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "addIssue" ? "#4CAF50" : "#ddd",
            color: activeTab === "addIssue" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Issue
        </button>
        <button
          onClick={() => setActiveTab("issues")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "issues" ? "#4CAF50" : "#ddd",
            color: activeTab === "issues" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Issues
        </button>
      </div>

      {/* Add Issue Form */}
      {activeTab === "addIssue" && (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <textarea
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              padding: "10px",
              borderRadius: "5px",
              minHeight: "150px",
              fontSize: "14px",
            }}
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ padding: "10px", borderRadius: "5px", fontSize: "14px" }}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ padding: "10px", borderRadius: "5px", fontSize: "14px" }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {!isResolved && (
            <textarea
              placeholder="Add a comment (if unresolved)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                minHeight: "100px",
                fontSize: "14px",
              }}
            />
          )}

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "#FF9800",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Report Issue
          </button>
        </form>
      )}

      {/* Issues Tab */}
      {activeTab === "issues" && (
        <div>
          <h3 >Issues List</h3>
          {issues.length === 0 ? (
            <p>No issues reported yet.</p>
          ) : (
            issues.map((issue) => (
              <div
                key={issue.id}
                style={{
                  marginBottom: "15px",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: issue.status === "Resolved" ? "#d4edda" : "#F6536A",
                }}
              >
                <h4>{issue.description}</h4>
                <p>Location: {issue.location}</p>
                <p>Priority: {issue.priority}</p>
                <p>Status: {issue.status}</p>
                {issue.status === "Unresolved" && (
                  <button
                    onClick={() => markAsResolved(issue.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Mark as Resolved
                  </button>
                )}
                {issue.comment && (
                  <div style={{ marginTop: "10px", fontStyle: "italic" }}>
                    <strong>Comment:</strong> {issue.comment}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AddIssue;
