import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/main/HomeScreen';
import { CartScreen } from '../screens/cart/CartScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { useAuthStore } from '../store/useAuthStore';

const Tab = createBottomTabNavigator();

const icon = (emoji: string) => () => <Text style={{ fontSize: 20 }}>{emoji}</Text>;

export const CustomerTab = () => {
  const { isGuest } = useAuthStore();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6B46C1',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: icon('🏠') }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{
        tabBarIcon: icon('🛒'),
        tabBarLabel: isGuest ? 'Cart (Guest)' : 'Cart',
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: icon('👤') }} />
    </Tab.Navigator>
  );
};