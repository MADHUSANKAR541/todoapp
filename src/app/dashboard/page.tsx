'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Sidebar from '@/components/sidebar';
import Loading from '@/components/loading';
import Pencil from '@/components/pencil';

export default function Dashboard() {
  const [ongoingTasks, setOngoingTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [username, setUsername] = useState('');
  const [removingTask, setRemovingTask] = useState('');
  const [isClient, setIsClient] = useState(false); 
  const { width, height } = useWindowSize();
  const router = useRouter();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRestartLoading, setIsRestartLoading] = useState(false);
  const [istaskloading, setIstaskloading] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const name = localStorage.getItem('username');
    const task = localStorage.getItem('selectedTasks');
    if (name) setUsername(name);
    if (task) {
      setOngoingTasks(JSON.parse(task));
    }

    setTimeout(() => setIsInitialLoading(false), 1000);
  }, []);

  const handleComplete = (task: string) => {
    setRemovingTask(task);
    setTimeout(() => {
      setOngoingTasks(prev => prev.filter(t => t !== task));
      setCompletedTasks(prev => [...prev, task]);
      setRemovingTask('');
    }, 400);
  };

  const handleRestart = () => {
    setIsRestartLoading(true);
    localStorage.removeItem('selectedTasks');
    setTimeout(() => {
      router.push('/tasks');
      setIsRestartLoading(false);
    }, 5000);
  };

  const handletask = () => {
    setIstaskloading(true);
    localStorage.removeItem('selectedTasks');
    setTimeout(() => {
      router.push('/tasks');
      setIstaskloading(false);
    }, 1000);
  };

  if (isInitialLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading />
      </div>
    );
  }

  if (isRestartLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Pencil />
      </div>
    );
  }

  if (istaskloading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <Sidebar />
      <button className={styles.restartButton} onClick={handleRestart} disabled={isRestartLoading}>
        🔁 Restart Day
      </button>
      <div className={styles.container}>
        <h1 className={styles.heading}>Here is your Dashboard</h1>

        {isClient && (ongoingTasks.length === 0 && completedTasks.length === 0) ? (
          <>
            
            <p className={styles.emptyMessage}>You're all caught up! 🎉</p>
            
          </>
        ) : (
          <div className={styles.dashboardGrid}>
            {/* Ongoing Tasks Column */}
            <div className={styles.column}>
              <h2 className={styles.columnTitle}>Ongoing Tasks</h2>
              {ongoingTasks.length > 0 ? (
                ongoingTasks.map((task) => (
                  <div
                    key={task}
                    className={`${styles.taskCard} ${removingTask === task ? styles.removing : ''}`}
                  >
                    <h1 className={styles.taskTitle}>{task}</h1>
                    <button onClick={() => handleComplete(task)} className={styles.completeButton}>
                      ✅ Completed
                    </button>
                  </div>
                ))
              ) : (
                <>
                <p className={styles.emptyMessageSmall}>No ongoing tasks 🎯</p>
                <Confetti
                  width={width}
                  height={height}
                  numberOfPieces={width < 500 ? 200 : 500}
                  gravity={0.6}
                  wind={0}
                  recycle={false}
                  run={true}
                />
                <button onClick={handletask} className={styles.tasksButton}>
              Tasks Page
            </button>
                </>
              )}
            </div>

            {/* Completed Tasks Column */}
            <div className={styles.column}>
              <h2 className={styles.columnTitle}>Completed Tasks</h2>
              {completedTasks.length > 0 ? (
                completedTasks.map((task) => (
                  <div key={task} className={styles.taskCardCompleted}>
                    <h1 className={styles.taskTitleCompleted}>{task}</h1>
                  </div>
                ))
              ) : (
                <p className={styles.emptyMessageSmall}>No tasks completed yet 🚀</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
