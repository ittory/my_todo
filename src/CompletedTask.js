import React from "react"

const CompletedTask = ({ task, toggleSelected }) => {
    return (
        <div>
        <label>
            <input
            type="checkbox"
            checked={task.selected}
            onChange={() => toggleSelected(task.id)}
            />
        </label>
        <span style={{ textDecoration: 'line-through' }}>{task.name}</span>
        </div>
    )
};

export default CompletedTask;