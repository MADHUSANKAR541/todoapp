'use client';
import { useState } from 'react';
import styles from './sidebar.module.scss';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

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
      <nav className={`${styles.sidebar} ${isNavOpen ? styles.open : ''}`} role="navigation">
        <button 
          className={styles.closeButton} 
          onClick={() => setIsNavOpen(false)} 
          aria-label="Close navigation menu"
        >
          ✖
        </button>
        <ul>
          <li><a onClick={() => router.push('/dashboard')}>Dashboard</a></li>
          <li><a onClick={() => router.push('/tasks')}>My Tasks</a></li>
          <li><a onClick={() => router.push('/settings')}>Settings</a></li>
          <li><a onClick={() => router.push('/logout')}>Logout</a></li>
        </ul>
      </nav>
    </>
  );
}
