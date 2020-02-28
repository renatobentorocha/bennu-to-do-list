import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from '../../index';

import api from '../../../services/api';
import {AppThunk} from '../../index';
import * as Navigation from '../../../services/Navigation';
import {Alert} from 'react-native';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

export interface ISession {
  user?: IUser;
  token?: string;
}

interface AuthState {
  data: ISession;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  data: {},
  loading: false,
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    authStart: (state: AuthState) => {
      state.loading = true;
    },
    fail: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signInSuccess: (state: AuthState, action: PayloadAction<ISession>) => {
      state.loading = false;
      state.data = action.payload;
    },
    signUpSuccess: (state: AuthState) => {
      state.loading = false;
    },
    signOutSuccess: (state: AuthState) => {
      state.data = {};
    },
  },
});

export const {
  authStart,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
  fail,
} = counterSlice.actions;

export default counterSlice.reducer;

const signOutInterceptor = (dispach: AppDispatch) => {
  api.interceptors.response.use(undefined, error => {
    if (error.response.status === 401) {
      return dispach(signOut());
    }
    return Promise.reject(error);
  });
};

export const signIn = (
  email: string,
  password: string,
): AppThunk => async dispatch => {
  try {
    dispatch(authStart());

    const {data} = await api.post<ISession>('/session', {email, password});

    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    signOutInterceptor(dispatch);

    dispatch(signInSuccess(data));
  } catch (err) {
    Alert.alert('Usúario ou senha inválido');
    dispatch(fail(err.toString()));
  }
};

export const signUp = (user: IUser): AppThunk => async dispatch => {
  try {
    dispatch(authStart());

    await api.post<IUser>('/users', user);

    dispatch(signUpSuccess());

    Navigation.navigate('SignIn');
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};

export const signOut = (): AppThunk => async dispatch => {
  try {
    api.defaults.headers.Authorization = '';

    dispatch(signOutSuccess());
  } catch (err) {
    dispatch(fail(err.toString()));
  }
};
