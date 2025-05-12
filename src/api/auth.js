//First, test the login API

import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    console.log(data);

    const { authToken } = data;
    if (authToken) {
      console.log("Received Data:", data);
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error('["login failed"]', error);
  }
};

export const register = async ({ username, password, email }) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      password,
      email,
    });

    console.log(data);

    const { authToken } = data;
    if (authToken) {
      console.log("Received Data:", data);
      return { success: true, ...data };
    }

    return data;
  } catch (error) {
    console.error('["login failed"]', error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return response.data.success;
  } catch (error) {
    console.error('[Check Permission Failed]:', error);
  }
};
