import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <h1 style={styles.heading}>📞 Contact Us</h1>
      <p style={styles.text}>
        For inquiries regarding hostel accommodation, reach out to us:
      </p>

      <h3 style={styles.subHeading}>📩 Contact Details:</h3>
      <ul style={styles.list}>
        <li>📍 <strong>Address:</strong> WCE Girls Hostel, Vishrambag, Sangli, 416415</li>
        <li>☎️ <strong>Phone:</strong> 0233 230 0383</li>
        <li>📧 <strong>Email:</strong> wcehostel@wce.ac.in</li>
      </ul>
    </motion.div>
  );
};

// 🎨 **Updated Styles**
const styles = {
  container: {
    background: "rgba(255, 255, 255, 0.2)", // **Glassmorphism Effect**
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    maxWidth: "800px",
    margin: "50px 0 50px 0%", // **Shifted More Left**
    fontFamily: "'Poppins', sans-serif",
    backdropFilter: "blur(12px)", // **Increased Blur**
    border: "2px solid rgba(255, 255, 255, 0.3)",
  },
  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2C3E50",
    textAlign: "center",
  },
  text: {
    lineHeight: "1.8",
    fontSize: "18px",
    color: "#111", // **Darker Text**
    textAlign: "center",
  },
  subHeading: {
    color: "#34495E",
    fontSize: "22px",
    marginTop: "20px",
    fontWeight: "bold",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "18px",
    color: "#222", // **Darkened List Text**
  },
};

export default Contact;

// import { motion } from "framer-motion";

// const Contact = () => {
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
//         margin: "50px auto",
//         fontFamily: "'Arial', sans-serif",
//         color: "#000",
//       }}
//     >
//       <h1 style={{ textAlign: "center", color: "#2c3e50" }}>📞 Contact Us</h1>
//       <p style={{ lineHeight: "1.6", fontSize: "16px" }}>
//         For inquiries regarding hostel accommodation, reach out to us:
//       </p>

//       <h3 style={{ color: "#34495e", marginTop: "15px" }}>📩 Contact Details:</h3>
//       <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
//         <li>📍 <strong>Address:</strong> WCE Girls Hostel, Vishrambag, Sangli, 416415</li>
//         <li>☎️ <strong>Phone:</strong> 0233 230 0383</li>
//         <li>📧 <strong>Email:</strong> wcehostel@wce.ac.in</li>
//       </ul>
//     </motion.div>
//   );
// };

// export default Contact;
