import React, {useState} from 'react';
import {FlatList, Switch} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';

import {
  Container,
  ItemContainer,
  Todo as Task,
  Title,
  Description,
  Appointment,
  ButtonWrapper,
  AddButton,
} from './styles';

type RootStackParamList = {
  Todo: {};
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Todo'>;

interface Todo {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  created_at: Date;
}

const data: Todo[] = [
  {
    id: '1',
    title: 'Reunião de projeto',
    description: 'Reunião de planejamento de projeto',
    date: new Date(),
    completed: false,
    created_at: new Date(),
  },
  {
    id: '2',
    title: 'Reunião de projeto',
    description: 'Reunião de planejamento de projeto',
    date: new Date(),
    completed: false,
    created_at: new Date(),
  },
  {
    id: '3',
    title: 'Reunião de projeto',
    description: 'Reunião de planejamento de projeto',
    date: new Date(),
    completed: false,
    created_at: new Date(),
  },
  {
    id: '4',
    title: 'Reunião de projeto',
    description: 'Reunião de planejamento de projeto',
    date: new Date(),
    completed: false,
    created_at: new Date(),
  },
  {
    id: '5',
    title: 'Reunião de projeto',
    description: 'Reunião de planejamento de projeto',
    date: new Date(),
    completed: false,
    created_at: new Date(),
  },
  {
    id: '6',
    title: 'Reunião de projeto',
    description: 'Reunião de planejamento de projeto',
    date: new Date(),
    completed: false,
    created_at: new Date(),
  },
  {
    id: '7',
    title: 'Reunião de projeto',
    description: 'Reunião de planejamento de projeto',
    date: new Date(),
    completed: false,
    created_at: new Date(),
  },
  {
    id: '8',
    title: 'Reunião de projeto',
    description: 'Reunião de planejamento de projeto',
    date: new Date(),
    completed: false,
    created_at: new Date(),
  },
];

const Todos: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [value, setValue] = useState(false);

  function HandleAddTodo() {
    navigation.navigate('Todo');
  }

  return (
    <Container>
      <FlatList<Todo>
        data={data}
        keyExtractor={item => item.id}
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
              value={value}
              onValueChange={() => setValue(!value)}
            />
            <Task>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Appointment>{item.date.toString()}</Appointment>
            </Task>
          </ItemContainer>
        )}
      />

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
