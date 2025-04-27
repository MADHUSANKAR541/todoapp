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
  const [tasks, setTasks] = useState<string[]>([]);
  const router = useRouter();

  // Use user data from Clerk
  const username = user?.firstName || "there";  // Default to "there" if no name found

  useEffect(() => {
    const allPossibleTasks = [
      "Sketch", "Read", "Sing", "Stretch", "Journal", "Clean", "Organize", "Dance", "Water Plants", "Call a Friend",
      "Bake", "Play", "Plan", "Paint", "Code", "Walk", "Study", "Relax", "Learn", "Explore", "Write", "Meditate",
      "Cook", "Cycle", "Listen to Music", "Watch Documentary", "Practice Gratitude", "Yoga", "Declutter Desk",
      "Fix Something", "Play Instrument", "Take a Nap", "Do Laundry", "Wash Dishes", "Make Bed", "Try Origami",
      "Make Smoothie", "Sketch Idea", "Check Email", "Backup Files", "Review Goals", "Draw Mandala", "Fold Clothes",
      "Donate Items", "Stretch Back", "Update Resume", "Read News", "Read a Blog", "Write a Poem", "Practice Typing",
      "Update Budget", "Organize Photos", "Start a Journal", "Reflect on Day", "Make a To-Do", "Refactor Code",
      "Refill Water", "Eat a Fruit", "Make Tea", "Fix a Bug", "Write an Idea", "Read a Book Chapter", "Walk Barefoot",
      "Organize Cables", "Call Parents", "Polish Shoes", "Clean Mirror", "Organize Tabs", "Make Salad", "Water Garden",
      "Create Playlist", "Check Calendar", "Learn Shortcut", "Practice Breathing", "Stretch Neck", "Do Jumping Jacks",
      "Tidy Desktop", "Organize Notes", "Doodle", "Write a Letter", "Compliment Someone", "Recycle Trash", "Play Chess",
      "Check Weather", "Wash Face", "Trim Nails", "Try a Puzzle", "Make Origami", "Take Deep Breaths", "Sort Papers",
      "Paint Nails", "Brush Pet", "Clean Keyboard", "Charge Devices", "Learn a Fact", "Write Review", "Try Tongue Twister",
      "Check Finances", "Do Nothing", "Take a Break"
    ];

    const getRandomTasks = (count: number) => {
      const shuffled = allPossibleTasks.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setTasks(getRandomTasks(7));
  }, []);

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

  const handleContinue = async () => {

    
    try {
      await fetch('/api/save-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: selectedTask }),
      });
    } catch (e) {
      console.error("Error saving to Elasticsearch:", e);
    }
    router.push('/dashboard');
    localStorage.setItem('selectedTasks', JSON.stringify(selectedTask));
    
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

      <h1 className={styles.heading}>Hi {username}, your daily adventure starts now!</h1>

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
