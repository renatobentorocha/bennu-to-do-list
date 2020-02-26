import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import {Switch, Platform} from 'react-native';

import {ITask} from '../../store/features/taskList/slice';

interface Props {
  value: boolean | undefined;
  task: ITask;
  onValueChange: (task: ITask) => void;
  checkedColor?: string;
}
const TCheckBox: React.FC<Props> = ({
  value,
  task,
  onValueChange,
  checkedColor = '#B583CA',
}) => {
  return Platform.OS === 'ios' ? (
    <Switch
      thumbColor="#fff"
      trackColor={{true: checkedColor, false: ''}}
      value={value}
      onValueChange={() => onValueChange(task)}
    />
  ) : (
    <CheckBox
      tintColors={{true: checkedColor}}
      value={value}
      onValueChange={() => onValueChange(task)}
    />
  );
};

export default TCheckBox;
