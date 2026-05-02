import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config/env'

// React Native Supabase client configuration.
// - react-native-url-polyfill fixes URL support and prevents protocol assignment issues.
// - AsyncStorage is used for auth session persistence on mobile.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Verify the client initialized correctly
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase credentials not configured. ' +
    'Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY environment variables.'
  )
}