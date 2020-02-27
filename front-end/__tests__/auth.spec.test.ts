import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import api from '../src/services/api';
import * as Auth from '../src/store/features/auth/slice';
import {AppDispatch} from '../src/store';
import {RootState} from '../src/store/rootReducer';

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares);
const apiMock = new MockAdapter(api);

const email = 'jonas@teste.com';
const password = '123456';

const user: Auth.IUser = {
  id: '123',
  name: 'Jonas',
  email,
  password,
};

const session: Auth.ISession = {
  user,
  token: 'csdcflsdnvm.asdnvnFACA.CSÇLDVLSDÇVJSÇL',
};

describe('Auth', () => {
  it('it should be able to sign in', async () => {
    apiMock.onPost('/session').reply(201, session);

    const expectedActions = [Auth.authStart(), Auth.signInSuccess(session)];

    const store = mockStore();

    await store.dispatch(Auth.signIn(email, password));

    const actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });

  it('it should be able to sign up', async () => {
    apiMock.onPost('/users').reply(201, user);

    const expectedActions = [Auth.authStart()];

    const store = mockStore();

    await store.dispatch(Auth.signUp(user));

    const actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });

  it('it should be able to sign out', async () => {
    const expectedActions = [Auth.signOutSuccess()];

    const store = mockStore();

    await store.dispatch(Auth.signOut());

    const actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });
});

export {};
