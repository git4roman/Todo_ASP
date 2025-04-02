import axios from "axios";

const API_URL = "http://localhost:5138/api/todos";

export const getTodos = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};
export const postTodo = async (title) => {
  const response = await axios.post(`${API_URL}`, {
    title,
    isCompleted: false,
  });
};
export const getTodo = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  //   getTodos();
  // return response.data;
};
export const editTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data;
};
