'use client';
import styles from './page.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useUser } from "@clerk/nextjs";
const AnimatedBackground = dynamic(() => import('./back'), { ssr: false });

export default function WelcomePage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser(); // ✅ use isLoaded to prevent premature redirect

  useEffect(() => {
    if (!isLoaded) return; // ⏳ Wait for auth to load

    if (isSignedIn) {
      const selectedTasks = JSON.parse(localStorage.getItem("selectedTasks") || "[]");

      console.log("User is signed in.");
      console.log("Selected Tasks:", selectedTasks);

      if (selectedTasks.length === 0) {
        router.replace("/tasks");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isSignedIn, isLoaded, router]);

  const handleSignIn = () => router.push('/sign-in?redirect_url=/tasks');
  const handleSignUp = () => router.push('/sign-up?redirect_url=/tasks');

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Your Day!</h1>
      <div className={styles.buttonWrapper}>
        <button className={styles.authButton} onClick={handleSignIn}>Sign In</button>
        <button className={styles.authButton} onClick={handleSignUp}>Sign Up</button>
      </div>
      <AnimatedBackground />
    </div>
  );
}
