const API_URL = "http://localhost:5000/tasks";

export const getTasks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addTask = async (title: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, status: "To Do" }),
  });
  return response.json();
};

export const updateTaskStatus = async (id: string, status: string) => {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
};

export const deleteTask = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
