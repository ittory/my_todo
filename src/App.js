import './App.css';
import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IncompleteList from "./IncompleteList";
import CompletedList from './CompletedList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const taskNameRef = useRef();
  
  const handleAddTask = () => {
    const taskName = taskNameRef.current.value;
    if (taskName === "") return;
    setTasks((prevTasks) => {
      return [...prevTasks, {id:uuidv4(), name: taskName, completed: false, selected: false}]
    })
    taskNameRef.current.value = null;
  };

  const toggleSelected = (id, fromCompleted = false) => {
    // タスクのチェック状態を管理する
    if (fromCompleted) {
      setCompletedTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, selected: !task.selected } : task
        )
      );
    } else {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, selected: !task.selected } : task
        )
      );
    }
  };

  const handleTaskToComplete = () => {
    const selectedTasks = tasks.filter((task) => task.selected);
    if (selectedTasks.length > 0) {
      setCompletedTasks([...completedTasks, ...selectedTasks.map(task => ({ ...task, completed: true, selected: false }))]);
      setTasks(tasks.filter((task) => !task.selected));
    }
  };

  const handleTaskToIncomplete = () => {
    const selectedTasks = completedTasks.filter((task) => task.selected);
    if (selectedTasks.length > 0) {
      setTasks([...tasks, ...selectedTasks.map(task => ({ ...task, completed: false, selected: false }))]);
      setCompletedTasks(completedTasks.filter((task) => !task.selected));
    }
  };

  const handleDeleteTask = (fromCompleted = false) => {
    if (fromCompleted) {
      setCompletedTasks((prevTasks) => prevTasks.filter((task) => !task.selected));
    } else {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.selected));
    }
  };

  return (
    <div>
      <div>【未完了のタスク】</div>
      <input type="text" ref={taskNameRef}/>
      <button onClick={handleAddTask}>タスクを追加</button>
      <button onClick={handleTaskToComplete}>完了にする</button>
      <button onClick={() => handleDeleteTask(false)}>未完了リストから削除</button>
      <IncompleteList tasks={tasks} toggleSelected={(id) => toggleSelected(id, false)} onDelete={() => handleDeleteTask(false)} />
      <br />
      <br />
      <div>【完了】</div>
      <button onClick={handleTaskToIncomplete}>未完了に戻す</button>
      <button onClick={() => handleDeleteTask(true)}>完了リストから削除</button>
      <CompletedList completedTasks={completedTasks} toggleSelected={(id) => toggleSelected(id, true)} onDelete={() => handleDeleteTask(true)} />
    </div>
  );
}

export default App;
