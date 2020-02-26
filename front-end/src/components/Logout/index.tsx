import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';

import {signOut} from '../../store/features/auth/slice';

const Logout: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity style={styles.button} onPress={() => dispatch(signOut())}>
      <Image source={require('../../assets/logout.png')} style={styles.image} />
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

export default Logout;
