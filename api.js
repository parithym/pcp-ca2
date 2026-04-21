import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async () => {
  const response = await axios.post(`${BASE_URL}/public/token`, {
    studentId: "E0423017",
    password: "451560",
  });
  return response.data.token;
};

export const getData = async (token) => {
  const response = await axios.get(`${BASE_URL}/private/data`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
