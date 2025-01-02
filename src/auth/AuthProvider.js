import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, isLoggedIn, refreshToken } from '../api/authApi';

// Buat Context untuk Autentikasi
export const AuthContext = createContext();

// Custom Hook untuk menggunakan AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Komponen AuthProvider yang akan membungkus seluruh aplikasi
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);      // Menyimpan data user (misal: nama, email)
    const [loading, setLoading] = useState(true); // Mengontrol loading state saat proses autentikasi
    const [error, setError] = useState(null);    // Menyimpan pesan error autentikasi

    // Fungsi login, memanggil login API dan menyimpan user data
    const login = async (email, password) => {
        try {

            const response = await loginApi(email, password);
            console.log('login user');
            setUser(response.user); // Asumsikan bahwa respons berisi informasi pengguna
            setError(null);
        } catch (err) {
            setError(err.message);
            setUser(null);
        }
    };

    // Fungsi logout, memanggil logout API dan menghapus user dari state
    const logout = () => {
        logoutApi();
        setUser(null);
    };

    // Fungsi untuk me-refresh token secara otomatis
    const handleRefreshToken = async () => {
        try {
            const response = await refreshToken();
            console.log(`Refreshed token: ${response.token}`);
            if (response.token) {
                // Jika refresh berhasil, pertahankan status login
                setUser(response.user); // Biarkan user tetap ada jika refresh token berhasil
            } else {
                logout(); // Jika gagal, lakukan logout
            }
        } catch (err) {
            console.log('Error refreshing token:', err);
            console.error('Error refreshing token:', err);
            logout(); // Jika refresh gagal, log out pengguna
        }
    };

    // Saat pertama kali komponen di-mount, periksa status login
    useEffect(() => {
        console.log('Checking login status...');
        const checkUserLoggedIn = async () => {
            if (isLoggedIn()) {
                try {
                    // Misalnya, kita melakukan refresh token saat komponen pertama kali di-mount
                    await handleRefreshToken();
                } catch (error) {
                    alert('Auto refresh token failed:', error);
                    console.error('Auto refresh token failed:', error);
                    logout();
                }
            }
            setLoading(false); // Selesai pengecekan, matikan loading
        };

        checkUserLoggedIn();
    }, []);

    // Objek yang disediakan oleh AuthContext ke komponen lain
    const value = {
        user,
        login,
        logout,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading ? children : <div>Loading...</div>}
        </AuthContext.Provider>
    );
};
