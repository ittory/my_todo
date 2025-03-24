import React from "react"

const Task = ({ task, toggleSelected }) => {
    return (
        <div>
        <label>
            <input
            type="checkbox"
            checked={task.selected}
            onChange={() => toggleSelected(task.id)}
            />
        </label>
        {task.name}
        </div>
    )
};

export default Task;