import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const BRAND_BROWN = '#4A3321';
const SCREEN_BG = '#F5EFE6';
const CARD_BG = '#FAF3ED';
const CARD_BORDER = 'rgba(0,0,0,0.20)';
const SEARCH_BG = CARD_BG;
const DETAILS_BTN_BG = '#5D3D24';
const BADGE_PENDING_BG = '#F2D2B5';
const BADGE_DONE_BG = '#DAD5B7';
const BADGE_SHIPPING_BG = '#F2D2B5';

type OrderStatus = 'pending' | 'completed' | 'shipping';

interface Order {
  id: string;
  orderNum: string;
  user: string;
  total: string;
  date: string;
  status: OrderStatus;
  statusLabel: string;
}

const DUMMY_ORDERS: Order[] = [
  {
    id: '1',
    orderNum: 'Order #1234',
    user: 'المستخدم : احمد',
    total: 'المجموع : 50',
    date: 'May, 20 ,2026',
    status: 'pending',
    statusLabel: 'قيد الانتظار',
  },
  {
    id: '2',
    orderNum: 'Order #1233',
    user: 'المستخدم : سارة',
    total: 'المجموع : 75',
    date: 'May, 19 ,2026',
    status: 'completed',
    statusLabel: 'مكتمل',
  },
  {
    id: '3',
    orderNum: 'Order #1232',
    user: 'المستخدم : محمد',
    total: 'المجموع :120',
    date: 'May 17 ,2026',
    status: 'shipping',
    statusLabel: 'قيد الشحن',
  },
];

const STATUS_BADGE_BG: Record<OrderStatus, string> = {
  pending: BADGE_PENDING_BG,
  completed: BADGE_DONE_BG,
  shipping: BADGE_SHIPPING_BG,
};

export default function AdminOrdersScreen() {
  const [search, setSearch] = useState('');

  const filtered = DUMMY_ORDERS.filter(o =>
    o.orderNum.includes(search) || o.user.includes(search),
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* ── Header ── */}
      <View style={styles.header}>
        {/* Menu icon placeholder */}
        <View style={styles.menuIcon} />
        <Text style={styles.headerTitle}>الطلبات</Text>
        {/* Filter icon placeholder */}
        <View style={styles.filterIcon} />
      </View>

      {/* ── Search bar ── */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="ابحث عن طلب ..."
          placeholderTextColor="rgba(74,51,33,0.40)"
          textAlign="right"
          writingDirection="rtl"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>

        {filtered.map(order => (
          <View key={order.id} style={styles.orderCard}>

            {/* Row 1: order number + status badge */}
            <View style={styles.cardRow}>
              <View
                style={[
                  styles.statusBadge,
                  {backgroundColor: STATUS_BADGE_BG[order.status]},
                ]}>
                <Text style={styles.statusBadgeText}>{order.statusLabel}</Text>
              </View>
              <Text style={styles.orderNum}>{order.orderNum}</Text>
            </View>

            {/* Row 2: user */}
            <View style={styles.cardRow}>
              <Text style={styles.metaText}>{order.user}</Text>
            </View>

            {/* Row 3: date + total */}
            <View style={styles.cardRow}>
              <View style={styles.totalRow}>
                <Text style={styles.metaText}>{order.total}</Text>
                {/* Shekel icon placeholder */}
                <View style={styles.shekelIcon} />
              </View>
              <Text style={styles.dateText}>{order.date}</Text>
            </View>

            {/* Details button */}
            <Pressable style={styles.detailsBtn}>
              <Text style={styles.detailsBtnText}>عرض التفاصيل</Text>
            </Pressable>

          </View>
        ))}

      </ScrollView>

      {/* ── Bottom nav ── */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: '#5D3D24'}]} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>الطلبات</Text>
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
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>الرئيسية</Text>
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
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 27,
    paddingTop: 12,
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
    writingDirection: 'rtl',
  },
  filterIcon: {
    width: 18,
    height: 16,
    backgroundColor: 'rgba(101,98,98,0.63)',
    borderRadius: 2,
  },

  // Search
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 59,
    marginBottom: 8,
    backgroundColor: SEARCH_BG,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: '#000',
    paddingHorizontal: 12,
    height: 36,
    gap: 8,
  },
  searchIcon: {
    width: 19,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(101,98,98,0.63)',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: BRAND_BROWN,
    textAlign: 'right',
    writingDirection: 'rtl',
    opacity: 0.4,
  },

  // Order card
  orderCard: {
    backgroundColor: CARD_BG,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: CARD_BORDER,
    padding: 12,
    gap: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderNum: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  statusBadge: {
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
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    fontWeight: '400',
    color: '#000',
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
  detailsBtn: {
    backgroundColor: DETAILS_BTN_BG,
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
    marginTop: 4,
  },
  detailsBtnText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: '#FFF',
    writingDirection: 'rtl',
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
