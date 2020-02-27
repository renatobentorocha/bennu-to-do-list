/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import Routes from './routes';

import {navigationRef, isMountedRef} from './services/Navigation';

const App: React.FC = () => {
  useEffect(() => {
    function init() {
      isMountedRef.current = true;
    }

    init();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor="#038BCE"
        />
        <Routes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
