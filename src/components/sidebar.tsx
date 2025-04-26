"use client";
import { useState } from "react";
import styles from "./sidebar.module.scss";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // ✅ Use `useAuth` for signOut

export default function Sidebar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth(); // ✅ Access signOut from Clerk

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut({ redirectUrl: "/" }); // ✅ Redirects to your home page
      localStorage.clear(); // ✅ Clears any cached client data
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className={styles.hamburger}
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      <nav
        className={`${styles.sidebar} ${isNavOpen ? styles.open : ""}`}
        role="navigation"
      >
        <button
          className={styles.closeButton}
          onClick={() => setIsNavOpen(false)}
          aria-label="Close navigation menu"
        >
          ✖
        </button>
        <ul>
          <li onClick={() => router.push("/profile")}>Profile</li>
          <li onClick={() => router.push("/dashboard")}>Dashboard</li>
          <li onClick={() => router.push("/tasks")}>My Tasks</li>
          <li onClick={() => router.push("/history")}>History</li>
          <li onClick={() => router.push("/settings")}>Settings</li>
          <li onClick={handleLogout} className={styles.logout}>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </li>
        </ul>
      </nav>
    </>
  );
}
