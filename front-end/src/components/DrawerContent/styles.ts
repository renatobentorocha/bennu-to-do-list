import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  overflow: hidden;
`;

export const Header = styled.View`
  height: 33%;
  background-color: #ddd;
  align-items: center;
`;

export const Triangle = styled.View.attrs({
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 140,
  borderRightWidth: 140,
  // borderBottomWidth: 190,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  position: 'absolute',
})`
  border-bottom-width: 100px;
`;

export const Trapezoid = styled.View.attrs({
  width: 200,
  height: 0,
  borderBottomWidth: 190,
  borderBottomColor: 'red',
  borderLeftWidth: 50,
  borderLeftColor: 'transparent',
  borderRightWidth: 60,
  borderRightColor: 'transparent',
  borderStyle: 'solid',
  position: 'absolute',
})``;

export const Avatar = styled.View`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #444;
  z-index: 2;
  align-self: flex-start;
  margin: 15px 0 0 20px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: flex-start;
  z-index: 2;
  width: 100%;
  margin-top: 40px;
  padding: 0 20px;
`;

export const Menu = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Title = styled.Text`
  color: #ff7043;
  padding: 20px;
  border: 1px solid #d5d5d5;
`;

export const Item = styled.Text`
  color: #434343;
  padding: 20px;
  font-weight: bold;
`;

export const SelectedTask = styled.Text`
  color: #434343;
  width: 80%;
  height: 30px;
  background-color: #fff;
`;

export const TasksWrapper = styled.View`
  position: absolute;
  top: -10px;
  height: 70%;
  z-index: 999;
  padding: 20px;
  width: 100%;

  background-color: #fff;
`;

export const Task = styled.Text`
  width: 100%;
  margin: 15px 0;
  padding: 15px 0;
  background-color: #f5f5f5;
`;
