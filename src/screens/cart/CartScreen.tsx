import React from 'react';
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

const SCREEN_BG   = '#F5EFE6';
const CARD_BG     = '#FBF6F2';
const NAV_BG      = '#614834';
const TITLE_COL   = '#4A3321';
const SUB_COL     = '#665949';
const REMOVE_COL  = '#614834';
const INPUT_BG    = '#FBF6F2';
const APPLY_BG    = '#9A7E67';
const COUPON_COL  = '#614834';

const DUMMY_ITEMS = [
  {id: '1', imgW: 90,  imgH: 90},
  {id: '2', imgW: 91,  imgH: 91},
  {id: '3', imgW: 100, imgH: 75},
  {id: '4', imgW: 100, imgH: 76},
];

const NAV_ITEMS = ['الحساب', 'الاقسام', 'المفضلة', 'السلة', 'الرئيسية'];

export default function CartScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* ── Header ── */}
      <View style={s.header}>
        <View style={s.arrowBack} />
        <Text style={s.headerTitle}>السلة</Text>
        <View style={s.arrowForward} />
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* Cart items */}
        {DUMMY_ITEMS.map(item => (
          <View key={item.id} style={s.itemRow}>
            <View style={s.removeIcon} />
            <View style={[s.itemImage, {width: item.imgW, height: item.imgH}]} />
          </View>
        ))}

        {/* Delivery cost label */}
        <Text style={s.deliveryLabel}>تكلفة التوصيل</Text>

        {/* Coupon section */}
        <Text style={s.couponPrompt}>لديك كوبون خصم؟</Text>

        <View style={s.couponRow}>
          {/* Apply button */}
          <Pressable style={s.applyBtn}>
            <Text style={s.applyBtnText}>تطبيق</Text>
          </Pressable>

          {/* Coupon input */}
          <View style={s.couponInput} />
        </View>

        {/* Subtotal */}
        <Text style={s.subtotalLabel}>المجموع الفرعي</Text>

      </ScrollView>

      {/* ── Bottom nav ── */}
      <View style={s.bottomNav}>
        {NAV_ITEMS.map((label, i) => (
          <View key={i} style={s.navItem}>
            <NavIcon index={i} />
            <Text style={s.navLabel}>{label}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

function NavIcon({index}: {index: number}) {
  if (index === 4) {
    return (
      <View style={ni.wrap}>
        <View style={ni.houseRoof} />
        <View style={ni.houseBody} />
      </View>
    );
  }
  if (index === 3) {
    return <View style={[ni.wrap, {justifyContent: 'center'}]}><View style={ni.cartBox} /></View>;
  }
  if (index === 2) {
    return <View style={[ni.wrap, {justifyContent: 'center'}]}><View style={ni.heart} /></View>;
  }
  if (index === 1) {
    return (
      <View style={ni.wrap}>
        <View style={ni.gridRow}><View style={ni.dot} /><View style={ni.dot} /></View>
        <View style={ni.gridRow}><View style={ni.dot} /><View style={ni.dot} /></View>
      </View>
    );
  }
  return (
    <View style={ni.wrap}>
      <View style={ni.userHead} />
      <View style={ni.userBody} />
    </View>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: SCREEN_BG,
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
    paddingHorizontal: 19,
    paddingBottom: 20,
  },

  // Cart item row
  itemRow: {
    height: 106,
    backgroundColor: CARD_BG,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 0,
  },
  removeIcon: {
    width: 18,
    height: 18,
    backgroundColor: REMOVE_COL,
    borderRadius: 3,
    opacity: 0.85,
  },
  itemImage: {
    backgroundColor: 'rgba(150,107,60,0.12)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },

  // Delivery label
  deliveryLabel: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    color: SUB_COL,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },

  // Coupon
  couponPrompt: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: COUPON_COL,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  couponRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  applyBtn: {
    width: 85,
    height: 36,
    backgroundColor: APPLY_BG,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: '#000',
  },
  applyBtnText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '700',
    color: COUPON_COL,
    textAlign: 'center',
  },
  couponInput: {
    flex: 1,
    height: 36,
    backgroundColor: INPUT_BG,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: '#000',
  },

  // Subtotal
  subtotalLabel: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    color: SUB_COL,
    textAlign: 'center',
    opacity: 0.8,
  },

  // ── Bottom nav ───────────────────────────────────────────────
  bottomNav: {
    height: 48,
    backgroundColor: NAV_BG,
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  navLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 2,
  },
});

const ni = StyleSheet.create({
  wrap: {
    width: 22,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  houseRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFF',
  },
  houseBody: {
    width: 14,
    height: 10,
    backgroundColor: '#FFF',
    borderRadius: 1,
  },
  cartBox: {
    width: 16,
    height: 13,
    borderWidth: 1.5,
    borderColor: '#FFF',
    borderRadius: 2,
    marginTop: 3,
  },
  heart: {
    width: 18,
    height: 16,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#FFF',
    transform: [{rotate: '45deg'}],
  },
  gridRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 3,
  },
  dot: {
    width: 7,
    height: 7,
    backgroundColor: '#FFF',
    borderRadius: 1,
  },
  userHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#FFF',
    marginBottom: 1,
  },
  userBody: {
    width: 16,
    height: 7,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#FFF',
  },
});
