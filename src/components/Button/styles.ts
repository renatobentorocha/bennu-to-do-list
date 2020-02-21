import styled from 'styled-components/native';

export const ButtonWrapper = styled.View.attrs({
  // Sombra IOS
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset: {
    height: 4,
    width: 4,
  },
  // Sombra ANDROID
  elevation: 5,
})`
  position: absolute;
  bottom: 10px;
  right: 0;
  background-color: #ff6666;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  z-index: 1000;
`;

export const AddButton = styled.TouchableOpacity.attrs({})`
  background-color: #ff6666;
  color: #fff;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;
