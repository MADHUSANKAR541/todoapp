'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Sidebar from '@/components/sidebar';

export default function Dashboard() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [removingTask, setRemovingTask] = useState('');
  const [isClient, setIsClient] = useState(false); 
  const { width, height } = useWindowSize();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); 

    const name = localStorage.getItem('username');
    const task = localStorage.getItem('selectedTasks');
    if (name) setUsername(name);
    if (task) {
      setTasks(JSON.parse(task));
    }
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
    localStorage.removeItem('selectedTasks');
    router.push('/tasks');
  };

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
              recycle={false}
              tweenDuration={100}
              run={true}
            />
            <p className={styles.emptyMessage}>You're all caught up! 🎉</p>
            <button
              onClick={() => router.push('/tasks')}
              className={styles.tasksButton}
            >
              Tasks Page
            </button>
          </>
        ) : (
          tasks.map((task) => (
            <div
              key={task}
              className={`${styles.taskCard} ${
                removingTask === task ? styles.removing : ''
              }`}
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
