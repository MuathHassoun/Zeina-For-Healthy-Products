import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';

export const ProfileScreen = () => {
  const { user, role, isGuest, signOut, promptSignIn } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Profile</Text>
        {user ? (
          <>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.full_name || 'No name provided'}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{role}</Text>
            <TouchableOpacity style={styles.actionButton} onPress={signOut}>
              <Text style={styles.actionText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : isGuest ? (
          <>
            <Text style={styles.label}>Guest Mode</Text>
            <Text style={styles.value}>You can browse products and add items to cart.</Text>
            <TouchableOpacity style={styles.actionButton} onPress={promptSignIn}>
              <Text style={styles.actionText}>Sign In / Register</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Welcome</Text>
            <Text style={styles.value}>Please sign in or register to access your account.</Text>
            <TouchableOpacity style={styles.actionButton} onPress={promptSignIn}>
              <Text style={styles.actionText}>Go to Sign In</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, margin: 18, padding: 22, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 14, elevation: 3 },
  title: { fontSize: 26, fontWeight: '700', color: '#111827', marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#4B5563', marginTop: 14 },
  value: { fontSize: 16, color: '#111827', marginTop: 6 },
  actionButton: { marginTop: 24, backgroundColor: '#6B46C1', borderRadius: 12, alignItems: 'center', paddingVertical: 14 },
  actionText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
