// import { motion } from "framer-motion";

// const Home = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 1 }}
//       style={{
//         background: "rgba(255, 255, 255, 0.8)",
//         padding: "20px",
//         borderRadius: "10px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//         maxWidth: "800px",
//         margin: "0 auto",
//         fontFamily: "'Arial', sans-serif",
//         color: "#333",
//         justifyContent: "center",
//         alignItems: "center",
//         position: 'center',
//         top: "50%",
//         left: "50%",
//         transform: "translate(-50%, -50%)", // Centers the element on the screen
//       }}
//     >
//       <h2 style={{ textAlign: "center", color: "#2c3e50" }}>🏡 WCE Girls Hostel</h2>
//       <p style={{ lineHeight: "1.6", fontSize: "16px" }}>
//         The <strong>WCE (Walchand College of Engineering, Sangli)</strong> girls hostel offers 
//         accommodation for female students on a sharing basis. Each block can house around 
//         <strong> 130 girls</strong> and provides a good residential facility with a separate mess area and well maintained Playground.
//       </p>

//       <h3 style={{ color: "#34495e", marginTop: "15px" }}>🏆 Key Features:</h3>
//       <ul style={{ paddingLeft: "20px", fontSize: "16px" }}>
//         <li>👭 <strong>Capacity</strong>: Can accommodate around <strong>130 female students</strong>.</li>
//         <li>🏠 <strong>Room Sharing </strong>: Rooms are usually shared among multiple girls.</li>
//         <li>✅ <strong>Admission Criteria </strong>: Based on <strong>merit and reservation policy</strong>.</li>
//         <li>🍽️ <strong>Mess Facility Cyber Hostel</strong>: Separate mess facility for girls.</li>
//         <li>💻 <strong>Cyber Hostel</strong>: A dedicated block with enhanced internet access.</li>
//         <li>💻 <strong>Hostel Playground</strong>: Spacious, well-maintained, safe, student-friendly, green, relaxing, lively environment.</li>
//       </ul>
//     </motion.div>
//   );
// };

// export default Home;
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <h1 style={styles.heading}> Welcome to WCE Girls Hostel !!!</h1>
      <p style={styles.text}>
        We provide a safe, comfortable, and well-equipped living space for students at <strong>Walchand College of Engineering ,Sangli</strong>.
      </p>

      <h3 style={styles.subHeading}>🌟 Why Choose Us?</h3>
      <ul style={styles.list}>
        <li>✅Secure & Well-maintained Hostel</li>
        <li>✅24/7 Security & WiFi Access</li>
        <li>✅Healthy & Hygienic Food Facilities</li>
        <li>✅Spacious Study Rooms & Recreation Areas</li>
        <li>✅Calm and clean environment</li>
        <li>✅Playground and Study rooms available</li>
      </ul>

      <p style={styles.note}>🔔 For accommodation details, visit the Contact section!</p>
    </motion.div>
  );
};

// 🎨 **Updated Styles (Shifted More Left)**
const styles = {
  container: {
    background: "rgba(255, 255, 255, 0.3)", // Transparent with Blur Effect
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    maxWidth: "800px",
    margin: "50px auto 50px 0%", // **Shifted More Left**
    fontFamily: "'Poppins', sans-serif",
    backdropFilter: "blur(10px)", // **Blur Effect**
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
    listStyle: "none",
    fontSize: "18px",
    color: "#333", // **Darker Gray**
  },
  note: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#8E44AD", // **Dark Purple Accent**
    textAlign: "center",
    marginTop: "20px",
  },
};

export default Home;
