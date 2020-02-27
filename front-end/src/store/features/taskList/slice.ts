import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as Navigation from '../../../services/Navigation';

import api from '../../../services/api';
import {AppThunk} from '../../index';

export interface ITask {
  completed?: boolean;
  _id?: string;
  title: string;
  description: string;
  date: Date | string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

export interface TaskListState {
  data: ITask[];
  loading: boolean;
  editing: boolean;
  deleting: boolean;
  error: string | null;
}

export const initialState: TaskListState = {
  data: [],
  loading: false,
  editing: false,
  deleting: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loadingStart: (state: TaskListState) => {
      state.loading = true;
    },
    editingStart: (state: TaskListState) => {
      state.editing = true;
    },
    deletingStart: (state: TaskListState) => {
      state.deleting = true;
    },
    fail: (state: TaskListState, action: PayloadAction<string>) => {
      state.loading = false;
      state.editing = false;
      state.deleting = false;
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
      state.editing = false;
      state.data.push(action.payload);
    },
    editTaskSuccess: (state: TaskListState, action: PayloadAction<ITask>) => {
      const index = state.data.findIndex(
        task => task._id === action.payload._id,
      );
      state.data[index] = action.payload;
      state.editing = false;
    },
    deleteTaskSuccess: (
      state: TaskListState,
      action: PayloadAction<string>,
    ) => {
      state.data = state.data.filter(task => task._id !== action.payload);
      state.deleting = false;
    },
  },
});

export const {
  loadingStart,
  editingStart,
  deletingStart,
  tasksLoadSuccess,
  addTaskSuccess,
  editTaskSuccess,
  deleteTaskSuccess,
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
    dispatch(editingStart());

    const {data} = await api.post<ITask>('/tasks', task);

    dispatch(addTaskSuccess(data));

    Navigation.navigate('Todos');
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const editTask = (task: ITask): AppThunk => async dispatch => {
  try {
    dispatch(editingStart());

    const {data} = await api.put<ITask>(`/tasks/${task._id}`, task);

    dispatch(editTaskSuccess(data));

    Navigation.navigate('Todos');
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const deleteTask = (taskId: string): AppThunk => async dispatch => {
  try {
    dispatch(deletingStart());

    await api.delete(`/tasks/${taskId}`);

    dispatch(deleteTaskSuccess(taskId));

    Navigation.navigate('Todos');
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};
