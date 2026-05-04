import React, {useState} from 'react';
import {
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

// TODO: FugazOne-Regular font is used in the subtitle but was not in the linked font set.
//   Add FugazOne-Regular.ttf to src/assets/fonts/ and re-run: npx react-native-asset

// TODO: Replace icon placeholder Views with actual SVG or vector-icons once assets are available.
//   Design uses: user-line, mail-line, phone-line, git-repository-private-line (24×24 each)

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
              {/* FugazOne fallback → Gantari-Regular until font is linked */}
              <Text style={styles.subtitle}>ابدأ رحلتك نحو حياة صحية</Text>
            </View>

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
                style={({pressed}) => [
                  styles.registerButton,
                  pressed && styles.registerButtonPressed,
                ]}>
                <Text style={styles.registerButtonText}>إنشاء حساب</Text>
              </Pressable>

              {/* Already have account */}
              <Pressable>
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
// Renders a simple geometric stand-in for each 24×24 icon type.
// Replace each case with the real SVG/vector-icon once assets are available.
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
const BRAND_BROWN = '#4A3321';   // rgb(74, 51, 33)  — title
const BUTTON_BG   = '#614834';   // rgb(97, 72, 52)  — register button
const INPUT_BG    = '#FFFCF9';   // rgb(255, 252, 249)
const ICON_COLOR  = 'rgba(0,0,0,0.61)';
const INPUT_BORDER = 'rgba(0,0,0,0.20)';

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#C7B09A', // matches gradient start so SafeAreaView edges blend
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

  // ── Header
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
    // TODO: change to 'FugazOne-Regular' once font is linked
    fontFamily: 'Gantari-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginTop: 4,
    writingDirection: 'rtl',
  },

  // ── Form
  form: {
    marginTop: 40,           // gap: subtitle bottom (167+23=190) → first input (230) ≈ 40px
    paddingHorizontal: 36,
    gap: 21,                 // uniform gap between all inputs (matches Zeplin spacing)
  },

  // Shared input row
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

  // Show/hide password toggle
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

  // ── Actions
  actions: {
    marginTop: 66,           // gap: confirm password bottom (554+60=614) → button (680) = 66px
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
  registerButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'center',
  },

  // "لديك حساب؟ تسجيل الدخول"
  loginLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.50)',
    textAlign: 'center',
    marginTop: 36,           // gap: button bottom (680+60=740) → link (776) = 36px
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
  // User: small circle head + wider body bar
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
  // Mail: simple rectangle envelope
  mailEnvelope: {
    width: 18,
    height: 14,
    borderWidth: 1.5,
    borderColor: ICON_COLOR,
    borderRadius: 2,
  },
  // Phone: rounded rectangle
  phoneHandle: {
    width: 14,
    height: 18,
    borderWidth: 1.5,
    borderColor: ICON_COLOR,
    borderRadius: 3,
  },
  // Lock: shackle arc + body
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
