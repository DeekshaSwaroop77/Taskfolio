// src/api/todos.js

//set up axios
import axios from 'axios';
// const baseUrl = 'http://localhost:3004';
const baseUrl = 'https://todo-list.alphacamp.io/api/';

const axiosInstance = axios.create({
  baseUrl: baseUrl,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    console.error(error);
  }
);

// Use Axios to send a request to the backend database, so we need to wait for the response
// before proceeding with the next steps. This kind of "waiting" flow is called "asynchronous" processing.

//get todo data
export const getTodos = async () => {
  try {
    const res = await axiosInstance.get(`${baseUrl}/todos`);
    // Actually, the data from getTodo is nested one level deeper
    return res.data.data;
  } catch (error) {
    console.error('[GET todos failed:]:', error);
  }
};

//create new todo data
export const createTodo = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axiosInstance.post(`${baseUrl}/todos`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[CREATE todos failed:]:', error);
  }
};
export const patchTodo = async (payload) => {
  try {
    const { id, title, isDone } = payload;
    const res = await axiosInstance.patch(`${baseUrl}/todos/${id}`, {
      title,
      isDone,
    });
    return res.data;
  } catch (error) {
    console.error('[Update todos failed:]:', error);
  }
};
export const deleteTodo = async (id) => {
  try {
    const res = await axiosInstance.delete(`${baseUrl}/todos/${id}`);
    return res.data;
  } catch (error) {
    console.error('[delete todos failed:]:', error);
  }
};
