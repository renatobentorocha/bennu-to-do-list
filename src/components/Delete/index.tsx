import React from 'react';
import {TouchableOpacity, Image, Alert, StyleSheet} from 'react-native';

interface Props {
  taskId: string;
}

const Delete: React.FC<Props> = ({taskId}) => {
  function handleDelete() {
    Alert.alert(
      'Exclusão de tarefa',
      'Deseja excluir a tarefa?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={() => handleDelete()}>
      <Image style={styles.image} source={require('../../assets/delete.png')} />
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
