import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const Todo = styled.View`
  margin-left: 20px;
`;

export const Title = styled.Text`
  color: #595959;
  font-size: 16px;
`;

export const Description = styled.Text`
  color: #b3b3b3;
  font-size: 12px;
`;

export const Appointment = styled.Text`
  color: #b3b3b3;
  font-size: 12px;
`;

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
