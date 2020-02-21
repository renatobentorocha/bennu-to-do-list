import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './components/DrawerContent';
import Todos from './pages/Todos';
import Item from './pages/Todos/Item';

import Menu from './components/Header/Menu';
import {View, Text} from 'react-native';

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
    <Stack.Screen name="Item" component={Item} />
  </Stack.Navigator>
);

const Routes = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent />}>
    <Drawer.Screen name="Todos" component={StackRoutes} />
  </Drawer.Navigator>
);

export default Routes;
