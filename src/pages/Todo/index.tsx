import React, {useState, useEffect, useMemo} from 'react';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';

import {useRoute, useNavigation} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import * as Yup from 'yup';

import format from 'date-fns/format';
import pt from 'date-fns/locale/pt-BR';

import api from '../../services/api';
import {addTask, editTask, ITask} from '../../store/features/taskList/slice';

import DatePicker, {Mode} from '../../components/DatePicker';
import Confirm from '../../components/Button';

import TimeZone from '../../util/timeZone';

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
  Indicator,
} from './styles';

type RootStackParamList = {
  Todo: {
    id?: string;
  };
  Todos: {};
};

type TodoRouteProp = RouteProp<RootStackParamList, 'Todo'>;
type TodoNavigationProp = StackNavigationProp<RootStackParamList, 'Todos'>;

const schema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Informar o título'),
  description: Yup.string().required('Informar a descrição'),
  date: Yup.date().required(),
});

const Todo: React.FC = () => {
  const route = useRoute<TodoRouteProp>();
  const navigation = useNavigation<TodoNavigationProp>();

  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<Mode>('date');
  const [loading, setLoading] = useState(false);

  function editing() {
    return !!route.params;
  }

  useEffect(() => {
    async function loadTask() {
      if (editing()) {
        setLoading(true);
        const {id} = route.params;

        const {data} = await api.get<ITask>(`/tasks/${id}`);

        setTitle(data.title);
        setDescription(data.description);
        setSelectedDate(new Date(data.date));
        setSelectedTime(new Date(data.date));
        setLoading(false);
      }
    }

    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleAddTask() {
    try {
      const date = format(selectedDate, 'yyyy-MM-dd');
      const time = format(selectedTime, 'HH:mm:ss');

      const task: ITask = {
        title,
        description,
        date: new Date(`${date}T${time}${TimeZone.getTimeZone()}`),
      };

      await schema.validate(task);

      if (editing()) {
        const {id} = route.params;

        dispatch(editTask({_id: id, ...task}));
      } else {
        dispatch(addTask(task));
      }

      navigation.navigate('Todos');
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  const handleSelectedDate = (value: Date) => {
    setShow(!show);
    setSelectedDate(value);
  };

  const handleSelectedTime = (value: Date) => {
    setShow(!show);
    setSelectedTime(value);
  };

  const handleDateFormat = useMemo(() => {
    return format(selectedDate, 'EEE, LLL, dd yyyy', {locale: pt});
  }, [selectedDate]);

  const handleTimeFormat = useMemo(() => {
    return format(selectedTime, 'H:mm aaa', {locale: pt});
  }, [selectedTime]);

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
      <Title value={title} onChangeText={text => setTitle(text)} />
      <Label>Descrição</Label>
      <Description
        value={description}
        onChangeText={text => setDescription(text)}
      />
      <Label>Data e hora conclusão</Label>
      <Appointment>
        <DateWrapper>
          <DateInput value={handleDateFormat} onChange={() => {}} />
          <Button onPress={handleDateClick}>
            <Triangle />
          </Button>
        </DateWrapper>
        <HourWrapper>
          <Hour value={handleTimeFormat} onChange={() => {}} />
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
        onPress={() => handleAddTask()}
        iconName="add"
        iconSize={35}
        iconColor="#fff"
      />
      {loading && <Indicator />}
    </Container>
  );
};

export default Todo;
