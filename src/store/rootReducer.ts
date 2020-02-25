import {combineReducers} from '@reduxjs/toolkit';

import tasksReducer from './features/taskList/slice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
