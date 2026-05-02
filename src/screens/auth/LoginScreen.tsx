import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, continueAsGuest, isLoading } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try {
      await signIn(email.trim(), password);
    } catch (e: any) {
      Alert.alert('Login Failed', e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>🌿 Zeina Health</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleLogin} disabled={isLoading}>
          <Text style={styles.primaryBtnText}>{isLoading ? 'Signing in…' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Don't have an account? <Text style={styles.link}>Register</Text></Text>
        </TouchableOpacity>

        <View style={styles.divider}><View style={styles.line} /><Text style={styles.orText}>or</Text><View style={styles.line} /></View>

        <TouchableOpacity style={styles.ghostBtn} onPress={continueAsGuest}>
          <Text style={styles.ghostBtnText}>Continue as Guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 48 },
  logo: { fontSize: 32, textAlign: 'center', marginBottom: 12 },
  title: { fontSize: 26, fontWeight: '700', color: '#111827', textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 32, marginTop: 4 },
  input: {
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#E5E7EB',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: '#111827', marginBottom: 14,
  },
  primaryBtn: {
    backgroundColor: '#6B46C1', borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', marginTop: 4,
  },
  primaryBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkText: { color: '#6B7280', textAlign: 'center', marginTop: 18, fontSize: 14 },
  link: { color: '#6B46C1', fontWeight: '600' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  line: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  orText: { marginHorizontal: 12, color: '#9CA3AF', fontSize: 13 },
  ghostBtn: {
    borderWidth: 1.5, borderColor: '#6B46C1', borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  ghostBtnText: { color: '#6B46C1', fontWeight: '600', fontSize: 15 },
});