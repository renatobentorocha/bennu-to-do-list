import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './components/DrawerContent';
import Todos from './pages/Todos';
import Todo from './pages/Todo';
import Menu from './components/Header/Menu';
import Delete from './components/Delete';

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
      options={({route}) => {
        return {
          title: route.params
            ? 'Edição da tarefa'
            : 'Adicionar uma nova tarefa',
          headerStyle: {backgroundColor: '#039BE5'},
          headerTintColor: '#fff',
          headerRight: () => route.params && <Delete />,
        };
      }}
    />
  </Stack.Navigator>
);

const Routes = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Todos" component={StackRoutes} />
  </Drawer.Navigator>
);

export default Routes;
