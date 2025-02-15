
import React, { useState, useEffect } from "react";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const LeaveForm = () => {
  const [activeTab, setActiveTab] = useState("apply");
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    class: "",
    hostelBlock: "",
    roomNumber: "",
    parentMobileNumber: "",
    reason: "",
    destination: "",
    leaveDateTime: "",
    returnDateTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch currently logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); // No user is logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch student's mobile number when user is logged in
  useEffect(() => {
    if (user) {
      const studentRef = collection(db, "student");
      const studentQuery = query(studentRef, where("email", "==", user.email));

      const unsubscribe = onSnapshot(studentQuery, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const studentData = doc.data();
          setFormData((prevData) => ({ ...prevData, mobileNumber: studentData.mobileNumber }));
        });
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch Leave Requests in real-time based on mobile number
  const fetchLeaveRequests = () => {
    if (user && formData.mobileNumber) {  // Ensure mobileNumber is available
      const leaveRef = collection(db, "leave");
      const q = query(leaveRef, where("mobileNumber", "==", formData.mobileNumber)); // Filter by mobileNumber of the logged-in user

      // Real-time listener
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const leaveData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeaveRequests(leaveData);
      });

      // Cleanup listener on component unmount
      return () => unsubscribe();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation
    for (let key in formData) {
      if (!formData[key]) {
        setMessage("Please fill in all fields.");
        setLoading(false);
        return;
      }
    }

    try {
      await addDoc(collection(db, "leave"), {
        ...formData,
        status: "Pending", // Default status
        createdAt: new Date(),
      });

      setMessage("Leave request submitted successfully!");
      setFormData({
        name: "",
        mobileNumber: "",
        class: "",
        hostelBlock: "",
        roomNumber: "",
        parentMobileNumber: "",
        reason: "",
        destination: "",
        leaveDateTime: "",
        returnDateTime: "",
      });

      fetchLeaveRequests(); // Refresh the leave list
    } catch (error) {
      console.error("Error submitting leave request:", error);
      setMessage("Failed to submit. Try again.");
    }

    setLoading(false);
  };

  // Fetch leave requests when user is logged in or when mobileNumber changes
  useEffect(() => {
    if (user && formData.mobileNumber) {
      fetchLeaveRequests();
    }
  }, [user, formData.mobileNumber]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("apply")}
          style={{
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "apply" ? "#4CAF50" : "#ddd",
            color: activeTab === "apply" ? "white" : "#333",
            borderRadius: "5px 0 0 5px",
          }}
        >
          Apply Leave
        </button>
        <button
          onClick={() => setActiveTab("details")}
          style={{
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "details" ? "#4CAF50" : "#ddd",
            color: activeTab === "details" ? "white" : "#333",
            borderRadius: "0 5px 5px 0",
          }}
        >
          Leave Details
        </button>
      </div>

      {/* Apply Leave Tab */}
      {activeTab === "apply" && (
        <>
          <h2 style={{ textAlign: "center", color: "#333" }}>Leave Application</h2>
          {message && <p style={{ textAlign: "center", color: "green" }}>{message}</p>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
            <input type="text" name="class" placeholder="Class" value={formData.class} onChange={handleChange} required />
            <input type="text" name="hostelBlock" placeholder="Hostel Block" value={formData.hostelBlock} onChange={handleChange} required />
            <input type="text" name="roomNumber" placeholder="Room Number" value={formData.roomNumber} onChange={handleChange} required />
            <input type="tel" name="parentMobileNumber" placeholder="Parent Mobile Number" value={formData.parentMobileNumber} onChange={handleChange} required />
            <textarea name="reason" placeholder="Reason for Leave" value={formData.reason} onChange={handleChange} required />
            <input type="text" name="destination" placeholder="Where to go" value={formData.destination} onChange={handleChange} required />
            <label>Leave Date & Time:</label>
            <input type="datetime-local" name="leaveDateTime" value={formData.leaveDateTime} onChange={handleChange} required />
            <label>Return Date & Time:</label>
            <input type="datetime-local" name="returnDateTime" value={formData.returnDateTime} onChange={handleChange} required />

            <button type="submit" disabled={loading} style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%" }}>
              {loading ? "Submitting..." : "Submit Leave Request"}
            </button>
          </form>
        </>
      )}

      {/* Leave Details Tab */}
      {activeTab === "details" && (
        <>
          <h2 style={{ textAlign: "center", color: "#333" }}>Your Leave Requests</h2>
          {leaveRequests.length === 0 ? (
            <p style={{ textAlign: "center" }}>No leave requests found.</p>
          ) : (
            leaveRequests.map((leave) => (
              <div
                key={leave.id}
                style={{
                  marginBottom: "15px",
                  padding: "15px",
                  borderRadius: "10px",
                  backgroundColor:
                    leave.status === "Approved" ? "#4CAF50" : leave.status === "Pending" ? "#FF9800" : "#F44336",
                  color: "white",
                  transition: "background-color 0.3s ease",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h4>{leave.name} - {leave.mobileNumber}</h4>
                <p><strong>Reason:</strong> {leave.reason}</p>
                <p><strong>Leave Date:</strong> {new Date(leave.leaveDateTime).toLocaleString()}</p>
                <p><strong>Return Date:</strong> {new Date(leave.returnDateTime).toLocaleString()}</p>
                <p><strong>Status:</strong> {leave.status}</p>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default LeaveForm;
