import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';

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
  Picker,
} from './styles';

type Props = DrawerContentComponentProps<DrawerContentOptions>;

const DrawerContent: React.FC<Props> = ({navigation}) => {
  const [task, setTask] = useState('');

  const data = useSelector((state: RootState) => state.tasks.data);

  function HandleEditTodo(id: string) {
    setTask(id);
    navigation.navigate('Todo', {id});
  }

  return (
    <Container>
      <Header>
        <Avatar />
        <Trapezoid
          style={{
            borderBottomColor: '#f9b54a',
            zIndex: 1,
            left: -100,
          }}
        />
        <Trapezoid
          style={{
            borderBottomColor: '#83ebb8',
            rotation: 180,
          }}
        />
        <Trapezoid
          style={{
            borderBottomColor: '#51bab5',
            zIndex: 1,
            right: 0,
            borderRightWidth: 0,
            width: 100,
          }}
        />
        <Triangle
          style={{
            borderBottomColor: '#f14054',
            zIndex: 10,
            rotation: 270,
            right: 0,
            top: 0,
            borderRightWidth: 0,
            borderLeftWidth: 100,
          }}
        />
        <InputContainer>
          <Picker
            selectedValue={task}
            onValueChange={(itemValue, _) => HandleEditTodo(itemValue)}>
            {data.map(v => (
              <Picker.Item key={v._id} label={v.title} value={v._id} />
            ))}
          </Picker>
          <Triangle
            style={{
              position: 'relative',
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderBottomWidth: 10,
              borderBottomColor: '#444',
              rotation: 180,
              zIndex: 99,
              right: 60,
            }}
          />
          {/* <Input />
           */}
        </InputContainer>
      </Header>
      <Menu>
        <Title>To Do</Title>
        <Item>Configurações</Item>
        <Item>Sair</Item>
      </Menu>
    </Container>
  );
};

export default DrawerContent;
