import React, {useState, useEffect} from 'react';
import {FlatList, Switch, ActivityIndicator} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import format from 'date-fns/format';
import pt from 'date-fns/locale/pt-BR';

import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import {StackNavigationProp} from '@react-navigation/stack';

import {RootState} from '../../store/rootReducer';
import {fetchTasks, editTask, ITask} from '../../store/features/taskList/slice';

import Button from '../../components/Button';

import {
  Container,
  ItemContainer,
  Task,
  Title,
  Description,
  Appointment,
} from './styles';

type RootStackParamList = {
  Todo: {
    id?: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Todo'>;

const Todos: React.FC = () => {
  const dispatch = useDispatch();

  const {data, loading} = useSelector((state: RootState) => ({
    data: state.tasks.data,
    loading: state.tasks.loading,
  }));

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    dispatch(fetchTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function HandleEditTodo(id: string) {
    navigation.navigate('Todo', {id});
  }

  function HandleAddTodo() {
    navigation.navigate('Todo');
  }

  const handleDateFormat = (date: Date) => {
    return format(new Date(date), 'EEEE, LLL, dd yyyy', {locale: pt});
  };

  const handleEditTask = (task: ITask) => {
    dispatch(editTask({...task, completed: !task.completed}));
  };

  return (
    <Container>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList<ITask>
          data={data}
          keyExtractor={item => `${item._id}`}
          renderItem={({item}) => (
            <ItemContainer>
              {/* <Switch
              thumbColor="#fff"
              trackColor={{true: '#B583CA', false: ''}}
              value={value}
              onValueChange={() => setValue(!value)}
            /> */}
              <CheckBox
                tintColors={{true: '#B583CA'}}
                value={item.completed}
                onValueChange={() => handleEditTask(item)}
              />
              <Task onPress={() => HandleEditTodo(`${item._id}`)}>
                <Title>{item.title}</Title>
                <Description>{item.description}</Description>
                <Appointment>{handleDateFormat(item.date)}</Appointment>
              </Task>
            </ItemContainer>
          )}
        />
      )}

      <Button
        onPress={() => HandleAddTodo()}
        iconName="add"
        iconSize={35}
        iconColor="#fff"
      />
    </Container>
  );
};

export default Todos;
