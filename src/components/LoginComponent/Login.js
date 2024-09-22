
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.css'
import { login } from '../../redux/action';
const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userCredentials = {
    email: 'fazal@gmail.com',
    username: 'Fazal Basha',
    password: 'FB06'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long...')
      return;
    }

    if (email === userCredentials.email && password === userCredentials.password) {
      let username = userCredentials.username
      let users = localStorage.setItem('users', JSON.stringify({ email, password, username }))
      dispatch({ type: 'LOGIN', payload: { email, password, username } })
      // dispatch(login(users));


      navigate('/dashboard')
    } else {

      alert('Invalid credentials')
    }
  }


  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <label>Email</label> */}
          <input
            type="email"
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div>
          <button type="submit" disabled={!email || !password} className='reg-Btn animated-button' >Log In</button>
        </div>
      </form>
    </div>
  );
};

export default Login;