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

const SCREEN_BG  = '#F5EFE6';
const CARD_BG    = '#FBF6F2';
const INPUT_BG   = '#F5EFE6';
const TITLE_COL  = '#4A3321';
const SECTION_COL = '#604B3A';
const BTN_BG     = '#48321D';

const CUSTOMER_FIELDS = [
  {key: 'name',  placeholder: 'الاسم الكامل'},
  {key: 'phone', placeholder: 'رقم الهاتف'},
  {key: 'email', placeholder: 'البريد الالكتروني'},
];

const ADDRESS_FIELDS = [
  {key: 'city',    placeholder: 'المدينة'},
  {key: 'district', placeholder: 'الحي'},
  {key: 'detail',  placeholder: 'العنوان التفصيلي'},
];

export default function CheckoutScreen() {
  const [form, setForm] = useState<Record<string, string>>({});

  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* ── Header ── */}
      <View style={s.header}>
        <View style={s.arrowBack} />
        <Text style={s.headerTitle}>إنشاء الطلب</Text>
        <View style={s.arrowForward} />
      </View>

      <KeyboardAvoidingView
        style={s.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">

          {/* ── Main card ── */}
          <View style={s.card}>

            {/* معلومات العميل */}
            <Text style={s.sectionTitle}>معلومات العميل</Text>
            {CUSTOMER_FIELDS.map(field => (
              <TextInput
                key={field.key}
                style={s.input}
                placeholder={field.placeholder}
                placeholderTextColor="rgba(0,0,0,0.3)"
                textAlign="right"
                value={form[field.key] ?? ''}
                onChangeText={val => setForm(prev => ({...prev, [field.key]: val}))}
              />
            ))}

            {/* عنوان التوصيل */}
            <Text style={s.sectionTitle}>عنوان التوصيل</Text>
            {ADDRESS_FIELDS.map(field => (
              <TextInput
                key={field.key}
                style={s.input}
                placeholder={field.placeholder}
                placeholderTextColor="rgba(0,0,0,0.3)"
                textAlign="right"
                value={form[field.key] ?? ''}
                onChangeText={val => setForm(prev => ({...prev, [field.key]: val}))}
              />
            ))}

            {/* متابعة button */}
            <Pressable style={s.submitBtn}>
              <Text style={s.submitBtnText}>متابعة</Text>
            </Pressable>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  flex: {
    flex: 1,
  },

  // ── Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: SCREEN_BG,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    fontWeight: '700',
    color: TITLE_COL,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  arrowBack: {
    width: 18,
    height: 16,
    backgroundColor: '#000',
    borderRadius: 2,
    opacity: 0.8,
  },
  arrowForward: {
    width: 20,
    height: 21,
    backgroundColor: '#000',
    borderRadius: 2,
    opacity: 0.8,
  },

  // ── Scroll ──────────────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 27,
    paddingBottom: 20,
  },

  // ── Card ────────────────────────────────────────────────────
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: '#000',
    paddingHorizontal: 30,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // ── Section title ────────────────────────────────────────────
  sectionTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 20,
    fontWeight: '700',
    color: SECTION_COL,
    textAlign: 'center',
    writingDirection: 'rtl',
    marginTop: 12,
    marginBottom: 12,
  },

  // ── Input ────────────────────────────────────────────────────
  input: {
    width: '100%',
    height: 45,
    backgroundColor: INPUT_BG,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontFamily: 'Inter-ExtraBold',
    fontSize: 14,
    color: '#000',
    marginBottom: 16,
    writingDirection: 'rtl',
  },

  // ── Submit button ────────────────────────────────────────────
  submitBtn: {
    width: '100%',
    height: 45,
    backgroundColor: BTN_BG,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
