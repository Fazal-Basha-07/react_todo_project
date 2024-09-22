import { createStore } from 'redux';
import rootReducer from './reducer';
import { loadUser } from './action';

const store = createStore(rootReducer);
store.dispatch(loadUser());
export default store;
