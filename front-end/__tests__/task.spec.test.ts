import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import api from '../src/services/api';
import * as Task from '../src/store/features/taskList/slice';
import {AppDispatch} from '../src/store';
import {RootState} from '../src/store/rootReducer';

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares);
const apiMock = new MockAdapter(api);

const task: Task.ITask = {
  _id: '123456',
  date: new Date().toString(),
  title: 'teste',
  description: 'teste',
  completed: false,
};

const tasks: Task.ITask[] = [task];

describe('Task', () => {
  it('it should be able to fetch tasks', async () => {
    apiMock.onGet('/tasks').reply(200, JSON.stringify(tasks));

    const expectedActions = [Task.loadingStart(), Task.tasksLoadSuccess(tasks)];

    const store = mockStore();

    await store.dispatch(Task.fetchTasks());

    const actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });

  it('it should be able to add a task', async () => {
    apiMock.onPost('/tasks').reply(201, task);

    const expectedActions = [Task.editingStart(), Task.addTaskSuccess(task)];

    const store = mockStore();

    await store.dispatch(Task.addTask(task));

    const actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });

  it('it should be able to edit a task', async () => {
    apiMock.onPut(`/tasks/${task._id}`, task).reply(200, task);

    const expectedActions = [Task.editingStart(), Task.editTaskSuccess(task)];

    const store = mockStore();

    await store.dispatch(Task.editTask(task));

    const actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });

  it('it should be able to delete a task', async () => {
    apiMock.onDelete(`/tasks/${task._id}`).reply(204, task);

    const expectedActions = [
      Task.deletingStart(),
      Task.deleteTaskSuccess(`${task._id}`),
    ];

    const store = mockStore();

    await store.dispatch(Task.deleteTask(`${task._id}`));

    const actions = store.getActions();

    expect(actions).toEqual(expectedActions);
  });
});

export {};
