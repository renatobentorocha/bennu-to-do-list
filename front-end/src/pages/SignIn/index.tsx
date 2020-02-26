import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {RootState} from '../../store/rootReducer';
import {signIn} from '../../store/features/auth/slice';

import Loading from '../../components/Loading';

import {
  Container,
  LoginWrapper,
  Email,
  Password,
  Button,
  ButtonText,
  Logo,
  HasLogin,
  HasLoginText,
  Error,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    dispatch(signIn(email, password));
  };

  return (
    <Container>
      <LoginWrapper>
        <Logo source={require('../../assets/logo.png')} />
        <Email
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <Password onChangeText={text => setPassword(text)} />
        <Button onPress={() => handleSubmit()}>
          {loading ? (
            <Loading size={25} color="#ffff" />
          ) : (
            <ButtonText>Entrar</ButtonText>
          )}
        </Button>
        <HasLogin onPress={() => navigation.navigate('SignUp')}>
          <HasLoginText>Criar conta gratuita</HasLoginText>
          <Error />
        </HasLogin>
      </LoginWrapper>
    </Container>
  );
};

export default SignIn;
