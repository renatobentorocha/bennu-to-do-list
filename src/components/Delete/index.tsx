import React from 'react';
import {TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {deleteTask} from '../../store/features/taskList/slice';
import {RootState} from '../../store/rootReducer';

import Loading from '../Loading';

interface Props {
  taskId: string;
}

const Delete: React.FC<Props> = ({taskId}) => {
  const dispatch = useDispatch();

  const deleting = useSelector((state: RootState) => state.tasks.deleting);

  function handleDelete() {
    Alert.alert(
      'Exclusão de tarefa',
      'Deseja excluir a tarefa?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => dispatch(deleteTask(taskId)),
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
      {deleting ? (
        <Loading size="small" color="#fff" />
      ) : (
        <Image
          style={styles.image}
          source={require('../../assets/delete.png')}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
  image: {
    width: 25,
    height: 25,
  },
});

export default Delete;
