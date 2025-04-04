'use client';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const AnimatedBackground = dynamic(() => import('./back'), { ssr: false });

export default function WelcomePage() {
  const router = useRouter();

  const handleSignIn = () => router.push('/sign-in?redirect_url=/tasks');
  const handleSignUp = () => router.push('/sign-up?redirect_url=/tasks');

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Your Day!</h1>
      <div className={styles.buttonWrapper}>
        <button className={styles.authButton} onClick={handleSignIn}>Sign In</button>
        <button className={styles.authButton} onClick={handleSignUp}>Sign Up</button>
      </div>
      <AnimatedBackground/> 
    </div>
  );
}
