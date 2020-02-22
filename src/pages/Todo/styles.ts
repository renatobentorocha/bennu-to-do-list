import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px 15px 0 15px;
`;

export const Label = styled.Text`
  color: #039be5;
  font-size: 12px;
`;

export const Input = styled.TextInput.attrs({
  borderBottomWidth: 1,
  borderBottomColor: '#CCC',
})`
  font-size: 16px;
  margin-bottom: 16px;
  color: #4d4d4d;
`;

export const Title = styled(Input)`
  font-size: 24px;
`;

export const Description = styled(Input).attrs({
  multiline: true,
  numberOfLines: 3,
  textAlignVertical: 'top',
})``;

export const Appointment = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DateWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 61%;
`;

export const DateInput = styled(Input).attrs({
  editable: false,
})`
  width: 100%;
  padding-right: 30px;
`;

export const HourWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 32%;
`;

export const Hour = styled(Input).attrs({
  editable: false,
})`
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  position: absolute;
  right: 0;
  bottom: 43%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Triangle = styled.View.attrs({
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  borderLeftWidth: 10,
  borderRightWidth: 10,
  borderBottomWidth: 10,
  borderBottomColor: '#bbb',
  rotation: 180,
})``;
