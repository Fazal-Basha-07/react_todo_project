import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../../reduxComponent/action';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        existingUsers.push(formData);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        // dispatch(registerUser(formData));
        dispatch({ type: 'REGISTER_USER', payload: { email: formData.email, username: formData.username, password: formData.password } });
        navigate('/');
    };

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange} required
                />
                <input type="email"
                    name="email" placeholder="Enter Email"
                    value={formData.email} onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password} onChange={handleChange}
                    required
                />
                <div>
                    <button type="submit" className='reg-Btn'>
                        Register
                    </button>

                </div>
            </form>
        </div>
    );
};

export default Register;
