/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import './Login.css';
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <div className='wrapper'>
        <form action="">
            <h1>Login</h1>
            <div className='input-box'>
                <input type="text" name="username" id="username" placeholder="Username" required/>
                <FaUser className='icon'/>
            </div>
            <div className='input-box'>
                <input type="password" name="password" id="password" placeholder="Password" required/>
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