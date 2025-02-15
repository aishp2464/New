import React from 'react';

const RectorDashboard = () => {
  return (
    <div style={styles.dashboard}>
      <h1 style={styles.heading}>Rector Admin Dashboard</h1>
      <div style={styles.options}>
        <button style={{ ...styles.button, animation: 'slideInLeft 1s ease-in-out' }}>
          Manage Users
        </button>
        <button style={{ ...styles.button, animation: 'slideInRight 1.2s ease-in-out' }}>
          Reports
        </button>
        <button style={{ ...styles.button, animation: 'slideInLeft 1.4s ease-in-out' }}>
          Settings
        </button>
        <button style={{ ...styles.button, animation: 'slideInRight 1.6s ease-in-out' }}>
          Logs
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
    background: 'linear-gradient(135deg, #1e1e2e, #232340)',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0px 0px 20px rgba(0, 255, 255, 0.5)',
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
    background: 'linear-gradient(90deg, #ff007f, #ffcc00)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  button: {
    background: 'linear-gradient(90deg, #ff007f, #ffcc00)',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0px 4px 15px rgba(255, 0, 127, 0.3)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
};

export default RectorDashboard;

// import React from 'react'

// const RectorAdminDashboard = () => {
//   return (
//     <div>
//       rector
//     </div>
//   )
// }

// export default RectorAdminDashboard
