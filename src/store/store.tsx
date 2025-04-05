import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

// Định nghĩa kiểu RootState
export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
});

// Tạo Redux store
const store = createStore(rootReducer);

export default store;
