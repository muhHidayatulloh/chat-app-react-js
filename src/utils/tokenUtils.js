// tokenUtils.js

// Nama kunci token yang disimpan di localStorage/sessionStorage
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Simpan token JWT ke localStorage/sessionStorage
export const setToken = (accessToken, refreshToken = null) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
};

// Ambil token JWT dari localStorage/sessionStorage
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Hapus token dari localStorage/sessionStorage
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// Periksa apakah token masih valid (misalnya, belum kedaluwarsa)
export const isTokenExpired = (token) => {
  if (!token) return true;

  // Decode payload dari JWT
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) return true;

  try {
    const payload = JSON.parse(atob(tokenParts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Bandingkan waktu kedaluwarsa token dengan waktu sekarang
    return payload.exp < currentTime;
  } catch (error) {
    console.error('Invalid token format:', error);
    return true;
  }
};

// Refresh token jika diperlukan (gunakan API refresh token)
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch('/api/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const data = await response.json();
    if (response.ok) {
      // Simpan access token baru
      setToken(data.access_token, data.refresh_token);
      return data.access_token;
    } else {
      throw new Error(data.message || 'Failed to refresh token');
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};
