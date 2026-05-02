import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export const RegisterScreen = ({ navigation }: Props) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const { signUp, isLoading } = useAuthStore();

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirm) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }
    try {
      await signUp(email.trim(), password, fullName.trim());
    } catch (e: any) {
      Alert.alert('Registration Failed', e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.logo}>🌿 Zeina Health</Text>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Start your wellness journey</Text>

        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#9CA3AF"
          value={fullName} onChangeText={setFullName} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#9CA3AF"
          keyboardType="email-address" autoCapitalize="none"
          value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9CA3AF"
          secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#9CA3AF"
          secureTextEntry value={confirm} onChangeText={setConfirm} />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleRegister} disabled={isLoading}>
          <Text style={styles.primaryBtnText}>{isLoading ? 'Creating account…' : 'Register'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? <Text style={styles.link}>Sign In</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FAFAFA' },
  container: { flexGrow: 1, paddingHorizontal: 28, paddingVertical: 48 },
  back: { marginBottom: 20 },
  backText: { color: '#6B46C1', fontSize: 15, fontWeight: '600' },
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
});