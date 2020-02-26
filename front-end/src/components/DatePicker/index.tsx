import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export type Mode = 'date' | 'time' | 'datetime' | 'countdown';
type Display = 'spinner' | 'default' | 'clock' | 'calendar';

interface Props {
  mode: Mode;
  display: Display;
  is24Hour: boolean;
  value: Date;
  setDate: (value: Date) => void;
}

const DatePicker: React.FC<Props> = ({
  mode = 'date',
  is24Hour = true,
  display = 'default',
  value = new Date(),
  setDate,
}) => {
  const onChange = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || value;

    setDate(currentDate);
  };

  return (
    <DateTimePicker
      testID="dateTimePicker"
      timeZoneOffsetInMinutes={0}
      value={value}
      mode={mode}
      is24Hour={is24Hour}
      display={display}
      onChange={onChange}
    />
  );
};

export default React.memo(DatePicker);
