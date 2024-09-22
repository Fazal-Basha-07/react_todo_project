import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, loadUser, logout } from '../../redux/action';
import './style.css';
import profile2 from '../Images/Profile2.png'
import { Link, useNavigate } from 'react-router-dom';
import RCB1 from '../Images/RCB2.jpg'

const Profile = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({ username: '', email: '', password: '' })

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileClick = () => {
    setNewUsername("")
    setNewEmail("")
    setNewPassword("")
    setIsEditing(true);
  }

  const validateFields = () => {
    let valid = true;
    let newErrors = { username: '', email: '', password: '' };

    if (!/^[\w]+$/.test(newUsername)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores.';
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      newErrors.email = 'Email is invalid.';
      valid = false;
    }

    if (newPassword && newPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateFields()) {
      dispatch(updateUser({
        username: newUsername,
        password: newPassword,
        email: newEmail
      }));
      setIsEditing(false);
    }
  }

  const handleOptionSelect = (route) => {
    if (route === '/logout') {
      handleLogout()
    } else {
      navigate(route);
      setDropdownOpen(false)
    }
  };
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('users')
    localStorage.removeItem('tasks')
    navigate('/');
  };
  return (
    <div className="profile-container">
      <header className="dashboard-header">
        <img src={RCB1} alt="User" className="user-image-rcb" />
        <h2 onClick={() => handleOptionSelect('/dashboard')} className='dashboarH2'>Dashboard</h2>
        <h2>Welcome, {user ? user.username : "ADMIN"}!</h2>
        <div className="header-right">
          <div className="profile-icon" onClick={handleDropdownToggle}>
            👤
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleOptionSelect('/profile')}>Update Profile</button>
                <button onClick={() => handleOptionSelect('/logout')}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* -------- main Content profile -------- */}
      <main className="dashboard-content">
        <div className="container">
          <><div className="user-info">
            <img
              src={profile2}
              alt="User"
              className="user-image" />
            <h2>Welcome, {user ? user.username : "ADMIN"}!</h2>
          </div>
            <hr className="separator" />

            <div className="profile-details">
              <h2>Profile</h2>

              <div className='profile-section'>
                <h3>Username : {user ? user.username : newUsername}</h3>
                <h3>Email id : {user ? user.email : newEmail}</h3>
                <h3>Password : ********</h3>
                <div className='btns-profile'>
                  <button className='update-button' onClick={handleProfileClick}>Update</button>
                </div>
              </div>

              {isEditing && (
                <form onSubmit={handleSubmit} className="update-form">
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="New Username"
                    required
                  />
                  {errors.username && <span className="error-message">{errors.username}</span>}
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="New Email"
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                  <button type="submit" disabled={!newEmail && !newPassword && !newUsername ? true : false} >Submit</button>
                  <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
              )}
            </div>
          </>

        </div>
      </main>
    </div>
  );
};

export default Profile;
