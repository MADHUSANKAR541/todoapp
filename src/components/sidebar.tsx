"use client";
import { useState } from "react";
import styles from "./sidebar.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // ✅ Use `useAuth` for signOut

export default function Sidebar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth(); // ✅ Access signOut from Clerk

  const handleLogout = async () => {
    try {
      await signOut({ redirectUrl: "/" }); // ✅ Redirects to your home page instead of Clerk-hosted sign-in
      localStorage.clear(); // ✅ Clears any cached client data
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <div
        className={styles.hamburger}
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </div>

      {/* Sidebar */}
      <nav className={`${styles.sidebar} ${isNavOpen ? styles.open : ""}`} role="navigation">
        <div
          className={styles.closeButton}
          onClick={() => setIsNavOpen(false)}
          aria-label="Close navigation menu"
        >
          ✖
        </div>
        <ul>
          <li onClick={() => router.push("/profile")}>Profile</li>
          <li onClick={() => router.push("/dashboard")}>Dashboard</li>
          <li onClick={() => router.push("/tasks")}>My Tasks</li>
          <li onClick={() => router.push("/history")}>History</li>
          <li onClick={() => router.push("/settings")}>Settings</li>
          <li onClick={handleLogout} className={styles.logout}>Logout</li>
        </ul>
      </nav>
    </>
  );
}
