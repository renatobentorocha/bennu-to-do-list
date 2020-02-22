import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {ButtonWrapper, AddButton} from './styles';

type Props = {
  iconName: string;
  iconSize: number;
  iconColor: string;
  onPress: () => void;
};

const Button: React.FC<Props> = ({onPress, iconName, iconSize, iconColor}) => {
  return (
    <ButtonWrapper>
      <AddButton onPress={() => onPress()}>
        <Icon name={iconName} size={iconSize} color={iconColor} />
      </AddButton>
    </ButtonWrapper>
  );
};

export default Button;
