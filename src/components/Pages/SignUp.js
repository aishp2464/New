import React, { useState } from "react";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    hostelBlock: "",
    roomNumber: "",
    parentsMobile: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign up user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Determine the Firestore collection based on role
      const collection =
        formData.role === "warden"
          ? "warden"
          : formData.role === "rector" || formData.role === "administrator"
          ? "rector_administrator"
          : "student";

      // Save user details in Firestore
      await setDoc(doc(db, collection, user.uid), {
        ...formData,
        uid: user.uid,
      });

      alert("Sign up successful!");
      navigate("/signin"); // Redirect to Sign-In page after success
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>🔐 Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required style={styles.input} />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required style={styles.input} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
          <input type="text" name="mobile" placeholder="Mobile Number" onChange={handleChange} required style={styles.input} />
          <input type="text" name="hostelBlock" placeholder="Hostel Block" onChange={handleChange} style={styles.input} />
          <input type="text" name="roomNumber" placeholder="Room Number" onChange={handleChange} style={styles.input} />
          <input type="text" name="parentsMobile" placeholder="Parents' Mobile Number" onChange={handleChange} style={styles.input} />
          
          <select name="role" onChange={handleChange} required style={styles.input}>
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="rector">Rector</option>
            <option value="administrator">Administrator</option>
            <option value="warden">Warden</option>
          </select>

          <button type="submit" style={styles.button}>Sign Up</button>
        </form>

        <div style={styles.buttonContainer}>
          <button onClick={() => navigate("/signin")} style={styles.secondaryButton}>Already have an account? Sign In</button>
        </div>
      </div>
    </div>
  );
};

// 🎨 **Glassmorphism Styling**
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
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
  buttonContainer: {
    marginTop: "15px",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#8E44AD",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
    marginTop: "10px",
    transition: "background-color 0.3s",
  },
};

export default SignUp;

// import React, { useState } from "react";
// import { auth, db } from "../../Firebase/FirebaseConfig";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { setDoc, doc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//   const [formData, setFormData] = useState({
//     name: "", email: "", password: "", mobile: "",
//     hostelBlock: "", roomNumber: "", parentsMobile: "", role: ""
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
//       const user = userCredential.user;
//       const collection = formData.role === "warden" ? "warden" : formData.role === "rector" || formData.role === "administrator" ? "rector_administrator" : "student";
//       await setDoc(doc(db, collection, user.uid), { ...formData, uid: user.uid });

//       alert("Sign up successful!");
//       navigate("/signin"); // Navigate to Sign In page after successful sign-up
//     } catch (error) {
//       console.error("Error signing up:", error);
//       alert("Error signing up. Please try again.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.formContainer}>
//         <h2 style={styles.heading}>Sign Up</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//           <input
//             type="text"
//             name="mobile"
//             placeholder="Mobile Number"
//             onChange={handleChange}
//             required
//             style={styles.input}
//           />
//           <input
//             type="text"
//             name="hostelBlock"
//             placeholder="Hostel Block"
//             onChange={handleChange}
//             style={styles.input}
//           />
//           <input
//             type="text"
//             name="roomNumber"
//             placeholder="Room Number"
//             onChange={handleChange}
//             style={styles.input}
//           />
//           <input
//             type="text"
//             name="parentsMobile"
//             placeholder="Parents' Mobile Number"
//             onChange={handleChange}
//             style={styles.input}
//           />
//           <select
//             name="role"
//             onChange={handleChange}
//             required
//             style={styles.input}
//           >
//             <option value="">Select Role</option>
//             <option value="student">Student</option>
//             <option value="rector">Rector</option>
//             <option value="administrator">Administrator</option>
//             <option value="warden">Warden</option>
//           </select>
//           <button type="submit" style={styles.button}>Sign Up</button>
//         </form>

//         <div style={styles.buttonContainer}>
//           <button onClick={() => navigate("/signin")} style={styles.secondaryButton}>Already have an account? Sign In</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Inline CSS
// const styles = {
//   container: {
//     container: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '80vh',
//       backgroundPosition: 'center',
//       position: 'center', // Fixing typo here
//     },
//   },
//   overlay: {
//     position: 'absolute',
//     top: '0',
//     left: '0',
//     right: '0',
//     bottom: '0',
//     backgroundColor: 'rgba(173, 216, 230, 0.5)', // Light bluish color
//     zIndex: '1',
//   },
//   formContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.9)', 
//     padding: '30px',
//     borderRadius: '10px',
//     width: '100%',
//     maxWidth: '400px',
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     zIndex: '2',
//     position: 'relative',
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
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     fontSize: '16px',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     color: 'white',
//     padding: '12px',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '20px',
//     transition: 'background-color 0.3s ease',
//   },
//   buttonContainer: {
//     marginTop: '20px',
//     textAlign: 'center',
//   },
//   secondaryButton: {
//     backgroundColor: '#007BFF',
//     color: 'white',
//     padding: '12px',
//     border: 'none',
//     borderRadius: '5px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     margin: '5px',
//     width: '200px',
//     transition: 'background-color 0.3s ease',
//   },
// };

// export default SignUp;
