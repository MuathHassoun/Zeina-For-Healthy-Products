import React from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const OVERLAY_BG = 'rgba(0,0,0,0.30)';
const MENU_BG = '#EBDAC8';
const MENU_BORDER = '#000';
const MENU_SHADOW = 'rgba(0,0,0,0.25)';
const DIVIDER_COLORS = ['#E6D6C6', '#F6F0EB', '#FCF8F4', '#E8D8C9'];

interface MenuItem {
  key: string;
  label: string;
  active?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {key: 'home', label: 'الرئيسية', active: true},
  {key: 'orders', label: 'الطلبات'},
  {key: 'products', label: 'المنتجات'},
  {key: 'users', label: 'المستخدمين'},
];

export default function AdminSideMenuScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* ── Full-screen row: overlay + menu panel ── */}
      <View style={styles.row}>

        {/* Left overlay — tappable to close */}
        <Pressable style={styles.overlay} />

        {/* ── Menu panel ── */}
        <View style={styles.menuPanel}>

          {/* Logo / brand image placeholder at top */}
          <View style={styles.logoPlaceholder} />

          {/* Navigation items */}
          {MENU_ITEMS.map(item => (
            <Pressable key={item.key} style={styles.menuItem}>
              {/* Icon placeholder */}
              <View style={styles.menuItemIcon} />
              <Text style={styles.menuItemLabel}>{item.label}</Text>
            </Pressable>
          ))}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Settings */}
          <Pressable style={styles.menuItem}>
            <View style={styles.menuItemIcon} />
            <Text style={styles.menuItemLabel}>الاعدادات</Text>
          </Pressable>

          {/* Decorative bottom image placeholder */}
          <View style={styles.decorBottom} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },

  // Left overlay (blurred/dark background)
  overlay: {
    flex: 1,
    backgroundColor: OVERLAY_BG,
  },

  // Right sliding menu panel
  menuPanel: {
    width: 244,
    backgroundColor: MENU_BG,
    borderLeftWidth: 1,
    borderLeftColor: MENU_BORDER,
    shadowColor: MENU_SHADOW,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    paddingTop: 20,
    paddingBottom: 20,
    overflow: 'hidden',
  },

  // Logo area
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#C8A88A',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 32,
    marginTop: 10,
  },

  // Menu items
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  menuItemIcon: {
    width: 30,
    height: 29,
    backgroundColor: '#FFF',
    borderRadius: 4,
  },
  menuItemLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    fontWeight: '500',
    color: '#FFF',
    textAlign: 'right',
    writingDirection: 'rtl',
  },

  // Divider
  divider: {
    height: 6,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 3,
    backgroundColor: DIVIDER_COLORS[0],
    opacity: 0.8,
  },

  // Bottom decorative image
  decorBottom: {
    position: 'absolute',
    bottom: 0,
    left: 40,
    width: 204,
    height: 229,
    backgroundColor: '#C8A88A',
    opacity: 0.2,
    borderRadius: 8,
  },
});
