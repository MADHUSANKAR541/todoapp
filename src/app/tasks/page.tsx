'use client';
import { useState, useEffect } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';  // Import Clerk hook
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Sidebar from '@/components/sidebar';
import Loading from '@/components/loading';  // Corrected import path for loading component

export default function TaskPage() {
  const { user, isLoaded } = useUser();  // Get user data and isLoaded status from Clerk
  const [selectedTask, setSelectedTask] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showCustomTaskPopup, setShowCustomTaskPopup] = useState(false);
  const [customTask, setCustomTask] = useState('');
  const router = useRouter();

  // Use user data from Clerk
  const username = user?.firstName || "there";  // Default to "there" if no name found

  const tasks = [
    "Write", "Meditate", "Cook", "Exercise", "Learn", "Walk", "Code"
  ];

  const handleAddTask = (task: string) => {
    if (!selectedTask.includes(task)) {
      setSelectedTask([...selectedTask, task]);
      setFeedbackMessage(`Added ${task}`);
      setTimeout(() => setFeedbackMessage(''), 2000);
    }
  };

  const handleAddCustomTask = () => {
    if (customTask.trim() !== '' && !selectedTask.includes(customTask)) {
      setSelectedTask([...selectedTask, customTask]);
      setFeedbackMessage(`Added ${customTask}`);
      setCustomTask('');
      setTimeout(() => setFeedbackMessage(''), 2000);
    }
  };

  const handleContinue = () => {
    localStorage.setItem('selectedTasks', JSON.stringify(selectedTask));
    router.push('/dashboard');
  };

  if (!isLoaded) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.userButtonWrapper}>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: '48px',
                height: '48px',
              },
            },
          }}
        />
      </div>
      <Sidebar />
      {feedbackMessage && <div className={styles.popup}>{feedbackMessage}</div>}

      <h1 className={styles.heading}>Hey {username}, what would you like to do today?</h1>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div className={styles.taskItem} key={task}>
            <h2>{task}</h2>
            <button onClick={() => handleAddTask(task)}>ADD</button>
          </div>
        ))}
      </div>

      <div className={styles.continueWrapper}>
        <button onClick={() => setShowCustomTaskPopup(true)} className={styles.button}>Other</button>
        {selectedTask.length > 0 && (
          <button onClick={handleContinue} className={styles.button}>Continue</button>
        )}
      </div>

      {showCustomTaskPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupCard}>
            <button onClick={() => setShowCustomTaskPopup(false)} className={styles.closeButton}>✖</button>
            <h3>Enter your custom task:</h3>
            <input
              type="text"
              value={customTask}
              onChange={(e) => setCustomTask(e.target.value)}
              className={styles.input}
              placeholder="Type your task..."
            />
            <button onClick={handleAddCustomTask} className={styles.button}>Add Task</button>
          </div>
        </div>
      )}
    </div>
  );
}
