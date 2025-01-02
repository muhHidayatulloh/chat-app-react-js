import React, { useState } from 'react';
import useAuth from '../auth/useAuth'; // Mengimpor custom hook useAuth
import { useNavigate } from 'react-router-dom';
import myAlert from '../components/Alert';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth(); // Mengambil fungsi login dan error dari useAuth
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); // Panggil fungsi login
            // Redirect ke halaman dashboard atau halaman lainnya setelah login berhasil
            navigate('/friends');
        } catch (err) {
            console.error('Login failed:', err.message);
        }
    };

    return (
        <div className='uk-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="uk-margin">
                    <div className="uk-inline">
                        <span className="uk-form-icon  uk-form-icon-flip" uk-icon="icon: user"></span>
                        <input
                            className="uk-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="uk-margin">
                    <div className="uk-inline">
                        <span className="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                        <input
                            className="uk-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='uk-margin'>
                    <div className='uk-inline'>
                        {error && myAlert('danger', error)} {/* Menampilkan error jika ada */}
                    </div>
                </div>
                <button className='uk-button uk-button-primary' type='submit'>Log In</button>
            </form>
        </div>
    );
};

export default Login;
