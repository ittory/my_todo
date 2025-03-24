import React from 'react'
import Task from './Task';

const IncompleteList = ({tasks, toggleSelected}) => {
  if (!tasks) {
    return <div>タスクがありません。</div>; // またはnullなどを返す
  }
  return tasks.map((task) => <Task task={task} key={task.id} toggleSelected={toggleSelected}/>);
}

export default IncompleteList