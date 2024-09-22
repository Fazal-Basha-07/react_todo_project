// components/Todo.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addTask,
    editTask,
    deleteTask,
    toggleTask,
    setFilter,
    loadTasks,
    logout
} from '../../redux/action';
import './style.css';
import RCB1 from '../Images/RCB2.jpg';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    console.log("TASKS1::", tasks)
    const user = useSelector(state => state.user.user);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [taskInput, setTaskInput] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [showAllTasks, setShowAllTasks] = useState(false);
    const [showPendingTasks, setShowPendingTasks] = useState(false);
    const [showCompletedTasks, setShowCompletedTasks] = useState(false);
    const [buttonText, setButtonText] = useState('Add Task');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        dispatch(loadTasks(savedTasks));
    }, [dispatch]);

    useEffect(() => {
        if (tasks?.length > 0) {
            console.log("hello", tasks?.length > 0)
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const handleAddTask = () => {
        if (taskInput.trim() && user) {
            const newTask = {
                id: Date.now(),
                text: taskInput,
                completed: false,
                userId: user.id,
            };
            dispatch(addTask(newTask));
            setTaskInput('');
            setButtonText('Task Added Click view all to see tasks');
            setTimeout(() => {
                setButtonText('Add Task');
            }, 3000);
        }
    };

    const handleEditTask = (task) => {
        setTaskInput(task.text);
        setEditingTask(task);
    };

    const handleUpdateTask = () => {
        if (editingTask) {
            dispatch(editTask({ ...editingTask, text: taskInput }));
            setTaskInput('');
            setEditingTask(null);
        }
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const handleToggleTask = (id) => {
        dispatch(toggleTask(id));
    };

    const handleOptionSelect = (route) => {
        if (route === '/logout') {
            handleLogout();
        } else {
            navigate(route);
            setDropdownOpen(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const toggleAllTasksVisibility = () => {
        setShowAllTasks(prev => !prev);
        setShowPendingTasks(false);
        setShowCompletedTasks(false);
    };

    const togglePendingTasksVisibility = () => {
        setShowPendingTasks(prev => !prev);
        setShowAllTasks(false);
        setShowCompletedTasks(false);
    };

    const toggleCompletedTasksVisibility = () => {
        setShowCompletedTasks(prev => !prev);
        setShowAllTasks(false);
        setShowPendingTasks(false);
    };

    return (
        <>
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
            <main>
                <div className="todo-container">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Enter task"
                    />
                    {editingTask ? (
                        <button onClick={handleUpdateTask}>Update Task</button>
                    ) : (
                        <button onClick={handleAddTask}>{buttonText}</button> // Use buttonText state
                    )}
                    <div className='btns'>
                        <button onClick={toggleAllTasksVisibility}>
                            {showAllTasks ? 'Hide All' : 'View All'}
                        </button>
                        <button onClick={togglePendingTasksVisibility}>
                            {showPendingTasks ? 'Hide Pending' : 'Pending'}
                        </button>
                        <button onClick={toggleCompletedTasksVisibility}>
                            {showCompletedTasks ? 'Hide Completed' : 'Completed'}
                        </button>
                    </div>
                </div>
                {showAllTasks && (
                    <div className='todo-container'>
                        <ul>
                            {tasks.map(task => (
                                <li key={task.id} className='todo-li'>
                                    <h3 onClick={() => handleToggleTask(task.id)}>
                                        {task.text} {task.completed && "✓"}
                                    </h3>
                                    <button onClick={() => handleToggleTask(task.id)} disabled={task.completed}>
                                        {task.completed ? 'Completed' : 'Complete'}
                                    </button>
                                    {!task.completed && (
                                        <button onClick={() => handleEditTask(task)}>Edit</button>
                                    )}
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {showPendingTasks && (
                    <div className='todo-container'>
                        <ul>
                            {tasks.filter(task => !task.completed).map(task => (
                                <li key={task.id} className='todo-li'>
                                    <h3 onClick={() => handleToggleTask(task.id)}>
                                        {task.text} {task.completed && "✓"}
                                    </h3>
                                    <button onClick={() => handleToggleTask(task.id)} disabled={task.completed}>
                                        {task.completed ? 'Completed' : 'Complete'}
                                    </button>
                                    <button onClick={() => handleEditTask(task)}>Edit</button>
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {showCompletedTasks && (
                    <div className='todo-container'>
                        <ul>
                            {tasks.filter(task => task.completed).map(task => (
                                <li key={task.id} className='todo-li'>
                                    <h3 onClick={() => handleToggleTask(task.id)}>
                                        {task.text} {task.completed && "✓"}
                                    </h3>
                                    <button onClick={() => handleToggleTask(task.id)} disabled>
                                        Completed
                                    </button>
                                    <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </>
    );
};

export default Todo;
