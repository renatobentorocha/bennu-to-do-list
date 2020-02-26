import React from 'react';
import {ActivityIndicator} from 'react-native';

interface Props {
  size?: number | 'small' | 'large' | undefined;
  color?: string;
}

const Loading: React.FC<Props> = ({color = '#0000ff', size = 'large'}) => {
  return <ActivityIndicator size={size} color={color} />;
};

export default Loading;
