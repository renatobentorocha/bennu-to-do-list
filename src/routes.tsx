import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './components/DrawerContent';
import Todos from './pages/Todos';
import Todo from './pages/Todo';

import Menu from './components/Header/Menu';

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
      })}
    />
    <Stack.Screen
      name="Todo"
      component={Todo}
      options={() => ({
        title: 'Adicionar uma nova tarefa',
        headerStyle: {backgroundColor: '#039BE5'},
        headerTintColor: '#fff',
      })}
    />
  </Stack.Navigator>
);

const Routes = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent />}>
    <Drawer.Screen name="Todos" component={StackRoutes} />
  </Drawer.Navigator>
);

export default Routes;
