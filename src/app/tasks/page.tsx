'use client';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';  // Import Clerk hook
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Sidebar from '@/components/sidebar';

export default function TaskPage() {
  const { user } = useUser();  // Get user data from Clerk
  const [selectedTask, setSelectedTask] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showCustomTaskPopup, setShowCustomTaskPopup] = useState(false);
  const [customTask, setCustomTask] = useState('');
  const router = useRouter();

  // Use user data from Clerk
  const username = user?.firstName || 'there';  // Default to "there" if no name found

  const tasks = [
    "Write", "Meditate", "Cook", "Organize", "Journal", "Exercise", "Learn", "Plan", "Walk", "Paint", "Declutter", "Stretch", "Code", "Listen"
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

  return (
    <div className={styles.container}>
      <Sidebar/>
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
