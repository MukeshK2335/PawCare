// src/Components/Signup.jsx
import React, { useState } from 'react';
import { auth, database } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useNavigate, Link } from 'react-router-dom';
import '../Style/Auth.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Save user data in Realtime Database
            await set(ref(database, 'users/' + user.uid), {
                email: user.email,
                createdAt: new Date().toISOString(),
            });

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="hero login-hero-bg">
            <div className="login-container">
                <form className="login-form" onSubmit={handleSignUp}>
                    <h2 className="hero-title">Sign Up</h2>
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

                    <button type="submit" className="btn-primary">Create Account</button>

                    {/* Login Redirect */}
                    <p className="signup-redirect">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
