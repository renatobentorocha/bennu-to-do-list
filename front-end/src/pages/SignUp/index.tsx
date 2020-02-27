import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import {RootState} from '../../store/rootReducer';
import {signUp} from '../../store/features/auth/slice';

import Loading from '../../components/Loading';

import {IUser} from '../../store/features/auth/slice';

import {
  Container,
  LoginWrapper,
  Name,
  Email,
  Password,
  Button,
  ButtonText,
  Logo,
  HasLogin,
  HasLoginText,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Informar o nome'),
  email: Yup.string()
    .email()
    .required('Informar o e-mail'),
  password: Yup.string().required('Informar a senha secreta'),
});

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const [user, setUser] = useState<IUser>({name: '', email: ''});

  const handleSubmit = async () => {
    try {
      await schema.validate(user);

      dispatch(signUp(user));
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Container>
      <LoginWrapper>
        <Logo source={require('../../assets/logo.png')} />
        <Name onChangeText={text => setUser({...user, name: text})} />
        <Email onChangeText={text => setUser({...user, email: text})} />
        <Password onChangeText={text => setUser({...user, password: text})} />
        <Button onPress={() => handleSubmit()}>
          {loading ? (
            <Loading size={25} color="#ffff" />
          ) : (
            <ButtonText>Criar conta</ButtonText>
          )}
        </Button>
        <HasLogin onPress={() => navigation.navigate('SignIn')}>
          <HasLoginText>Já tenho login</HasLoginText>
        </HasLogin>
      </LoginWrapper>
    </Container>
  );
};

export default SignUp;
