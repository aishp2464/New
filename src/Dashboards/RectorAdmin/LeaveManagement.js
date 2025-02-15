import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch Leave Requests
  const fetchLeaveRequests = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "leave"));
      const leaveData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeaveRequests(leaveData);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  // Handle Leave Approval/Rejection
  const handleLeaveStatus = async (id, status) => {
    try {
      const leaveDoc = doc(db, "leave", id);
      await updateDoc(leaveDoc, { status });
      fetchLeaveRequests(); // Refresh the leave list
    } catch (error) {
      console.error("Error updating leave status:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Leave Requests</h2>
      {leaveRequests.length === 0 ? (
        <p style={{ textAlign: "center" }}>No leave requests found.</p>
      ) : (
        leaveRequests.map((leave) => (
          <div key={leave.id} style={{ ...styles.leaveCard, backgroundColor: leave.status === "Approved" ? "#4CAF50" : leave.status === "Rejected" ? "#F44336" : "#FFC107" }}>
            <h4>{leave.name} - {leave.prn}</h4>
            <p><strong>Reason:</strong> {leave.reason}</p>
            <p><strong>Status:</strong> {leave.status}</p>
            {leave.status === "Pending" && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleLeaveStatus(leave.id, "Approved")} style={styles.approveButton}>Approve</button>
                <button onClick={() => handleLeaveStatus(leave.id, "Rejected")} style={styles.rejectButton}>Reject</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  approveButton: { backgroundColor: "#4CAF50", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", flex: 1 },
  rejectButton: { backgroundColor: "#F44336", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", flex: 1 },
  leaveCard: { padding: "10px", borderRadius: "5px", color: "white", marginBottom: "10px" }
};

export default LeaveManagement;