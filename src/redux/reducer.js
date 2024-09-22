import { combineReducers } from 'redux';
import {
  LOGIN, LOGOUT,
  REGISTER_USER,
  UPDATE_USER,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  SET_FILTER,
  LOAD_TASKS,
} from "./action";

const initialUserState = {
  user: null,
  email: '',
  isAuthenticated: false,

  loading: false,
  message: '',
};

const userReducer = (state = initialUserState, action) => {
  console.log("userReducer::", action.payload)
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state, user: [action.payload]
      }

    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        tasks: []
      };

    case UPDATE_USER:
      const updatedUser = {
        ...state.user,
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password
      };
      localStorage.setItem('users', JSON.stringify(updatedUser)); 
      return {
        ...state,
        user: updatedUser,
      };

    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    // case 'LOAD_USER':
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };

    default:
      return state;
  }
};

const initialTaskState = {
  tasks: [],
  filter: 'all',
};

const taskReducer = (state = initialTaskState, action) => {
  switch (action.type) {
    case LOAD_TASKS:
      return { ...state, tasks: action.payload };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  tasks: taskReducer,
});

export default rootReducer;
