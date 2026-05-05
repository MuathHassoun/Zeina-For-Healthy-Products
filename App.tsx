import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './src/navigation/AuthStack';
import {useAuthStore} from './src/store/useAuthStore';
import HomeScreen from './src/screens/main/HomeScreen';
import AdminDashboardScreen from './src/screens/admin/AdminDashboardScreen';

export default function App() {
  const {user, role} = useAuthStore();

  const renderApp = () => {
    if (!user) return <AuthStack />;
    if (role === 'admin') return <AdminDashboardScreen />;
    return <HomeScreen />;
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {renderApp()}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}