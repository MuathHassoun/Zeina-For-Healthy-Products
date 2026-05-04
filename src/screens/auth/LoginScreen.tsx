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

// TODO: Add custom fonts to the project (android/app/src/main/assets/fonts + iOS Info.plist):
//   - Fustat-ExtraBold
//   - Gantari-Regular
//   - Calistoga-Regular
//   - Inter-Medium, Inter-Regular

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
              {/* Eye icon — left side (RTL: visually right-to-left so icon is on left) */}
              <Pressable
                style={styles.eyeButton}
                onPress={() => setShowPassword(prev => !prev)}
                hitSlop={8}>
                {/* TODO: Replace with an actual eye icon asset */}
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
              style={({pressed}) => [
                styles.loginButton,
                pressed && styles.loginButtonPressed,
              ]}>
              <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
            </Pressable>

            {/* "أو" separator */}
            <View style={styles.separatorRow}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>أو</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Create account button */}
            <Pressable
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

const BRAND_BROWN = '#4A3321';      // rgb(74, 51, 33)  — headings
const BUTTON_BROWN = '#503520';     // rgb(80, 53, 32)  — login button bg
const REGISTER_TEXT = '#553B22';    // rgb(85, 59, 34)  — register button text
const INPUT_BG = '#FFFCF9';         // rgb(255, 252, 249)
const SCREEN_BG = '#F5EFE6';        // rgb(245, 239, 230)
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

  // Decorative corner element — matches Zeplin layer at top-right (123×110, opacity 0.20)
  // TODO: Replace with <Image source={require('...')} /> once asset is available
  decorTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 123,
    height: 110,
    opacity: 0.2,
    // backgroundColor: 'transparent',
  },

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    marginTop: 110,       // matches Zeplin y:110 for welcome title
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

  // ── Form ────────────────────────────────────────────────────────────────────
  form: {
    marginTop: 50,        // gap between subtitle and first input (~y:274 - subtitle bottom ~224)
    paddingHorizontal: 36,
  },

  // Shared input container (Frame 59 & Frame 60)
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

  // Eye icon for show/hide password
  eyeButton: {
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // TODO: Replace this placeholder with an actual <Image> or SVG eye icon (28×18 from design)
  eyeIconPlaceholder: {
    width: 28,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.49)',
  },

  // Forgot password — right-aligned, Inter Medium 12px
  forgotPassword: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.80)',
    textAlign: 'right',
    writingDirection: 'rtl',
    alignSelf: 'flex-end',
    marginBottom: 40,      // gap to login button (~y:505 - forgotBottom ~465 = 40)
  },

  // Login button (Frame 61)
  loginButton: {
    height: 60,
    backgroundColor: BUTTON_BROWN,
    borderRadius: 5,
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 34,     // gap to "أو" separator
  },
  loginButtonPressed: {
    opacity: 0.75,
  },
  loginButtonText: {
    fontFamily: 'Calistoga-Regular',
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // "أو" separator
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,     // gap to register button
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

  // Create account button (Frame 62)
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
