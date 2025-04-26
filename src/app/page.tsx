'use client';
import styles from './page.module.scss';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useUser } from "@clerk/nextjs";
const AnimatedBackground = dynamic(() => import('./back'), { ssr: false });

export default function WelcomePage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

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
      <header className={styles.header}>
        <div className={styles.logo}>Toodoo</div>
      </header>
  
      <section className={styles.hero}>
        <h1 className={styles.heading}>Plan Your Moves. Own Your Day. ⚡</h1>
        <p className={styles.subheading}>Master your schedule with effortless task management built for go-getters.</p>
        <button className={styles.authButton} onClick={handleSignIn}>Start Your Day</button>
      </section>
  
      <AnimatedBackground />
    </div>
  );
  
}
