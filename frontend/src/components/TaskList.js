import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import api from "../api";

export default function TaskList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.fetchTasks(token);
      setTasks(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (token) load(); }, [token]);

  const handleCreate = async (payload) => {
    const t = await api.createTask(token, payload);
    setTasks((s) => [t, ...s]);
  };

  const handleUpdate = async (id, payload) => {
    try {
      const updated = await api.updateTask(token, id, payload);
      setTasks((s) => s.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(token, id);
      setTasks((s) => s.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Your Tasks</h3>
      <CreateTaskForm onCreate={handleCreate} />
      {loading ? <div>Loading...</div> : null}
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
    </div>
  );
}

function CreateTaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title) return;
    onCreate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <div>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
}
