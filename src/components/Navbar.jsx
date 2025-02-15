import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { auth, db } from "../Firebase/FirebaseConfig"; // Correct import for db
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods

const Navbar = () => {
  const [userRole, setUserRole] = useState(null); // To store the user's role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To track if user is logged in
  const navigate = useNavigate(); // Initialize useNavigate

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch user role from Firestore when user is logged in
        fetchUserRole(user.uid);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user role from Firestore
  const fetchUserRole = async (uid) => {
    const roles = ["student", "rector_administrator", "warden"];
    for (const role of roles) {
      const userDocRef = doc(db, role, uid);  // Reference to the user's document
      const userDoc = await getDoc(userDocRef);  // Fetch the document

      if (userDoc.exists()) {
        setUserRole(role);  // If the document exists, set the role
        return;
      }
    }
  };

  // Sign out function
  const handleSignOut = async () => {
    await auth.signOut(); // Sign out from Firebase
    setUserRole(null); // Clear the user role
    setIsLoggedIn(false); // Set logged-in status to false
    navigate("/signin"); // Redirect to the sign-in page
  };

  // Render navbar items based on the user's role
  const renderNavbarLinks = () => {
    if (!isLoggedIn) {
      return (
        <>
          <Link to="/" style={navLinkStyle}>Home</Link>
          <Link to="/about" style={navLinkStyle}>About</Link>
          <Link to="/contact" style={navLinkStyle}>Contact Us</Link>
          <Link to="/signin" style={navLinkStyle}>Sign In</Link>
          <Link to="/gallery" style={navLinkStyle}>Gallery</Link>
        </>
      );
    }

    switch (userRole) {
      case "warden":
        return (
          <>
            <Link to="/" style={navLinkStyle}>Home</Link>
            <Link to="/about" style={navLinkStyle}>About</Link>
            <Link to="/entry_form" style={navLinkStyle}>Add Entry</Link>
            <Link to="/entry_details" style={navLinkStyle}>Entry Details</Link>
            <Link to="/notifications" style={navLinkStyle}>Notifications</Link>
            <Link to="/notice-list" style={navLinkStyle}>Notices & Updates</Link>
            <Link to="/issues-list" style={navLinkStyle}>Issues</Link>
            <Link to="/leave-management" style={navLinkStyle}>Leave Applications</Link>
            <Link to="/gallery" style={navLinkStyle}>Gallery</Link>
            <Link to="/contact" style={navLinkStyle}>Contact Us</Link>
            <span onClick={handleSignOut} style={navLinkStyle}>Sign Out</span>
          </>
        );
      case "rector_administrator":
        return (
          <>
            <Link to="/" style={navLinkStyle}>Home</Link>
            <Link to="/contact" style={navLinkStyle}>Contact Us</Link>
            <Link to="/about" style={navLinkStyle}>About</Link>
            <Link to="/entry_details" style={navLinkStyle}>Entry Details</Link>
            <Link to="/notifications" style={navLinkStyle}>Notifications</Link>
            <Link to="/notice" style={navLinkStyle}>Add Notices & Updates</Link>
            <Link to="/issues-list" style={navLinkStyle}>Issues</Link>
            <Link to="/leave-management" style={navLinkStyle}>Allow Leave Applications</Link>
            <Link to="/gallery" style={navLinkStyle}>Gallery</Link>
            <span onClick={handleSignOut} style={navLinkStyle}>Sign Out</span>
          </>
        );
      case "student":
        return (
          <>
            <Link to="/" style={navLinkStyle}>Home</Link>
            <Link to="/contact" style={navLinkStyle}>Contact Us</Link>
            <Link to="/about" style={navLinkStyle}>About</Link>
            <Link to="/notifications" style={navLinkStyle}>Notifications</Link>
            <Link to="/notice-list" style={navLinkStyle}>Notices & Updates</Link>
            <Link to="/add-issue" style={navLinkStyle}>Add Issue</Link>
            <Link to="/leave-form" style={navLinkStyle}>Apply for Leave</Link>
            <Link to="/gallery" style={navLinkStyle}>Gallery</Link>
            <span onClick={handleSignOut} style={navLinkStyle}>Sign Out</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#333",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Menu</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {renderNavbarLinks()}
      </nav>
    </div>
  );
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "18px",
  padding: "10px",
  backgroundColor: "#444",
  borderRadius: "5px",
  textAlign: "center",
};

export default Navbar;
