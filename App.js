import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { ExpoRoot } from 'expo-router';

export default function App() {
  return (
    <Provider store={store}>
      <ExpoRoot context={require.context('./src/screens', true, /^\.\/.*\.(js|jsx|ts|tsx)$/)} />
    </Provider>
  );
}