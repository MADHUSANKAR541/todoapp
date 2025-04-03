'use client';
import { useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';


export default function Homepage(){
  const [name,setname]=useState('');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('username');
    const selectedTasks = JSON.parse(localStorage.getItem('selectedTasks') || '[]');

    if (storedName){
      router.push('/tasks');
    }
    if (selectedTasks.length > 0) {
      router.push('/dashboard');
    }
  }, []);
  const handlesubmit=()=>{
    if (name.trim()!=''){
        
      localStorage.setItem('username',name)
      router.push("/tasks");
    }
  };

  return(
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Your To-Do App</h1>
      <input
      className={styles.input}
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
      <button onClick={handlesubmit} className={styles.button}>
        Start My Day
      </button>
    </div>
  );
}
