// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import profile2 from '../Images/Profile2.png';
import './style.css';
import { logout, loadUser, login, loadTasks } from '../../redux/action';
import RCB1 from '../Images/RCB2.jpg'
const Dashboard = () => {
  const user = useSelector(state => state.user.user);
  const tasks = useSelector(state => state.tasks.tasks);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const navigate = useNavigate();

  // console.log("USER::", user)
  // console.log("tasks::", tasks)

  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || []
    dispatch(loadTasks(savedTasks))
  }, [dispatch])

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  };

  const handleOptionSelect = (route) => {
    if (route === '/logout') {
      handleLogout();
    } else {

      navigate(route);
      setDropdownOpen(false)

    }
  };


  // Logout Functionality:::
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('users');
    localStorage.removeItem('tasks')
    navigate('/')
  };

  const toggleTodoList = () => {
    setShowTodoList(!showTodoList)
    navigate('/todo')
  };


  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <img src={RCB1} alt="User" className="user-image-rcb" />
        <h2 onClick={() => handleOptionSelect('/dashboard')} className='dashboarH2'>Dashboard</h2>
        <h2>Welcome, {user ? user.username : "ADMIN"}!</h2>

        <h2 onClick={() => handleOptionSelect('/todo')} className='dashboarH2'>Tasks</h2>
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

      <main className="dashboard-content">
        <div className="container">
          <div className="user-info">
            <img src={profile2} alt="User" className="user-image" />

            {/* ---------------Todo contenst-------------- */}
            <h2 className='profileBelowName'>Welcome, {user ? user.username : "ADMIN"}!</h2>
          </div>
          <hr className="separator" />
          <div className="todo-list">

            <h3>Todo List Overview</h3>
            <p>Completed Tasks: {tasks.filter(task => task.completed).length}</p>
            <p>
              Pending Tasks: {tasks.filter(task => !task.completed).length}

            </p>
            <button onClick={toggleTodoList}>

              {showTodoList ? 'Hide Todo List' : 'View All Todo List'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
