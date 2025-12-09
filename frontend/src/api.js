const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, options);
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }
  if (!res.ok) throw { message: res.statusText };
  return null;
}

export const register = (payload) =>
  request("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const login = (payload) =>
  request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

export const fetchTasks = (token) =>
  request("/tasks", { headers: { Authorization: `Bearer ${token}` } });

export const createTask = (token, payload) =>
  request("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

export const updateTask = (token, id, payload) =>
  request(`/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

export const deleteTask = (token, id) =>
  request(`/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

export default { register, login, fetchTasks, createTask, updateTask, deleteTask };
