import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

// Placeholder — replace with real admin screens
const AdminDashboard = () => {
  const { signOut } = useAuthStore();
  return (
    <View style={s.center}>
      <Text style={s.title}>🛠 Admin Dashboard</Text>
      <TouchableOpacity style={s.btn} onPress={signOut}>
        <Text style={s.btnText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAFAFA' },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 24 },
  btn: { backgroundColor: '#EF4444', borderRadius: 10, paddingHorizontal: 28, paddingVertical: 12 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});

const Stack = createNativeStackNavigator();

export const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
  </Stack.Navigator>
);