import React, { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");

  const save = () => {
    onUpdate(task._id, { title, description });
    setEditing(false);
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
      {editing ? (
        <div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={save}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h4 style={{ margin: 0 }}>{task.title}</h4>
          <p style={{ margin: "0.5rem 0" }}>{task.description}</p>
          <div>
            <small>Status: {task.status}</small>
          </div>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => onUpdate(task._id, { status: task.status === "done" ? "pending" : "done" })}>
              Toggle Status
            </button>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
