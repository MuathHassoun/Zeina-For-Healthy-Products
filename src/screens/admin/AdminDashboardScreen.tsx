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

const BRAND_BROWN = '#4A3321';
const ICON_BROWN = '#614834';
const SCREEN_BG = '#F5EFE6';
const CARD_BG = '#FFFAF1';
const CARD_BORDER = 'rgba(0,0,0,0.20)';
const DATE_BG = '#FFFAF1';

export default function AdminDashboardScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>

        {/* ── Header ── */}
        <View style={styles.header}>
          {/* Menu icon placeholder */}
          <View style={styles.menuIcon} />
          <Text style={styles.headerTitle}>الرئيسية</Text>
          {/* Notification icon placeholder */}
          <View style={styles.notifIcon} />
        </View>

        {/* ── Greeting row ── */}
        <View style={styles.greetingRow}>
          {/* Logo / product image placeholder */}
          <View style={styles.logoPlaceholder} />
          <View style={styles.greetingText}>
            <Text style={styles.greeting}>مرحباً زينا</Text>
            <Text style={styles.greetingSub}>اليك ملخص اداء متجرك اليوم</Text>
            {/* Date badge */}
            <View style={styles.dateBadge}>
              <View style={styles.calendarIcon} />
              <Text style={styles.dateText}>1 مايو 2026</Text>
            </View>
          </View>
        </View>

        {/* ── Stats grid ── */}
        <View style={styles.statsGrid}>

          {/* Total orders */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>اجمالي الطلبيات</Text>
            <View style={styles.statValueRow}>

              <Text style={styles.statUnit}>طلب</Text>

              <Text style={styles.statValue}>86</Text>
              
              
            </View>
            <View style={[styles.statIcon, {backgroundColor: ICON_BROWN}]} />
          </View>

          {/* Total sales */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>اجمالي المبيعات</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statUnit}>شيكل</Text>
              <Text style={styles.statValue}>12,500</Text>
            </View>
            <View style={[styles.statIcon, {backgroundColor: ICON_BROWN}]} />
          </View>

          {/* Products */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>المنتجات</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statUnit}>منتج</Text>
              <Text style={styles.statValue}>58</Text>
            </View>
            <View style={[styles.statIcon, {backgroundColor: ICON_BROWN}]} />
          </View>

          {/* Total users */}
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>اجمالي المستخدمين</Text>
            <View style={styles.statValueRow}>
              <Text style={styles.statUnit}>مستخدم</Text>
              <Text style={styles.statValue}>1,240</Text>
            </View>
            <View style={[styles.statIcon, {backgroundColor: ICON_BROWN}]} />
          </View>

        </View>

      </ScrollView>

      {/* ── Bottom nav ── */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>الرئيسية</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>المنتجات</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>الأراء</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: '#5D3D24'}]} />
          <Text style={styles.navLabel}>الطلبات</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 23,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: SCREEN_BG,
  },
  menuIcon: {
    width: 18,
    height: 16,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  headerTitle: {
    fontFamily: 'Fustat-ExtraBold',
    fontSize: 24,
    fontWeight: '800',
    color: BRAND_BROWN,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  notifIcon: {
    width: 20,
    height: 21,
    backgroundColor: '#000',
    borderRadius: 3,
  },

  // Greeting
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
  },
  logoPlaceholder: {
    width: 191,
    height: 191,
    backgroundColor: '#E8D9C8',
    borderRadius: 8,
    opacity: 0.6,
  },
  greetingText: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  greeting: {
    fontFamily: 'Fustat-ExtraBold',
    fontSize: 32,
    fontWeight: '800',
    color: BRAND_BROWN,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  greetingSub: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 4,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DATE_BG,
    borderWidth: 0.2,
    borderColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 12,
    gap: 6,
  },
  calendarIcon: {
    width: 16,
    height: 16,
    backgroundColor: BRAND_BROWN,
    borderRadius: 2,
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: BRAND_BROWN,
    writingDirection: 'rtl',
  },

  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  statCard: {
    width: '47%',
    backgroundColor: CARD_BG,
    borderWidth: 0.2,
    borderColor: CARD_BORDER,
    borderRadius: 5,
    padding: 12,
    minHeight: 123,
    justifyContent: 'space-between',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    gap: 4,
  },
  statValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  statUnit: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: '#000',
  },
  statIcon: {
    width: 26,
    height: 25,
    borderRadius: 3,
    opacity: 0.8,
    alignSelf: 'flex-start',
  },
  statIconRound: {
    width: 44,
    height: 43,
    borderRadius: 90,
    alignSelf: 'center',
  },

  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 0.2,
    borderTopColor: '#000',
    paddingVertical: 8,
    backgroundColor: SCREEN_BG,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 22,
    height: 22,
    borderRadius: 3,
  },
  navLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  navLabelActive: {
    fontFamily: 'Inter-ExtraBold',
    fontWeight: '800',
  },
});
