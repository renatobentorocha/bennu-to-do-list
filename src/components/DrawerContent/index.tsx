import React from 'react';

import {
  Container,
  Header,
  Avatar,
  InputContainer,
  Input,
  Triangle,
  Trapezoid,
  Menu,
  Title,
  Item,
} from './styles';
import {View} from 'react-native';

const DrawerContent: React.FC = () => {
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
            // borderBottomWidth: 100,
          }}
        />
        <InputContainer>
          <Input />
          <Triangle
            style={{
              position: 'relative',
              borderLeftWidth: 10,
              borderRightWidth: 10,
              borderBottomWidth: 10,
              borderBottomColor: '#fff',
              rotation: 180,
            }}
          />
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
