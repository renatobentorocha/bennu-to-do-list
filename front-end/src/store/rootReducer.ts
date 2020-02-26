import {combineReducers} from '@reduxjs/toolkit';

import tasksReducer from './features/taskList/slice';
import authReducer from './features/auth/slice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
