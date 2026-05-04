import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const TRACK_BG    = '#553921';
const HOME_PILL_BG = '#746658';

export default function OrderConfirmationScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

      {/* Full-screen background image placeholder */}
      <View style={s.bgImage} />

      {/* Content overlay */}
      <View style={s.overlay}>

        {/* Confirmation text */}
        <Text style={s.title}>تم تاكيد طلبك بنجاح!</Text>
        <Text style={s.subtitle}>شكرا لثقتك بنا</Text>

        {/* Track orders button */}
        <Pressable style={s.trackBtn}>
          <Text style={s.trackBtnText}>متابعة الطلبات</Text>
        </Pressable>

        {/* Back to home pill */}
        <Pressable style={s.homePill}>
          <Text style={s.homePillText}>العودة الى الرئيسية</Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#2A1A0A',
  },

  // ── BG image placeholder ─────────────────────────────────────
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(42,26,10,0.95)',
    borderRadius: 20,
  },

  // ── Overlay content ──────────────────────────────────────────
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 120,
  },

  title: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    writingDirection: 'rtl',
    marginBottom: 48,
  },

  // ── Track orders button ──────────────────────────────────────
  trackBtn: {
    width: 203,
    height: 42,
    backgroundColor: TRACK_BG,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
    marginBottom: 36,
  },
  trackBtnText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // ── Home pill ────────────────────────────────────────────────
  homePill: {
    width: 178,
    height: 29,
    backgroundColor: HOME_PILL_BG,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homePillText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
