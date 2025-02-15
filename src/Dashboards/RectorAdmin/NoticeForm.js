import React, { useState } from "react";
import { db } from "../../Firebase/FirebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore methods

const NoticeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    saveNoticeData();
  };

  // Save notice data to Firestore
  const saveNoticeData = async () => {
    try {
      const noticeData = {
        title,
        description,
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "notices"), noticeData);
      console.log("Notice added with ID:", docRef.id);
      // Reset form fields
      setTitle("");
      setDescription("");
    } catch (e) {
      console.error("Error adding notice:", e);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "10px", width: "500px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Add Notice</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "5px", minHeight: "150px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Notice
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;
