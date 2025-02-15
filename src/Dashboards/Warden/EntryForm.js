// import React, { useState } from "react";
// import { db } from "../../Firebase/FirebaseConfig";  // import db from your firebase config
// import { collection, addDoc } from "firebase/firestore";

// const EntryForm = () => {
//   const [formData, setFormData] = useState({
//     studentName: "",
//     hostelBlock: "",
//     roomNumber: "",
//     mobileNumber: "",
//     parentsMobileNumber: "",
//     place: "",
//     date: "",
//     time: "",
//     returnDate: "",  // New field
//     returnTime: ""   // New field
//   });

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "entrydata"), formData);
//       alert("Entry added successfully!");
//       setFormData({
//         studentName: "",
//         hostelBlock: "",
//         roomNumber: "",
//         mobileNumber: "",
//         parentsMobileNumber: "",
//         place: "",
//         date: "",
//         time: "",
//         returnDate: "", // Resetting the new field
//         returnTime: ""  // Resetting the new field
//       });
//     } catch (error) {
//       console.error("Error adding entry: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={styles.formContainer}>
//       <h2 style={styles.heading}>Student Entry Form</h2>

//       <div style={styles.formRow}>
//         <label style={styles.label}>
//           Student Name:
//           <input
//             type="text"
//             name="studentName"
//             value={formData.studentName}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>

//         <label style={styles.label}>
//           Hostel Block:
//           <input
//             type="text"
//             name="hostelBlock"
//             value={formData.hostelBlock}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>
//       </div>

//       <div style={styles.formRow}>
//         <label style={styles.label}>
//           Room Number:
//           <input
//             type="text"
//             name="roomNumber"
//             value={formData.roomNumber}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>

//         <label style={styles.label}>
//           Mobile Number:
//           <input
//             type="tel"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>
//       </div>

//       <div style={styles.formRow}>
//         <label style={styles.label}>
//           Parent's Mobile Number:
//           <input
//             type="tel"
//             name="parentsMobileNumber"
//             value={formData.parentsMobileNumber}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>

//         <label style={styles.label}>
//           Place:
//           <input
//             type="text"
//             name="place"
//             value={formData.place}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>
//       </div>

//       <div style={styles.formRow}>
//         <label style={styles.label}>
//           Date:
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>

//         <label style={styles.label}>
//           Time:
//           <input
//             type="time"
//             name="time"
//             value={formData.time}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>
//       </div>

//       {/* New fields for Return Date and Time */}
//       <div style={styles.formRow}>
//         <label style={styles.label}>
//           Return Date:
//           <input
//             type="date"
//             name="returnDate"
//             value={formData.returnDate}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>

//         <label style={styles.label}>
//           Return Time:
//           <input
//             type="time"
//             name="returnTime"
//             value={formData.returnTime}
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//         </label>
//       </div>

//       <button
//         type="submit"
//         style={styles.submitButton}
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// // Inline CSS
// const styles = {
//   formContainer: {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#f9fafb',
//     borderRadius: '10px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//   },
//   heading: {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     marginBottom: '20px',
//     textAlign: 'center',
//     color: '#333',
//   },
//   label: {
//     fontSize: '16px',
//     fontWeight: '600',
//     color: '#555',
//     display: 'block',
//     marginBottom: '8px',
//     marginTop: '15px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '8px',
//     border: '1px solid #ddd',
//     fontSize: '16px',
//     backgroundColor: '#fff',
//     marginBottom: '15px',
//     boxSizing: 'border-box',
//   },
//   submitButton: {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     padding: '15px',
//     width: '100%',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '18px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//   },
//   formRow: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '15px',
//     marginBottom: '15px',
//   },
// };

// export default EntryForm;
import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, getDocs, doc, updateDoc, setDoc } from "firebase/firestore";

const EntryDetails = () => {
  const [entries, setEntries] = useState([]);
  const [checkedEntries, setCheckedEntries] = useState({});

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "entrydata"));
        const fetchedEntries = querySnapshot.docs.map((doc) => ({
          mobileNumber: doc.id, // Using document ID (should be mobile number)
          ...doc.data(),
        }));

        console.log("Fetched entries:", fetchedEntries);

        setEntries(fetchedEntries);

        // Initialize checkbox state from Firestore
        const initialCheckedState = {};
        fetchedEntries.forEach((entry) => {
          initialCheckedState[entry.mobileNumber] = entry.isChecked || false;
        });
        setCheckedEntries(initialCheckedState);
        console.log("Initial checked state:", initialCheckedState);
      } catch (error) {
        console.error("Error fetching entries: ", error);
      }
    };

    fetchEntries();
  }, []);

  const handleCheckboxChange = async (mobileNumber) => {
    const newCheckedState = !checkedEntries[mobileNumber];

    setCheckedEntries((prevState) => ({
      ...prevState,
      [mobileNumber]: newCheckedState,
    }));

    console.log(`Updating Firestore for ${mobileNumber} -> isChecked: ${newCheckedState}`);

    try {
      const entryRef = doc(db, "entrydata", mobileNumber);
      await setDoc(entryRef, { isChecked: newCheckedState }, { merge: true });
      console.log(`Firestore updated for ${mobileNumber}`);
    } catch (error) {
      console.error("Error updating checkbox state:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Entry Details</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Student Name</th>
            <th style={styles.th}>Mobile Number</th>
            <th style={styles.th}>Return Entry</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.mobileNumber}
              style={{
                backgroundColor: checkedEntries[entry.mobileNumber] ? "lightgreen" : "lightcoral",
              }}
            >
              <td style={styles.td}>{entry.studentName}</td>
              <td style={styles.td}>{entry.mobileNumber}</td>
              <td style={styles.td}>
                <input
                  type="checkbox"
                  checked={checkedEntries[entry.mobileNumber] || false}
                  onChange={() => handleCheckboxChange(entry.mobileNumber)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: "20px", maxWidth: "900px", margin: "0 auto" },
  heading: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center", color: "#333" },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: "20px" },
  th: { padding: "12px", backgroundColor: "#76D0F7", color: "white", textAlign: "left" },
  td: { padding: "12px", border: "1px solid #ddd", textAlign: "left" },
};

export default EntryDetails;
