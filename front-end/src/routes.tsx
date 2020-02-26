import React from 'react';
import {useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {RootState} from './store/rootReducer';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DrawerContent from './components/DrawerContent';
import Todos from './pages/Todos';
import Todo from './pages/Todo';
import Menu from './components/Header/Menu';
import Delete from './components/Delete';
import Logout from './components/Logout';

type RootStackParamList = {
  Todo: {
    id?: string;
  };
  Todos: {};
};

export type TodosStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Todo'
>;

export type TodoRouteProp = RouteProp<RootStackParamList, 'Todo'>;
export type TodoStackNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Todos'
>;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const StackRoutes = () => (
  <Stack.Navigator initialRouteName="Todos">
    <Stack.Screen
      name="Todos"
      component={Todos}
      options={() => ({
        title: 'Lista de tarefas',
        headerStyle: {backgroundColor: '#039BE5'},
        headerTintColor: '#fff',
        headerLeft: () => <Menu />,
        headerRight: () => <Logout />,
      })}
    />
    <Stack.Screen
      name="Todo"
      component={Todo}
      options={({route}) => {
        return {
          title: route.params
            ? 'Edição da tarefa'
            : 'Adicionar uma nova tarefa',
          headerStyle: {backgroundColor: '#039BE5'},
          headerTintColor: '#fff',
          headerRight: () =>
            route.params && <Delete taskId={route.params.id} />,
        };
      }}
    />
  </Stack.Navigator>
);

const Routes = () => {
  const authenticated = useSelector(
    (state: RootState) => state.auth.data.token,
  );

  return !authenticated ? (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  ) : (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Todos" component={StackRoutes} />
    </Drawer.Navigator>
  );
};

export default Routes;
