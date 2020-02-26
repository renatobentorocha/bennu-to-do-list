import React from 'react';
import {Image, StyleProp, ImageStyle} from 'react-native';

import Loading from '../Loading';

import {ButtonWrapper, AddButton} from './styles';

type Props = {
  imageUrl: string;
  style?: StyleProp<ImageStyle>;
  onPress: () => void;
  loading?: boolean;
};

const Button: React.FC<Props> = ({onPress, imageUrl, style, loading}) => {
  return (
    <ButtonWrapper>
      <AddButton onPress={() => onPress()}>
        {loading ? (
          <Loading size="small" color="#fff" />
        ) : (
          <Image source={imageUrl} style={style} />
        )}
      </AddButton>
    </ButtonWrapper>
  );
};

export default Button;
