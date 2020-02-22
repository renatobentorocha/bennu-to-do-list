import React, {useState} from 'react';
import format from 'date-fns/format';
import pt from 'date-fns/locale/pt-BR';

import DatePicker, {Mode} from '../../components/DatePicker';
import Confirm from '../../components/Button';

import {
  Container,
  Label,
  Title,
  Description,
  Appointment,
  DateWrapper,
  DateInput,
  HourWrapper,
  Hour,
  Button,
  Triangle,
} from './styles';

const Todo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<Mode>('date');

  const handleSelectedDate = (value: Date) => {
    setShow(!show);
    setSelectedDate(value);
  };

  const handleSelectedTime = (value: Date) => {
    setShow(!show);
    setSelectedTime(value);
  };

  const handleDateFormat = () => {
    return format(selectedDate, 'EEE, LLL, dd yyyy', {locale: pt});
  };

  const handleTimeFormat = () => {
    return format(selectedTime, 'H:mm aaa', {locale: pt});
  };

  const handleDateClick = () => {
    setMode('date');
    setShow(!show);
  };

  const handleTimeClick = () => {
    setMode('time');
    setShow(!show);
  };

  return (
    <Container>
      <Label>Title</Label>
      <Title />
      <Label>Descrição</Label>
      <Description />
      <Label>Data e hora conclusão</Label>
      <Appointment>
        <DateWrapper>
          <DateInput value={handleDateFormat()} onChange={() => {}} />
          <Button onPress={handleDateClick}>
            <Triangle />
          </Button>
        </DateWrapper>
        <HourWrapper>
          <Hour value={handleTimeFormat()} onChange={() => {}} />
          <Button onPress={handleTimeClick}>
            <Triangle />
          </Button>
        </HourWrapper>
      </Appointment>
      {show && (
        <DatePicker
          value={mode === 'date' ? selectedDate : selectedTime}
          mode={mode}
          display="default"
          is24Hour={true}
          setDate={mode === 'date' ? handleSelectedDate : handleSelectedTime}
        />
      )}
      <Confirm
        onPress={() => {}}
        iconName="add"
        iconSize={35}
        iconColor="#fff"
      />
    </Container>
  );
};

export default Todo;
