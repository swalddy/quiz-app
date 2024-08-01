/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";
import Quiz from '../Quiz/Quiz';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation logic
        if (username === 'admin' && password === 'admin') {
            setIsLoggedIn(true);
        // Redirect to another page or perform further actions
        } else {
        setError('Invalid username or password');
        }
    };

    if (isLoggedIn) {
        return <Quiz />; // Render Quiz component if logged in
    }

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='input-box'>
                    <input type="text" name="username" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            required/>
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input type="password" name="password" id="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}
                required/>
                    <FaLock className='icon'/>
                </div>
                <button type='submit'>Login</button>

                <div className='register-link'>
                    <p><a href="#">Register</a></p>
                </div>
            </form>

        </div>
    )
}

export default Login