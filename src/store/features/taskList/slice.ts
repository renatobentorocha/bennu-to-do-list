import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import api from '../../../services/api';

import {AppThunk} from '../../index';

export interface ITask {
  completed?: boolean;
  _id?: string;
  title: string;
  description: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface TaskListState {
  data: ITask[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskListState = {
  data: [],
  loading: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loadingStart: (state: TaskListState) => {
      state.loading = true;
    },
    fail: (state: TaskListState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    tasksLoadSuccess: (
      state: TaskListState,
      action: PayloadAction<ITask[]>,
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    addTaskSuccess: (state: TaskListState, action: PayloadAction<ITask>) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    editTaskSuccess: (state: TaskListState, action: PayloadAction<ITask>) => {
      const index = state.data.findIndex(
        task => task._id === action.payload._id,
      );
      state.data[index] = action.payload;
      state.loading = false;
    },
  },
});

export const {
  loadingStart,
  tasksLoadSuccess,
  addTaskSuccess,
  editTaskSuccess,
  fail,
} = counterSlice.actions;

export default counterSlice.reducer;

export const fetchTasks = (): AppThunk => async dispatch => {
  try {
    dispatch(loadingStart());

    const {data} = await api.get<ITask[]>('/tasks');

    dispatch(tasksLoadSuccess(data));
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const addTask = (task: ITask): AppThunk => async dispatch => {
  try {
    dispatch(loadingStart());

    const {data} = await api.post<ITask>('/tasks', task);

    dispatch(addTaskSuccess(data));
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const editTask = (task: ITask): AppThunk => async dispatch => {
  try {
    dispatch(loadingStart());

    const {data} = await api.put<ITask>(`/tasks/${task._id}`, task);

    dispatch(editTaskSuccess(data));
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};
