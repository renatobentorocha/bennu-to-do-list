import React, {useState, useEffect, useMemo} from 'react';
import {Alert, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {useRoute} from '@react-navigation/native';

import * as Yup from 'yup';

import format from 'date-fns/format';
import pt from 'date-fns/locale/pt-BR';

import CheckBox from '../../components/CheckBox';

import {TodoRouteProp} from '../../routes';

import api from '../../services/api';
import {RootState} from '../../store/rootReducer';
import {addTask, editTask, ITask} from '../../store/features/taskList/slice';

import DatePicker, {Mode} from '../../components/DatePicker';
import Confirm from '../../components/Button';

import TimeZone from '../../util/timeZone';

import Images from '../../assets/Images';

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
  CompletedWrapper,
  Button,
  Triangle,
  Indicator,
} from './styles';

const schema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Informar o título'),
  description: Yup.string().required('Informar a descrição'),
  date: Yup.date().required(),
});

const Todo: React.FC = () => {
  const route = useRoute<TodoRouteProp>();

  const dispatch = useDispatch();

  const editingTask = useSelector((state: RootState) => state.tasks.editing);

  const [task, setTask] = useState<ITask>({
    title: '',
    description: '',
    completed: false,
    date: new Date(),
  });

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

        setTask(data);

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

      const newTask: ITask = {
        ...task,
        date: new Date(`${date}T${time}${TimeZone.getTimeZone()}`),
      };

      await schema.validate(newTask);

      if (editing()) {
        const {id} = route.params;

        dispatch(editTask({_id: id, ...newTask}));
      } else {
        dispatch(addTask(newTask));
      }
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

  const handleCompletedTask = (pTask: ITask) => {
    setTask({...task, completed: !pTask.completed});
  };

  return (
    <Container>
      <Label>Titulo</Label>
      <Title
        value={task.title}
        onChangeText={text =>
          setTask({
            ...task,
            title: text,
          })
        }
      />
      <Label>Descrição</Label>
      <Description
        value={task.description}
        onChangeText={text =>
          setTask({
            ...task,
            description: text,
          })
        }
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
      <CompletedWrapper>
        <CheckBox
          value={task.completed}
          onValueChange={handleCompletedTask}
          task={task}
          checkedColor="#ff7043"
        />
        <Text>Completada?</Text>
      </CompletedWrapper>
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
        imageUrl={Images.Todo.check}
        style={styles.image}
        loading={editingTask}
      />
      {loading && <Indicator />}
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 23,
    height: 23,
  },
});

export default Todo;
