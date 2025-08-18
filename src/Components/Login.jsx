// src/Components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, database } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import '../Style/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // ✅ Authenticate user
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ✅ Fetch user data from Realtime Database
            const userRef = ref(database, `users/${user.uid}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                console.log('User data:', snapshot.val());
                navigate(`/dashboard/${user.uid}`); // ✅ Redirect if data found
            } else {
                setError('No user data found in database.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="hero login-hero-bg">
            <div className="login-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2 className="hero-title">Login</h2>
                    {error && <p className="error-text">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn-primary">Login</button>

                    <p className="signup-redirect">
                        New user? <Link to="/signin">Sign up here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
