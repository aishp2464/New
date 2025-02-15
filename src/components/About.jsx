import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <h1 style={styles.heading}>📍 About WCE Girls Hostel</h1>
      <p style={styles.text}>
        <strong>Walchand College of Engineering</strong> is located in Sangli, Maharashtra, with a vast campus spread across 90 acres.
      </p>

      <h3 style={styles.subHeading}>🏛️ College Information:</h3>
      <ul style={styles.list}>
        <li>📍 <strong>Address:</strong> Walchand College of Engineering, Miraj - Sangli Rd, Vishrambag, Sangli</li>
        <li>☎️ <strong>Phone:</strong> 0233 230 0383</li>
        <li>📅 <strong>Founded:</strong> 1947</li>
      </ul>
    </motion.div>
  );
};

// 🎨 **Updated Styles**
const styles = {
  container: {
    background: "rgba(255, 255, 255, 0.3)", // **Blurred Background**
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    maxWidth: "800px",
    margin: "50px auto 50px 0%", // **Shifted Left**
    fontFamily: "'Poppins', sans-serif",
    backdropFilter: "blur(10px)", // **Glassmorphism Effect**
    border: "2px solid rgba(255, 255, 255, 0.3)",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2C3E50", // **Dark Navy Blue**
    textAlign: "center",
  },
  text: {
    lineHeight: "1.8",
    fontSize: "18px",
    color: "#1A1A1A", // **Dark Gray-Black**
    textAlign: "center",
  },
  subHeading: {
    color: "#34495E", // **Muted Dark Blue**
    fontSize: "22px",
    marginTop: "20px",
    fontWeight: "bold",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "18px",
    color: "#333", // **Darker Gray**
  },
};

export default About;

// import { motion } from "framer-motion";

// const About = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       style={{
//         background: "rgba(255, 255, 255, 0.8)",
//         padding: "20px",
//         borderRadius: "10px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//         maxWidth: "800px",
//         margin: "50px auto 50px 10%",
//         fontFamily: "'Arial', sans-serif",
//         color: "#000",
//       }}
//     >
//       <h1 style={{ textAlign: "center", color: "#2c3e50" }}>📍 About WCE Girls Hostel</h1>
//       <p style={{ lineHeight: "1.6", fontSize: "16px" }}>
//         Walchand College of Engineering is located in Sangli, Maharashtra, with a vast campus spread across 90 acres.
//       </p>

//       <h3 style={{ color: "#34495e", marginTop: "15px" }}>🏛️ College Information:</h3>
//       <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
//         <li>📍 <strong>Address:</strong> Walchand College of Engineering, Miraj - Sangli Rd, Vishrambag, Sangli</li>
//         <li>☎️ <strong>Phone:</strong> 0233 230 0383</li>
//         <li>📅 <strong>Founded:</strong> 1947</li>
//       </ul>
//     </motion.div>
//   );
// };

// export default About;
