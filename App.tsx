import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import LoginScreen from './src/screens/auth/LoginScreen';
import Signup from './src/screens/auth/RegisterScreen';

import HomeScreen from './src/screens/main/HomeScreen'; 
import Cart from './src/screens/main/CartScreen';
import CheckoutScreen from './src/screens/main/CheckoutScreen';
import FavouritesScreen from './src/screens/main/FavouritesScreen';
import ProductDetailScreen from './src/screens/main/ProductDetailScreen';
import OrderConfirmationScreen from './src/screens/main/OrderConfirmationScreen';
import SideMenuScreen from './src/screens/main/SideMenuScreen';
// import ProductDetailsScreen from './src/screens/main/ProductDetailsScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <SideMenuScreen />
    </SafeAreaProvider>
  );
}
