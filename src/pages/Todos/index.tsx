import React, {useState} from 'react';
import {FlatList, Switch} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  const [value, setValue] = useState(false);

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
      <ButtonWrapper>
        <AddButton>
          <Icon name="add" size={35} color="#fff" />
        </AddButton>
      </ButtonWrapper>
    </Container>
  );
};

export default Todos;
