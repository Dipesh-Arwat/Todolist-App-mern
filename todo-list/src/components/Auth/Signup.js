import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './auth.css'

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            navigate('/login');
        } catch (error) {
            console.error('Error signing up', error);
        }
    };

    return (
        <div className='auth-page'>

            <div className='box-page'>

                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <div className="loginSignup-fields">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
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
                    <button className='signbtn' type="submit">Sign Up</button>
                    <p className='loginSignup-login'>
                        Already have an account? <a href='/login'>Login here</a>
                    </p>
                </form>

            </div>


        </div>
    );
};

export default Signup;
