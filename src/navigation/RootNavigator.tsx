import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { AuthStack } from './AuthStack';
import { CustomerTab } from './CustomerTab';
import { AdminStack } from './AdminStack';
import { supabase } from '../services/supabase';

export const RootNavigator = () => {
  const { user, role, isGuest, isLoading } = useAuthStore();

  // Restore session on app launch
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error restoring session:', error);
          return;
        }

        if (session?.user) {
          // Re-hydrate store from existing session
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Error fetching profile:', profileError);
            return;
          }

          useAuthStore.setState({
            user: {
              id: session.user.id,
              email: session.user.email!,
              full_name: profile?.full_name ?? '',
              role: profile?.role ?? 'customer',
            },
            role: profile?.role ?? 'customer',
            isGuest: false,
          });
        }
      } catch (error) {
        console.error('Unexpected error in restoreSession:', error);
      }
    };

    restoreSession();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#6B46C1" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user && !isGuest ? (
        // Not logged in, not guest → show auth
        <AuthStack />
      ) : role === 'admin' ? (
        <AdminStack />
      ) : (
        // 'customer' or guest → same tab navigator, guest restricted at checkout
        <CustomerTab />
      )}
    </NavigationContainer>
  );
};