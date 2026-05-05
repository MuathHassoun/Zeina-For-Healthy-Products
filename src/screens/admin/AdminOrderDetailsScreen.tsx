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
const SCREEN_BG = '#F5EFE6';
const CONTAINER_BG = '#F7EEE5';
const SECTION_BG = '#FFF6EF';
const SECTION_BORDER = 'rgba(0,0,0,0.20)';
const BADGE_BG = '#F2D2B5';
const APPROVE_BG = '#65432B';
const CANCEL_BG = '#EBDAC8';

const ORDER = {
  orderNum: 'Order #1234',
  status: 'قيد الانتظار',
  date: 'التاريخ : May , 20 ,2026',
  total: 'المجموع : 50',
  user: {
    name: 'الاسم :    احمد',
    email: 'الايمل:   ahmad11@gmail.com',
    phone: 'رقم الهاتف:   0599123434',
  },
  products: [
    {id: 1, name: 'زيت زيتون', qty: '× 2', price: '20.00'},
    {id: 2, name: 'عسل طبيعي', qty: '× 1', price: '10.00'},
  ],
};

export default function AdminOrderDetailsScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* ── Status bar row ── */}
      <View style={styles.topBar}>
        <Text style={styles.clock}>12:12</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>

        {/* ── Main card container ── */}
        <View style={styles.container}>

          {/* ── Container header ── */}
          <View style={styles.containerHeader}>
            <Pressable style={styles.backBtn}>
              <View style={styles.backIcon} />
            </Pressable>
            <Text style={styles.containerTitle}>تفاصيل الطلب</Text>
          </View>

          {/* ── Order info section ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>{ORDER.status}</Text>
              </View>
              <Text style={styles.orderNum}>{ORDER.orderNum}</Text>
            </View>
            <Text style={styles.metaText}>{ORDER.date}</Text>
            <View style={styles.totalRow}>
              <View style={styles.shekelIcon} />
              <Text style={styles.metaText}>{ORDER.total}</Text>
            </View>
          </View>

          {/* ── User info section ── */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              {/* User icon placeholder */}
              <View style={styles.userIcon} />
              <Text style={styles.sectionTitle}>معلومات المستخدم</Text>
            </View>
            <Text style={styles.metaSmall}>{ORDER.user.name}</Text>
            <Text style={styles.metaSmall}>{ORDER.user.email}</Text>
            <Text style={styles.metaSmall}>{ORDER.user.phone}</Text>
          </View>

          {/* ── Products section ── */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              {/* Box icon placeholder */}
              <View style={styles.userIcon} />
              <Text style={styles.sectionTitle}>المنتجات</Text>
            </View>
            {ORDER.products.map(p => (
              <View key={p.id} style={styles.productRow}>
                {/* Product image placeholder */}
                <View style={styles.productThumb} />
                <Text style={styles.metaSmall}>{p.name}</Text>
                <Text style={styles.metaSmall}>{p.qty}</Text>
                <View style={styles.priceRow}>
                  <View style={styles.shekelIconSm} />
                  <Text style={styles.metaSmall}>{p.price}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* ── Action buttons ── */}
          <View style={styles.actionRow}>
            <Pressable style={styles.approveBtn}>
              <Text style={styles.approveBtnText}>اعتماد</Text>
            </Pressable>
            <Pressable style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>الغاء</Text>
            </Pressable>
          </View>

        </View>

      </ScrollView>

      {/* ── Bottom nav ── */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>الرئيسية</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>المنتجات</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>المستخدمين</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: '#5D3D24'}]} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>الطلبات</Text>
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
  topBar: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: SCREEN_BG,
  },
  clock: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: '#000',
    opacity: 0.85,
  },
  scroll: {
    paddingHorizontal: 21,
    paddingTop: 0,
    paddingBottom: 20,
  },

  // Main container
  container: {
    backgroundColor: CONTAINER_BG,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    padding: 20,
    gap: 16,
    overflow: 'hidden',
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  backBtn: {
    padding: 4,
  },
  backIcon: {
    width: 29,
    height: 19,
    backgroundColor: BRAND_BROWN,
    borderRadius: 2,
  },
  containerTitle: {
    fontFamily: 'Fustat-ExtraBold',
    fontSize: 24,
    fontWeight: '800',
    color: BRAND_BROWN,
    writingDirection: 'rtl',
  },

  // Sections
  section: {
    backgroundColor: SECTION_BG,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: SECTION_BORDER,
    padding: 14,
    gap: 8,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
    writingDirection: 'rtl',
  },
  userIcon: {
    width: 23,
    height: 21,
    backgroundColor: '#000',
    borderRadius: 4,
  },
  orderNum: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  statusBadge: {
    backgroundColor: BADGE_BG,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusBadgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  metaText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
    writingDirection: 'rtl',
  },
  metaSmall: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    fontWeight: '400',
    color: '#000',
    writingDirection: 'rtl',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  shekelIcon: {
    width: 21,
    height: 11,
    backgroundColor: '#C4A070',
    borderRadius: 2,
  },
  shekelIconSm: {
    width: 18,
    height: 9,
    backgroundColor: '#C4A070',
    borderRadius: 2,
  },

  // Products
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  productThumb: {
    width: 33,
    height: 33,
    backgroundColor: '#D4B896',
    borderRadius: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginTop: 8,
  },
  approveBtn: {
    backgroundColor: APPROVE_BG,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#000',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  approveBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  cancelBtn: {
    backgroundColor: CANCEL_BG,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#000',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
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
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
  },
});
