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

const SCREEN_BG  = '#F5EFE6';
const CARD_BG    = '#F2E6DA';
const ROW_BG     = '#FAF3EB';
const TITLE_COL  = '#4A3321';
const SUB_COL    = '#665949';
const TOTAL_COL  = '#4E3E2F';
const BTN_BG     = '#563A24';

const DUMMY_ROWS = [
  {id: '1', imgW: 90,  imgH: 90},
  {id: '2', imgW: 91,  imgH: 91},
  {id: '3', imgW: 95,  imgH: 74},
  {id: '4', imgW: 91,  imgH: 91},
  {id: '5', imgW: 91,  imgH: 91},
];

export default function OrderReviewScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* ── Header ── */}
      <View style={s.header}>
        <View style={s.arrowBack} />
        <Text style={s.headerTitle}>مراجعة الطلب</Text>
        <View style={s.arrowForward} />
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ── Order card ── */}
        <View style={s.card}>

          {/* Order rows */}
          {DUMMY_ROWS.map(row => (
            <View key={row.id} style={s.orderRow}>
              <View style={[s.rowImage, {width: row.imgW, height: row.imgH}]} />
            </View>
          ))}

          {/* Pricing */}
          <Text style={s.subLabel}>المجموع الفرعي</Text>
          <Text style={s.subLabel}>تكلفة التوصيل</Text>
          <Text style={s.totalLabel}>الاجمالي</Text>

        </View>

        {/* Divider */}
        <View style={s.divider} />

        {/* Confirm button */}
        <Pressable style={s.confirmBtn}>
          <Text style={s.confirmBtnText}>تاكيد الطلب</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
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
    fontWeight: '800',
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
    paddingHorizontal: 23,
    paddingBottom: 20,
  },

  // ── Order card ───────────────────────────────────────────────
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 8,
  },

  // Order row
  orderRow: {
    height: 76,
    backgroundColor: ROW_BG,
    marginBottom: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowImage: {
    backgroundColor: 'rgba(150,107,60,0.12)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },

  // Pricing labels
  subLabel: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    fontWeight: '800',
    color: SUB_COL,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: 8,
  },
  totalLabel: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: TOTAL_COL,
    textAlign: 'center',
    marginTop: 8,
  },

  // ── Divider ──────────────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: 'rgba(215,197,179,0.6)',
    marginHorizontal: 0,
    marginBottom: 16,
  },

  // ── Confirm button ───────────────────────────────────────────
  confirmBtn: {
    alignSelf: 'center',
    width: 246,
    height: 51,
    backgroundColor: BTN_BG,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtnText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
