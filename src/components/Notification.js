import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase/FirebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // Get the currently logged-in user
        const user = auth.currentUser;
        if (!user) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }

        // Fetch user role from Firestore
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          console.log("User document not found");
          setLoading(false);
          return;
        }

        const userData = userSnap.data();
        const userRole = userData.role; // Assuming role field exists in Firestore

        // Fetch notifications based on the user's role
        const notificationsRef = collection(db, "notifications");
        const q = query(notificationsRef, where("role", "==", userRole));
        const querySnapshot = await getDocs(q);

        const fetchedNotifications = [];
        querySnapshot.forEach((doc) => {
          fetchedNotifications.push({ id: doc.id, ...doc.data() });
        });

        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications found</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>{notification.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
