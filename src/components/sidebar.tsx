'use client';
import { useState } from 'react';
import styles from './Sidebar.module.scss';

export default function Sidebar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button className={styles.hamburger} onClick={() => setIsNavOpen(!isNavOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isNavOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={() => setIsNavOpen(false)}>✖</button>
        <ul>
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/tasks">My Tasks</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
    </>
  );
}
