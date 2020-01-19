import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

// Ignorando avisos que começem com uma String específica.
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7D40E7' />
      <Routes />
    </>
  );
}