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

export const Task = styled.TouchableOpacity`
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
  text-transform: capitalize;
`;
