import React from 'react';

const StudentDashboard = () => {
  return (
    <div style={styles.dashboard}>
      <h1 style={styles.heading}>Welcome to the Student Dashboard</h1>
      <div style={styles.options}>
        <button style={{ ...styles.button, animation: 'slideInLeft 1s ease-in-out' }}>
          View Notifications
        </button>
        <button style={{ ...styles.button, animation: 'slideInRight 1.2s ease-in-out' }}>
          Add Issues
        </button>
        <button style={{ ...styles.button, animation: 'slideInLeft 1.4s ease-in-out' }}>
          Apply for Leave
        </button>
        <button style={{ ...styles.button, animation: 'slideInRight 1.6s ease-in-out' }}>
          Add Related Resources
        </button>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes slideInLeft {
            0% { opacity: 0; transform: translateX(-100px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(100px); }
            100% { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  dashboard: {
    textAlign: 'center',
    background: 'rgba(0, 0, 0, 0.7)',  // Transparent black overlay to match background
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0px 0px 20px rgba(255, 215, 0, 0.6)', // Gold glow
    width: '400px',
    margin: 'auto',
    color: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    animation: 'fadeInScale 1s ease-in-out',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    background: 'linear-gradient(90deg, #FFD700, #FF8C00)', // Gold to Orange Gradient
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    background: 'linear-gradient(90deg, #FFD700, #FF4500)',  // Gold to Red Gradient
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0px 4px 15px rgba(255, 215, 0, 0.5)', // Soft Gold Glow
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
};

export default StudentDashboard;

// import React from 'react'

// const StudentDashboard = () => {
//   return (
//     <div>
//       student
//     </div>
//   )
// }

// export default StudentDashboard
