import React, {useState} from 'react';
import {
  ActivityIndicator,
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
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useAuthStore} from '../../store/useAuthStore';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const {signUp, isLoading} = useAuthStore();
  const navigation = useNavigation();

  const handleRegister = async () => {
    setError('');
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('يرجى تعبئة جميع الحقول');
      return;
    }
    if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    }
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    try {
      await signUp(email.trim(), password, fullName.trim());
    } catch (err: any) {
      setError(err.message || 'فشل إنشاء الحساب');
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <LinearGradient
        colors={['#C7B09A', '#E8D8C9', '#D1BCA9']}
        locations={[0.197, 0.423, 0.827]}
        style={styles.gradient}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            {/* ── Header ── */}
            <View style={styles.header}>
              <Text style={styles.title}>انشاء حساب جديد</Text>
              <Text style={styles.subtitle}>ابدأ رحلتك نحو حياة صحية</Text>
            </View>

            {/* ── Error ── */}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* ── Inputs ── */}
            <View style={styles.form}>

              {/* Full name */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="الاسم الكامل"
                  placeholderTextColor="rgba(0,0,0,0.31)"
                  textAlign="right"
                  textContentType="name"
                  autoCapitalize="words"
                />
                <IconPlaceholder shape="user" />
              </View>

              {/* Email */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="البريد الالكتروني"
                  placeholderTextColor="rgba(0,0,0,0.31)"
                  textAlign="right"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                />
                <IconPlaceholder shape="mail" />
              </View>

              {/* Phone */}
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="رقم الهاتف"
                  placeholderTextColor="rgba(0,0,0,0.31)"
                  textAlign="right"
                  keyboardType="phone-pad"
                  textContentType="telephoneNumber"
                />
                <IconPlaceholder shape="phone" />
              </View>

              {/* Password */}
              <View style={styles.inputWrapper}>
                <Pressable
                  onPress={() => setShowPassword(p => !p)}
                  hitSlop={8}
                  style={styles.eyeButton}>
                  <View style={styles.eyeIcon} />
                </Pressable>
                <TextInput
                  style={[styles.input, styles.inputFlex]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="كلمة المرور"
                  placeholderTextColor="rgba(0,0,0,0.31)"
                  textAlign="right"
                  secureTextEntry={!showPassword}
                  textContentType="newPassword"
                />
                <IconPlaceholder shape="lock" />
              </View>

              {/* Confirm password */}
              <View style={styles.inputWrapper}>
                <Pressable
                  onPress={() => setShowConfirmPassword(p => !p)}
                  hitSlop={8}
                  style={styles.eyeButton}>
                  <View style={styles.eyeIcon} />
                </Pressable>
                <TextInput
                  style={[styles.input, styles.inputFlex]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="تاكيد كلمة المرور"
                  placeholderTextColor="rgba(0,0,0,0.31)"
                  textAlign="right"
                  secureTextEntry={!showConfirmPassword}
                  textContentType="newPassword"
                />
                <IconPlaceholder shape="lock" />
              </View>

            </View>

            {/* ── Register button ── */}
            <View style={styles.actions}>
              <Pressable
                onPress={handleRegister}
                disabled={isLoading}
                style={({pressed}) => [
                  styles.registerButton,
                  pressed && styles.registerButtonPressed,
                  isLoading && styles.registerButtonDisabled,
                ]}>
                {isLoading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.registerButtonText}>إنشاء حساب</Text>
                )}
              </Pressable>

              {/* Already have account */}
              <Pressable onPress={() => navigation.goBack()}>
                <Text style={styles.loginLink}>لديك حساب؟ تسجيل الدخول</Text>
              </Pressable>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

// ── Icon placeholder component ───────────────────────────────────────────────
type IconShape = 'user' | 'mail' | 'phone' | 'lock';

function IconPlaceholder({shape}: {shape: IconShape}) {
  return (
    <View style={iconStyles.container}>
      {shape === 'user' && (
        <>
          <View style={iconStyles.userHead} />
          <View style={iconStyles.userBody} />
        </>
      )}
      {shape === 'mail' && (
        <View style={iconStyles.mailEnvelope} />
      )}
      {shape === 'phone' && (
        <View style={iconStyles.phoneHandle} />
      )}
      {shape === 'lock' && (
        <>
          <View style={iconStyles.lockShackle} />
          <View style={iconStyles.lockBody} />
        </>
      )}
    </View>
  );
}

// ── Colors ────────────────────────────────────────────────────────────────────
const BRAND_BROWN = '#4A3321';
const BUTTON_BG   = '#614834';
const INPUT_BG    = '#FFFCF9';
const ICON_COLOR  = 'rgba(0,0,0,0.61)';
const INPUT_BORDER = 'rgba(0,0,0,0.20)';

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#C7B09A',
  },
  gradient: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    marginTop: 111,
    paddingHorizontal: 36,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Calistoga-Regular',
    fontSize: 32,
    fontWeight: '400',
    color: BRAND_BROWN,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  subtitle: {
    fontFamily: 'Gantari-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginTop: 4,
    writingDirection: 'rtl',
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 36,
    writingDirection: 'rtl',
  },
  form: {
    marginTop: 40,
    paddingHorizontal: 36,
    gap: 21,
  },
  inputWrapper: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: INPUT_BG,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: INPUT_BORDER,
    opacity: 0.92,
    paddingLeft: 12,
  },
  input: {
    flex: 1,
    height: 60,
    paddingHorizontal: 12,
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
  },
  eyeIcon: {
    width: 22,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: ICON_COLOR,
  },
  actions: {
    marginTop: 66,
    paddingHorizontal: 36,
    alignItems: 'center',
  },
  registerButton: {
    width: '100%',
    height: 60,
    backgroundColor: BUTTON_BG,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonPressed: {
    opacity: 0.75,
  },
  registerButtonDisabled: {
    opacity: 0.5,
  },
  registerButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'center',
  },
  loginLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.50)',
    textAlign: 'center',
    marginTop: 36,
    writingDirection: 'rtl',
  },
});

// ── Icon placeholder styles ────────────────────────────────────────────────────
const iconStyles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.61,
    marginLeft: 4,
  },
  userHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: ICON_COLOR,
    marginBottom: 1,
  },
  userBody: {
    width: 16,
    height: 7,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: ICON_COLOR,
  },
  mailEnvelope: {
    width: 18,
    height: 14,
    borderWidth: 1.5,
    borderColor: ICON_COLOR,
    borderRadius: 2,
  },
  phoneHandle: {
    width: 14,
    height: 18,
    borderWidth: 1.5,
    borderColor: ICON_COLOR,
    borderRadius: 3,
  },
  lockShackle: {
    width: 10,
    height: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: ICON_COLOR,
    marginBottom: -1,
  },
  lockBody: {
    width: 14,
    height: 10,
    borderWidth: 1.5,
    borderColor: ICON_COLOR,
    borderRadius: 2,
  },
});