import React, { useState } from "react";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const roles = ["student", "rector_administrator", "warden"];
      
      for (const role of roles) {
        const userDoc = await getDoc(doc(db, role, user.uid));
        if (userDoc.exists()) {
          navigate(`/${role}`);
          return;
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>🔑 Sign In to Your Account</h2>
        <form onSubmit={handleSignIn}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          <button type="submit" style={styles.button}>Sign In</button>
        </form>
        <p>Don't have an account? <button onClick={() => navigate("/signup")} style={styles.link}>Sign Up</button></p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(0, 0, 50, 0.6))",
  },
  formContainer: {
    background: "rgba(255, 255, 255, 0.3)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "90%",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    textAlign: "center",
  },
  heading: {
    fontSize: "26px",
    color: "#2C3E50",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "8px",
    fontSize: "16px",
    background: "rgba(255, 255, 255, 0.4)",
    color: "#333",
    outline: "none",
  },
  button: {
    width: "100%",
    background: "#2C3E50",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "15px",
    transition: "background-color 0.3s",
  },
  link: {
    color: "#8E44AD",
    textDecoration: "none",
    fontWeight: "bold",
    display: "block",
    marginTop: "15px",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontSize: "16px",
  },
};

export default SignIn;

// // import React, { useState } from "react";
// // import { auth, db } from "../../Firebase/FirebaseConfig";
// // import { signInWithEmailAndPassword } from "firebase/auth";
// // import { doc, getDoc } from "firebase/firestore";
// // import { useNavigate } from "react-router-dom";

// // const SignIn = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleSignIn = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
// //       const user = userCredential.user;
// //       const roles = ["student", "rector_administrator", "warden"];
// //       for (const role of roles) {
// //         const userDoc = await getDoc(doc(db, role, user.uid));
// //         if (userDoc.exists()) {
// //           navigate(`/${role}`);
// //           return;
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error signing in:", error);
// //       alert("Invalid credentials. Please try again.");
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.formContainer}>
// //         <h2 style={styles.heading}>Sign In</h2>
// //         <form onSubmit={handleSignIn} style={styles.form}>
// //           <input
// //             type="email"
// //             placeholder="Email"
// //             onChange={(e) => setEmail(e.target.value)}
// //             required
// //             style={styles.input}
// //           />
// //           <input
// //             type="password"
// //             placeholder="Password"
// //             onChange={(e) => setPassword(e.target.value)}
// //             required
// //             style={styles.input}
// //           />
// //           <button type="submit" style={styles.button}>Sign In</button>
// //         </form>

// //         <div style={styles.buttonContainer}>
// //           <button onClick={() => navigate("/signup")} style={styles.secondaryButton}>Don't have an account? Sign Up</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Inline CSS
// // const styles = {
// //   container: {
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     minHeight: '100vh',
// //     postion: 'center',
// //   },
// //   formContainer: {
// //     backgroundColor: 'rgba(255, 255, 255, 0.9)', 
// //     padding: '30px',
// //     borderRadius: '10px',
// //     width: '100%',
// //     maxWidth: '400px',
// //     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
// //   },
// //   heading: {
// //     fontSize: '24px',
// //     marginBottom: '20px',
// //     textAlign: 'center',
// //     color: '#333',
// //   },
// //   form: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     gap: '10px',
// //   },
// //   input: {
// //     padding: '10px',
// //     marginBottom: '15px',
// //     border: '1px solid #ccc',
// //     borderRadius: '5px',
// //     fontSize: '16px',
// //   },
// //   button: {
// //     backgroundColor: '#4CAF50',
// //     color: 'white',
// //     padding: '12px',
// //     border: 'none',
// //     borderRadius: '5px',
// //     fontSize: '16px',
// //     cursor: 'pointer',
// //     marginTop: '20px',
// //     transition: 'background-color 0.3s ease',
// //   },
// //   buttonContainer: {
// //     marginTop: '20px',
// //     textAlign: 'center',
// //   },
// //   secondaryButton: {
// //     backgroundColor: '#007BFF',
// //     color: 'white',
// //     padding: '12px',
// //     border: 'none',
// //     borderRadius: '5px',
// //     fontSize: '16px',
// //     cursor: 'pointer',
// //     margin: '5px',
// //     width: '200px',
// //     transition: 'background-color 0.3s ease',
// //   },
// //   // Hover effects
// //   hoverEffect: {
// //     '&:hover': {
// //       backgroundColor: '#45a049',
// //     }
// //   }
// // };

// // export default SignIn;
// import React, { useState } from "react";
// import { auth, db } from "../../Firebase/FirebaseConfig";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const roles = ["student", "rector_administrator", "warden"];
//       for (const role of roles) {
//         const userDoc = await getDoc(doc(db, role, user.uid));
//         if (userDoc.exists()) {
//           navigate(`/${role}`);
//           return;
//         }
//       }
//     } catch (error) {
//       console.error("Error signing in:", error);
//       alert("Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h2 style={styles.heading}>Sign In</h2>
//         <form onSubmit={handleSignIn} style={styles.form}>
//           <input
//             type="email"
//             placeholder="Email"
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <button type="submit" style={{ ...styles.button, ...styles.buttonHover }}>Sign In</button>
//         </form>

//         <div style={styles.buttonContainer}>
//           <button
//             onClick={() => navigate("/signup")}
//             style={{ ...styles.secondaryButton, ...styles.secondaryButtonHover }}
//           >
//             Don't have an account? Sign Up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 🎨 **Updated Styles for Left Alignment**
// const styles = {
//   container: {
//     display: 'flex',
//     justifyContent: 'flex-start', // 🔄 Aligns content towards the left
//     alignItems: 'center',
//     minHeight: '100vh',
//     paddingLeft: '10%', // 📍 Moves form slightly towards the left
//   },
//   formContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     padding: '30px',
//     borderRadius: '10px',
//     width: '100%',
//     maxWidth: '400px',
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//   },
//   heading: {
//     fontSize: '24px',
//     marginBottom: '20px',
//     textAlign: 'center',
//     color: '#333',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px',
//   },
//   input: {
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #6C757D', // 🔹 Light blue border
//     borderRadius: '5px',
//     fontSize: '16px',
//   },
//   button: {
//     backgroundColor: '#FF9800', // 🟠 Warm Orange
//     color: 'white',
//     padding: '12px',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '20px',
//     transition: 'background-color 0.3s ease, transform 0.2s ease',
//   },
//   buttonHover: {
//     ':hover': {
//       backgroundColor: '#E68900', // 🟠 Slightly darker orange
//       transform: 'scale(1.05)',
//     },
//   },
//   buttonContainer: {
//     marginTop: '20px',
//     textAlign: 'center',
//   },
//   secondaryButton: {
//     backgroundColor: '#4CAF50', // 🌿 Soft Green
//     color: 'white',
//     padding: '12px',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     margin: '5px',
//     width: '200px',
//     transition: 'background-color 0.3s ease, transform 0.2s ease',
//   },
//   secondaryButtonHover: {
//     ':hover': {
//       backgroundColor: '#388E3C', // 🌿 Slightly darker green
//       transform: 'scale(1.05)',
//     },
//   },
// };

// export default SignIn;
