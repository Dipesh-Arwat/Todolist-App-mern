import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './auth.css'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) newErrors.password = 'Password is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault(); 
        if (!validate()) return; 

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('username', response.data.username); 
            navigate('/todo'); 
        } catch (error) {
            console.error('Error logging in', error);
        }
    };


    return (
        <div className='auth-page'>

            <div className='box-page'>
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                <div className="loginSignup-fields">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button className='signbtn' type="submit">Login</button>
                <p className='loginSignup-login'>
                    Don't have an account? <a href='/signup'>Sign up here</a>
                </p>
            </form>
            </div>
        </div >
    );
};

export default Login;
