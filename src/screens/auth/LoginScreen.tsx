



import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../store/useAuthStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const {signIn, isLoading} = useAuthStore();
  const navigation = useNavigation();

  
// const handleLogin = async () => {
//     setError('');
//     if (!email.trim() || !password.trim()) {
//       setError('يرجى تعبئة جميع الحقول');
//       return;
//     }
//     try {
//       await signIn(email.trim(), password);
//     } catch (err: any) {
//       setError(err.message || 'فشل تسجيل الدخول');
//     }
//   };

const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('يرجى تعبئة جميع الحقول');
      return;
    }
    try {
      await signIn(email.trim(), password);
      const state = useAuthStore.getState();
      Alert.alert('نتيجة', 
        'الدور: ' + state.role + 
        '\nالايميل: ' + state.user?.email +
        '\nالاسم: ' + state.user?.full_name +
        '\nID: ' + state.user?.id
      );
    } catch (err: any) {
      setError(err.message || 'فشل تسجيل الدخول');
    }
  };






  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* Decorative plant — top-right corner, faded */}
          <View style={styles.decorTopRight} pointerEvents="none" />

          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.welcomeTitle}>مرحباً بك ...</Text>
            <Text style={styles.subtitle}>
              {'حيث تبدأ تجربة صحية مُصمّمة بدقة  لما تستحقه'}
            </Text>
          </View>

          {/* ── Form ── */}
          <View style={styles.form}>

            {/* Error message */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Email input */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="البريد الالكتروني"
                placeholderTextColor="rgba(0,0,0,0.49)"
                keyboardType="email-address"
                autoCapitalize="none"
                textAlign="right"
                textContentType="emailAddress"
              />
            </View>

            {/* Password input */}
            <View style={[styles.inputWrapper, styles.inputRow]}>
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(prev => !prev)}
                hitSlop={8}>
                <View style={styles.eyeIconPlaceholder} />
              </Pressable>

              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={password}
                onChangeText={setPassword}
                placeholder="كلمة المرور"
                placeholderTextColor="rgba(0,0,0,0.56)"
                secureTextEntry={!showPassword}
                textAlign="right"
                textContentType="password"
              />
            </View>

            {/* Forgot password */}
            <Text style={styles.forgotPassword}>نسيت كلمة المرور ؟</Text>

            {/* Login button */}
            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              style={({pressed}) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
                isLoading && styles.loginButtonDisabled,
              ]}>
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
              )}
            </Pressable>

            {/* "أو" separator */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>أو</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Create account button */}
            <Pressable
              onPress={() => navigation.navigate('Register' as never)}
              style={({pressed}) => [
                styles.registerButton,
                pressed && styles.registerButtonPressed,
              ]}>
              <Text style={styles.registerButtonText}>انشاء حساب جديد</Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BRAND_BROWN = '#4A3321';
const BUTTON_BROWN = '#503520';
const REGISTER_TEXT = '#553B22';
const INPUT_BG = '#FFFCF9';
const SCREEN_BG = '#F5EFE6';
const INPUT_BORDER = 'rgba(0,0,0,0.20)';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: SCREEN_BG,
    paddingBottom: 40,
  },
  decorTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 123,
    height: 110,
    opacity: 0.2,
  },
  header: {
    marginTop: 110,
    paddingHorizontal: 36,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontFamily: 'Fustat-ExtraBold',
    fontSize: 40,
    fontWeight: '800',
    color: BRAND_BROWN,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  subtitle: {
    fontFamily: 'Gantari-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: BRAND_BROWN,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
    writingDirection: 'rtl',
  },
  form: {
    marginTop: 50,
    paddingHorizontal: 36,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 16,
    writingDirection: 'rtl',
  },
  inputWrapper: {
    height: 60,
    backgroundColor: INPUT_BG,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: INPUT_BORDER,
    opacity: 0.92,
    justifyContent: 'center',
    marginBottom: 28,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    height: 60,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  inputFlex: {
    paddingLeft: 0,
  },
  eyeButton: {
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIconPlaceholder: {
    width: 28,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.49)',
  },
  forgotPassword: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.80)',
    textAlign: 'right',
    writingDirection: 'rtl',
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  loginButton: {
    height: 60,
    backgroundColor: BUTTON_BROWN,
    borderRadius: 5,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 34,
  },
  loginButtonPressed: {
    opacity: 0.75,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    fontFamily: 'Calistoga-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.20)',
  },
  separatorText: {
    fontFamily: 'Calistoga-Regular',
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    marginHorizontal: 12,
  },
  registerButton: {
    height: 60,
    backgroundColor: SCREEN_BG,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonPressed: {
    opacity: 0.65,
  },
  registerButtonText: {
    fontFamily: 'Calistoga-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: REGISTER_TEXT,
    textAlign: 'center',
  },
});