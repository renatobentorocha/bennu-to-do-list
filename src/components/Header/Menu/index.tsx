import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useIsDrawerOpen, DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type RootDrawerParamList = {};

type MenuNavigationProp = DrawerNavigationProp<RootDrawerParamList>;

const Menu: React.FC = () => {
  const navigation = useNavigation<MenuNavigationProp>();
  const isDrawerOpen = useIsDrawerOpen();

  function handleOnPress() {
    if (isDrawerOpen) {
      navigation.closeDrawer();
    } else {
      navigation.openDrawer();
    }
  }

  return (
    <TouchableOpacity onPress={handleOnPress} style={{marginLeft: 20}}>
      <Icon name="menu" size={30} color="#fff" />
    </TouchableOpacity>
  );
};
export default Menu;
