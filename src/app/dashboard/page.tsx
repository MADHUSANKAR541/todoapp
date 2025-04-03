'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';



export default function Dashboard() {
    const [tasks, setTasks] = useState<string[]>([]);
    const [username,setUsername]=useState('');
    const [removingTask, setRemovingTask] = useState('');
    const router = useRouter();
    const { width, height } = useWindowSize();  

    useEffect(() => {
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
      

      return (
        <div className={styles.pageWrapper}>
          <div className={styles.container}>
            <h1 className={styles.heading}>Hey, {username} here is your Dashboard</h1>
      
            {tasks.length === 0 ? (
              <>
              <Confetti width={width} height={height}/>
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