import axios from "axios";

axios.defaults.withCredentials = true;
export const login = async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`;
  const response = (await axios.post(url, data)).data;
  return response;
};

export const createTask = async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;
  const response = (await axios.post(url, data)).data;
  return response;
};
