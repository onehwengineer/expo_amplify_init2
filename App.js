import React from 'react';
import { AuthProvider } from './src/contexts/authContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
  );
}