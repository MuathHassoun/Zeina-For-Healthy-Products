import React from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const DRAWER_BG = '#735842';

const MENU_ITEMS = [
  'الرئيسية',
  'الاصناف',
  'طلباتي',
  'السلة',
  'المفضلة',
  'الاعدادات',
  'تسجيل الخروج',
];

export default function SideMenuScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      <View style={s.container}>

        {/* ── Left dim overlay (tap to close) ── */}
        <Pressable style={s.dimOverlay} />

        {/* ── Right drawer panel ── */}
        <View style={s.drawer}>
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* ── Profile area ── */}
            <View style={s.profileArea}>
              {/* Avatar placeholder */}
              <View style={s.avatar} />
              <Text style={s.greeting}>مرحباً</Text>
              <Text style={s.username}>ملك احمد</Text>
            </View>

            {/* Divider */}
            <View style={s.divider} />

            {/* ── Menu items ── */}
            {MENU_ITEMS.map((item, i) => (
              <Pressable key={i} style={s.menuItem}>
                <Text style={s.menuText}>{item}</Text>
                <View style={s.menuIcon} />
              </Pressable>
            ))}

            {/* Divider */}
            <View style={s.divider} />

            {/* ── Social section ── */}
            <Text style={s.socialLabel}>تواصل معنا</Text>
            <View style={s.socialRow}>
              {/* Instagram */}
              <View style={s.socialIcon} />
              {/* WhatsApp */}
              <View style={s.socialIcon} />
              {/* Facebook */}
              <View style={s.socialIcon} />
            </View>

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  container: {
    flex: 1,
    flexDirection: 'row',
  },

  // ── Left dim overlay ─────────────────────────────────────────
  dimOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  // ── Right drawer ─────────────────────────────────────────────
  drawer: {
    width: 244,
    backgroundColor: DRAWER_BG,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },

  // ── Profile area ─────────────────────────────────────────────
  profileArea: {
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  avatar: {
    width: 71,
    height: 71,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 35.5,
    marginBottom: 12,
  },
  greeting: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  // ── Divider ──────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: 'rgba(230,214,198,0.5)',
    marginHorizontal: 0,
    marginVertical: 8,
  },

  // ── Menu items ───────────────────────────────────────────────
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 18,
    paddingRight: 20,
    paddingLeft: 16,
  },
  menuText: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginLeft: 12,
  },
  menuIcon: {
    width: 28,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
  },

  // ── Social section ───────────────────────────────────────────
  socialLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 12,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingBottom: 24,
  },
  socialIcon: {
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 12,
  },
});
