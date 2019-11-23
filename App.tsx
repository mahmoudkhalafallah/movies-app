import React from 'react';
import { StatusBar } from 'react-native';
import MyApp from './src';

const App = () => {
  return <>
    <StatusBar barStyle="dark-content" backgroundColor={'#fafafc'} />
    <MyApp />
  </>
}

export default App;
