import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

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

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Informar o e-mail'),
  password: Yup.string().required('Informar a senha secreta'),
});

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await schema.validate({email, password});

      dispatch(signIn(email, password));
    } catch (error) {
      Alert.alert(error.message);
    }
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
