import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {TouchableOpacity, FlatList} from 'react-native';

import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

import {ITask} from '../../store/features/taskList/slice';
import {signOut} from '../../store/features/auth/slice';

import {RootState} from '../../store/rootReducer';
import {
  Container,
  Header,
  Avatar,
  InputContainer,
  Triangle,
  Trapezoid,
  Menu,
  Title,
  Item,
  SelectedTask,
  TasksWrapper,
  Task,
} from './styles';

type Props = DrawerContentComponentProps<DrawerContentOptions>;

const DrawerContent: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [showTasks, setShowTasks] = useState(false);

  const data = useSelector((state: RootState) => state.tasks.data);

  function HandleEditTodo(task: ITask) {
    setTitle(task.title);
    navigation.navigate('Todo', {id: task._id});
  }

  return (
    <Container>
      <Header>
        <Avatar />
        <Trapezoid style={styles.leftTrapezoid} />
        <Trapezoid style={styles.centerTrapezoid} />
        <Trapezoid style={styles.rightTrapezoid} />
        <Triangle style={styles.headerTriangle} />
        <InputContainer>
          <SelectedTask>{title}</SelectedTask>
          <TouchableOpacity onPress={() => setShowTasks(!showTasks)}>
            <Triangle style={styles.buttonTriangle} />
          </TouchableOpacity>
        </InputContainer>
      </Header>
      <Menu>
        {showTasks && (
          <TasksWrapper>
            <FlatList
              data={data}
              keyExtractor={item => `${item._id}`}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => HandleEditTodo(item)}>
                  <Task>{item.title}</Task>
                </TouchableOpacity>
              )}
            />
          </TasksWrapper>
        )}
        <Title>To Do</Title>
        <Item>Configurações</Item>
        <TouchableOpacity onPress={() => dispatch(signOut())}>
          <Item>Sair</Item>
        </TouchableOpacity>
      </Menu>
    </Container>
  );
};

const styles = StyleSheet.create({
  leftTrapezoid: {
    borderBottomColor: '#f9b54a',
    zIndex: 1,
    left: -100,
  },
  centerTrapezoid: {
    borderBottomColor: '#83ebb8',
    transform: [{rotate: '180deg'}],
  },
  rightTrapezoid: {
    borderBottomColor: '#51bab5',
    zIndex: 1,
    right: 0,
    borderRightWidth: 0,
    width: 100,
  },
  headerTriangle: {
    borderBottomColor: '#f14054',
    zIndex: 10,
    transform: [{rotate: '270deg'}],
    right: 0,
    top: 0,
    borderRightWidth: 0,
    borderLeftWidth: 100,
  },
  buttonTriangle: {
    position: 'relative',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#444',
    transform: [{rotate: '180deg'}],
    zIndex: 99,
  },
});

export default DrawerContent;
