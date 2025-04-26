"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import styles from "./page.module.scss"; // ✅ Import styles
import Sidebar from "@/components/sidebar"; // ✅ Import Sidebar component

export default function Settings() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useAuth();

  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const handleLogout = async () => {
    await signOut();
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className={styles.settingsContainer}>
      <Sidebar /> {/* ✅ Include Sidebar component */}
      <h1 className={styles.title}>Settings</h1>

      {/* User Profile */}
      <div className={styles.profileSection}>
        <h2 className={styles.sectionTitle}>Profile Info</h2>
        <p><strong>Name:</strong> {user?.fullName}</p>
        <p><strong>Email:</strong> {user?.primaryEmailAddress?.emailAddress}</p>
      </div>

      {/* Account Settings */}
      <div className={styles.accountSettings}>
        <h2 className={styles.sectionTitle}>Account Settings</h2>
        <div className={styles.label}>
          <input
            type="checkbox"
            checked={notificationEnabled}
            onChange={() => setNotificationEnabled(!notificationEnabled)}
          />
          Enable Notifications
        </div>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </div>
  );
}
