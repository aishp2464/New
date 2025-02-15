// import React, { useState, useEffect } from "react";
// import { db } from "../Firebase/FirebaseConfig"; // Import Firestore
// import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods

// const NoticesList = () => {
//   const [notices, setNotices] = useState([]);
//   const [activeNotice, setActiveNotice] = useState(null); // Track active notice for toggling

//   // Fetch notices from Firestore on component mount
//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "notices"));
//         const noticesData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setNotices(noticesData);
//       } catch (e) {
//         console.error("Error fetching notices:", e);
//       }
//     };

//     fetchNotices();
//   }, []);

//   // Toggle description visibility
//   const toggleDescription = (id) => {
//     setActiveNotice((prevActiveNotice) => (prevActiveNotice === id ? null : id));
//   };

//   return (
//     <div
//       style={{
//         padding: "20px",
//         backgroundColor: "#f4f4f4",
//         borderRadius: "10px",
//         width: "700px",
//         margin: "0 auto",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Notices</h2>
//       <div>
//         {notices.length === 0 ? (
//           <p style={{ textAlign: "center", fontStyle: "italic", color: "#777" }}>No notices available.</p>
//         ) : (
//           notices.map((notice) => (
//             <div
//               key={notice.id}
//               style={{
//                 marginBottom: "15px",
//                 border: "1px solid #ddd",
//                 padding: "15px",
//                 borderRadius: "5px",
//                 backgroundColor: "#fff",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease-in-out",
//                 boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
//               }}
//               onClick={() => toggleDescription(notice.id)}
//             >
//               <h3
//                 style={{
//                   color: "#4CAF50",
//                   margin: "0 0 10px",
//                   fontSize: "20px",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 {notice.title}
//               </h3>
//               {activeNotice === notice.id && (
//                 <div>
//                   <p style={{ color: "#333", fontSize: "16px" }}>{notice.description}</p>
//                   <small style={{ display: "block", marginTop: "10px", fontStyle: "italic", color: "#888" }}>
//                     {new Date(notice.createdAt.seconds * 1000).toLocaleString()}
//                   </small>
//                 </div>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default NoticesList;
import React, { useState, useEffect } from "react";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const NoticesList = () => {
  const [notices, setNotices] = useState([]);
  const [activeNotice, setActiveNotice] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notices"));
        const noticesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotices(noticesData);
      } catch (e) {
        console.error("Error fetching notices:", e);
      }
    };
    fetchNotices();
  }, []);

  const toggleDescription = (id) => {
    setActiveNotice((prevActiveNotice) => (prevActiveNotice === id ? null : id));
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        borderRadius: "16px",
        width: "750px",
        margin: "50px auto",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#f8f9fa",
          textShadow: "3px 3px 12px rgba(0, 0, 0, 0.5)",
          letterSpacing: "1px",
        }}
      >
        Notices
      </h2>
      <div>
        {notices.length === 0 ? (
          <p style={{ textAlign: "center", fontStyle: "italic", color: "#bbb" }}>
            No notices available.
          </p>
        ) : (
          notices.map((notice) => (
            <div
              key={notice.id}
              style={{
                marginBottom: "15px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "15px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                color: "#ffffff",
                backdropFilter: "blur(15px)",
                overflow: "hidden",
                position: "relative",
              }}
              onClick={() => toggleDescription(notice.id)}
            >
              <h3
                style={{
                  color: "#FFD700",
                  margin: "0 0 10px",
                  fontSize: "22px",
                  textTransform: "uppercase",
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                {notice.title}
              </h3>
              {activeNotice === notice.id && (
                <div>
                  <p style={{ color: "#fff", fontSize: "16px", lineHeight: "1.6" }}>
                    {notice.description}
                  </p>
                  <small
                    style={{
                      display: "block",
                      marginTop: "10px",
                      fontStyle: "italic",
                      color: "#ddd",
                    }}
                  >
                    {notice.createdAt?.seconds
                      ? new Date(notice.createdAt.seconds * 1000).toLocaleString()
                      : "Unknown date"}
                  </small>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoticesList;
