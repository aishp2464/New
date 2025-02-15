import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/FirebaseConfig";  // import db from your firebase config
import { collection, getDocs } from "firebase/firestore";

const EntryDetails = () => {
  const [entries, setEntries] = useState([]);
  const [checkedEntries, setCheckedEntries] = useState({});

  useEffect(() => {
    // Fetch data from Firestore
    const fetchEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "entrydata"));
        const fetchedEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(fetchedEntries);
      } catch (error) {
        console.error("Error fetching entries: ", error);
      }
    };
    fetchEntries();
  }, []);

  // Handle checkbox state change
  const handleCheckboxChange = (id) => {
    setCheckedEntries((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Entry Details</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Student Name</th>
            <th style={styles.th}>Hostel Block</th>
            <th style={styles.th}>Room Number</th>
            <th style={styles.th}>Mobile Number</th>
            <th style={styles.th}>Parent's Mobile Number</th>
            <th style={styles.th}>Place</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Time</th>
            <th style={styles.th}>Return Date</th>
            <th style={styles.th}>Return Time</th>
            <th style={styles.th}>Close Entry</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr
              key={entry.id}
              style={{
                backgroundColor: checkedEntries[entry.id] ? "lightgreen" : "lightcoral",
              }}
            >
              <td style={styles.td}>{entry.studentName}</td>
              <td style={styles.td}>{entry.hostelBlock}</td>
              <td style={styles.td}>{entry.roomNumber}</td>
              <td style={styles.td}>{entry.mobileNumber}</td>
              <td style={styles.td}>{entry.parentsMobileNumber}</td>
              <td style={styles.td}>{entry.place}</td>
              <td style={styles.td}>{entry.date}</td>
              <td style={styles.td}>{entry.time}</td>
              <td style={styles.td}>{entry.returnDate}</td> {/* Display returnDate */}
              <td style={styles.td}>{entry.returnTime}</td> {/* Display returnTime */}
              <td style={styles.td}>
                <input
                  type="checkbox"
                  checked={checkedEntries[entry.id] || false}
                  onChange={() => handleCheckboxChange(entry.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline CSS
const styles = {
  container: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    padding: "12px 15px",
    backgroundColor: "#76D0F7",
    color: "white",
    textAlign: "left",
  },
  td: {
    padding: "12px 15px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
};

export default EntryDetails;
