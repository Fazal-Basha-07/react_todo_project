export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const REGISTER_USER = 'REGISTER_USER';
export const LOAD_USER = "LOAD_USER"

// Todo Tasks:: 
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const SET_FILTER = 'SET_FILTER';
export const LOAD_TASKS = 'LOAD_TASKS';

// ------------>Register, Login & Logout <-----------------
export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
})

export const login = (userData) => ({
  type: LOGIN,
  payload: userData
})

export const logout = () => ({
  type: LOGOUT,
})
// ------------>Register, Login & Logout <-----------------


// todo tasks actions:: 
export const addTask = (task) => ({
  type: ADD_TASK, payload: task
})
export const editTask = (task) => ({
  type: EDIT_TASK, payload: task
});
export const deleteTask = (id) => ({
  type: DELETE_TASK, payload: id
})

export const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  payload: id
})

export const setFilter = (filter) => ({
  type: SET_FILTER, payload: filter
})
export const loadTasks = (tasks) => ({
  type: LOAD_TASKS,
  payload: tasks
})


// updating profile :: 
export const updateUser = ({ username, email, password }) => {
  return {
    type: UPDATE_USER,
    payload: {
      username,
      email,
      password,
    },
  };
};


export const loadUser = () => {
  const user = JSON.parse(localStorage.getItem('users')) || null;
  console.log("loadUser::", user)
  return {
    type: LOAD_USER,
    payload: user ,
  };
};