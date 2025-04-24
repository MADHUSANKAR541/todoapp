'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Sidebar from '@/components/sidebar';
import Loading from '@/components/loading'; // Corrected import path for loading component
import Pencil from '@/components/pencil'; // Corrected import path for pencil loading component

export default function Dashboard() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [removingTask, setRemovingTask] = useState('');
  const [isClient, setIsClient] = useState(false); 
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Track initial page load
  const [isRestartLoading, setIsRestartLoading] = useState(false); // Track restart button click
  const [istaskloading, setIstaskloading] = useState(false); // Track task button click

  useEffect(() => {
    setIsClient(true); 

    const name = localStorage.getItem('username');
    const task = localStorage.getItem('selectedTasks');
    if (name) setUsername(name);
    if (task) {
      setTasks(JSON.parse(task));
    }

    // Simulate initial loading duration
    setTimeout(() => setIsInitialLoading(false), 1000);
  }, []);

  const Handleremove = (task: string) => {
    setRemovingTask(task);
    setTimeout(() => {
      const newTasks = tasks.filter((t) => t !== task);
      setTasks(newTasks);
      localStorage.setItem('selectedTasks', JSON.stringify(newTasks));
      setRemovingTask('');
    }, 400);
  };

  const handleRestart = () => {
    setIsRestartLoading(true); // Start pencil loading
    localStorage.removeItem('selectedTasks');
    setTimeout(() => {
      router.push('/tasks'); // Navigate to the tasks page
      setIsRestartLoading(false); // Stop pencil loading after 3 seconds
    }, 50000); // 3-second delay for the pencil loading animation
  };

  const handletask = () => {
    setIstaskloading(true); // Start pencil loading
    localStorage.removeItem('selectedTasks');
    setTimeout(() => {
      router.push('/tasks'); // Navigate to the tasks page
      setIstaskloading(false); // Stop pencil loading after 3 seconds
    }, 1000); // 3-second delay for the pencil loading animation
  };

  // Show normal loading during initial page load
  if (isInitialLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading />  {/* Normal loading animation */}
      </div>
    );
  }

  // Show pencil loading animation when restart button is clicked
  if (isRestartLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Pencil />  {/* Pencil loading animation */}
      </div>
    );
  }

  if (istaskloading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading />  {/* Pencil loading animation */}
      </div>
    );
  }


  return (
    <div className={styles.pageWrapper}>
      <Sidebar />
      <button className={styles.restartButton} onClick={handleRestart}>🔁 Restart Day</button>
      <div className={styles.container}>
        <h1 className={styles.heading}>Here is your Dashboard</h1>

        {isClient && tasks.length === 0 ? (
          <>
            <Confetti
              width={width}
              height={height}
              numberOfPieces={500}
              gravity={0.6}
              wind={0}
              recycle={true}
              tweenDuration={1000}
              run={true}
            />
            <p className={styles.emptyMessage}>You're all caught up! 🎉</p>
            <button
              onClick={handletask}
              className={styles.tasksButton} 
            >
              Tasks Page
            </button>
          </>
        ) : (
          tasks.map((task) => (
            <div
              key={task}
              className={`${styles.taskCard} ${removingTask === task ? styles.removing : ''}`}
            >
              <h1 className={styles.taskTitle}>{task}</h1>
              <button
                onClick={() => Handleremove(task)}
                className={styles.completeButton}
              >
                ✅ Completed
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
