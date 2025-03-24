import React from 'react';
import CompletedTask from './CompletedTask';

const CompletedList = ({ completedTasks, toggleSelected }) => {
  if (!completedTasks) {
    return <div>タスクがありません。</div>; // またはnullなどを返す
  }
  return completedTasks.map((task) => <CompletedTask task={task} key={task.id} toggleSelected={toggleSelected} />);
};

export default CompletedList;