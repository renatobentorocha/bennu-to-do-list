import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background-color: #fff;
`;

export const LoginWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
`;

export const Logo = styled.Image`
  width: 72px;
  height: 72px;
  align-self: center;
  margin-bottom: 25px;
`;

export const Email = styled.TextInput.attrs({
  elevation: 3,
  placeholder: 'Seu e-mail',
  paddingHorizontal: 25,
})`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-family: Helvetica;
  font-size: 15px;
  color: #999999;
  letter-spacing: 0;
  background-color: #fff;
`;

export const Password = styled.TextInput.attrs({
  elevation: 3,
  placeholder: 'Senha secreta',
  paddingHorizontal: 25,
  secureTextEntry: true,
})`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-family: Helvetica;
  font-size: 15px;
  color: #999999;
  letter-spacing: 0;
  background-color: #fff;
`;

export const Button = styled.TouchableOpacity.attrs({})`
  width: 100%;
  height: 55px;
  border-radius: 10px;
  background-color: #ff7043;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: Helvetica-Bold;
  font-weight: bold;
  font-size: 15px;
  color: #ffffff;
  letter-spacing: 0;
`;

export const HasLogin = styled.TouchableOpacity.attrs({})`
  height: 55px;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const HasLoginText = styled.Text`
  font-family: Helvetica-Bold;
  font-weight: bold;
  font-size: 15px;
  color: #ff7043;
  letter-spacing: 0;
  margin-top: 15%;
`;

export const Error = styled.Text`
  font-family: Helvetica-Bold;
  font-weight: bold;
  font-size: 18px;
  color: #ff7043;
  letter-spacing: 0;
  margin-top: 15px;
`;
