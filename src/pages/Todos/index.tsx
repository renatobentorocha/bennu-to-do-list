import React, {useEffect} from 'react';
import {FlatList, ActivityIndicator, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import format from 'date-fns/format';
import pt from 'date-fns/locale/pt-BR';

import {useNavigation} from '@react-navigation/native';
import CheckBox from '../../components/CheckBox';

import {TodosStackNavigationProp} from '../../routes';

import {RootState} from '../../store/rootReducer';
import {fetchTasks, editTask, ITask} from '../../store/features/taskList/slice';

import Button from '../../components/Button';
import Images from '../../assets/Images';

import {
  Container,
  ItemContainer,
  Task,
  Title,
  Description,
  Appointment,
} from './styles';

const Todos: React.FC = () => {
  const dispatch = useDispatch();

  const {data, loading} = useSelector((state: RootState) => ({
    data: state.tasks.data,
    loading: state.tasks.loading,
  }));

  const navigation = useNavigation<TodosStackNavigationProp>();

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
              <CheckBox
                value={item.completed}
                onValueChange={handleEditTask}
                task={item}
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
        imageUrl={Images.Todos.plus}
        style={styles.image}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
});

export default Todos;
