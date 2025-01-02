// Import axios untuk melakukan request HTTP
import axios from 'axios';

// URL dari API backend, didapatkan dari environment variable
const API_URL = process.env.REACT_APP_API_URL;

// Fungsi login, mengirim email dan password ke backend
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/v1/login`, {
      email,
      password,
    });

    console.log('req api login user');

    // Jika login berhasil, response akan berisi token JWT
    if (response.data.token) {
      // Simpan token di localStorage atau cookie (HTTP-only cookie lebih disarankan)
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Fungsi logout, menghapus token dari localStorage
export const logout = () => {
  localStorage.removeItem('token');
  // Redirect ke halaman login atau lakukan tindakan lain setelah logout
};

// Fungsi untuk mengambil token dari localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Fungsi untuk memeriksa apakah user sudah login
export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};

// Fungsi untuk me-refresh token JWT
export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/v1/refresh-token`, {
      token: getToken(),
    });

    if (response.data.token) {
      // Simpan token baru di localStorage
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

// Fungsi untuk membuat header Authorization dengan Bearer Token
export const authHeader = () => {
  const token = getToken();

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};
