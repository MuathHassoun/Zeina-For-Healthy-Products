import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width: W} = Dimensions.get('window');

// ─── Colors ───────────────────────────────────────────────────────────────────
const SCREEN_BG  = '#F5EFE6';
const STATUS_BG  = '#FBF6F2';
const SEARCH_BG  = '#FBFCF8';
const CARD_BG    = '#FBF7F2';
const NAV_BG     = '#614834';
const CTA_BG     = 'rgba(196,154,108,0.8)';
const HERO_TXT1  = 'rgba(223,194,163,0.9)';
const HERO_TXT2  = '#CBB190';
const CHIP_COL   = '#72675B';
const SEC_TITLE  = '#625446';
const SEE_ALL    = 'rgba(136,124,110,0.72)';
const SUB1       = '#887C6E';
const SUB2       = '#96897F';

// ─── Dummy data ───────────────────────────────────────────────────────────────
const NAV_ITEMS = ['الحساب', 'الاقسام', 'المفضلة', 'السلة', 'الرئيسية'];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View style={s.root}>

        <ScrollView
          style={s.scroll}
          contentContainerStyle={s.scrollContent}
          showsVerticalScrollIndicator={false}>

          {/* ① Header: search bar ─────────────────────────────── */}
          <View style={s.header}>
            <View style={s.searchRow}>
              {/* Hamburger */}
              <View style={s.menuIcon}>
                <View style={s.menuLine} />
                <View style={[s.menuLine, s.menuLineShort]} />
              </View>

              {/* Search pill */}
              <View style={s.pill}>
                
                <Text style={s.pillPlaceholder} numberOfLines={1}>
                  ابحث عن منتج صحي ...
                </Text>
                <View style={s.pillSearchDot} />
              </View>

              {/* Cart */}
              <View style={s.cartBox} />
            </View>
          </View>

          {/* ② Hero banner ───────────────────────────────────────── */}
          <View style={s.hero}>
            <View style={s.heroImgRight} />
            <View style={s.heroTextBlock}>

              <Text style={s.heroLine1}>اختيارات صحية</Text>
              <Text style={s.heroLine2}>لحياة افضل</Text>
              <View style={s.ctaBtn}>
                <Text style={s.ctaBtnTxt}>تسوق الان</Text>
              </View>

              
            </View>
          </View>

          {/* ③ Category type cards ───────────────────────────────── */}
          <View style={s.catRow}>
            <View style={s.catCard}>
              <View style={s.catTexts}>
                <Text style={s.catName}>جملة</Text>
                <Text style={[s.catDesc, {color: SUB1}]}>اسعار خاصة</Text>
              </View>
              <View style={s.catCircle} />
            </View>
            <View style={s.catCard}>
              <View style={s.catTexts}>
                <Text style={s.catName}>فردي</Text>
                <Text style={[s.catDesc, {color: SUB2}]}>للاستخدام اليومي</Text>
              </View>
              <View style={s.catCircle} />
            </View>
          </View>

          {/* ④ Filter chips ──────────────────────────────────────── */}
          <View style={s.chipsWrap}>
            <View style={s.chipsRow}>
              <View style={s.chip}>
                <Text style={s.chipTxt}>خالي من الجلوتين</Text>
              </View>
              <View style={s.chip}>
                <Text style={s.chipTxt}>عالي بروتين</Text>
              </View>
            </View>
            <View style={s.chipsRowCenter}>
              <View style={s.chip}>
                <Text style={s.chipTxt}>خالي من السكر</Text>
                <View style={s.sfWrap}>
                  <View style={s.sfRing} />
                  <Text style={s.sfTxt}>SF</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ⑤ Best-sellers header ───────────────────────────────── */}
          <View style={s.sectionHead}>
            <Text style={s.seeAllTxt}>عرض الكل</Text>
            <Text style={s.sectionTitleTxt}>الاكثر مبيعاً</Text>
          </View>

          {/* ⑥ Product cards ─────────────────────────────────────── */}
          <View style={s.productsWrap}>
            
            
            <View style={s.productsRow}>
              <View style={[s.prodCard, s.prodCardL]} />
              <View style={[s.prodCard, s.prodCardR]} />
            </View>
          </View>

          <View style={s.scrollPad} />
        </ScrollView>

        {/* ── Bottom nav ─────────────────────────────────────────── */}
        <View style={s.bottomNav}>
          {NAV_ITEMS.map((label, i) => (
            <View key={i} style={s.navItem}>
              <NavIconShape index={i} />
              <Text style={s.navLabel}>{label}</Text>
            </View>
          ))}
        </View>

      </View>
    </SafeAreaView>
  );
}

// ─── Nav icon placeholders ────────────────────────────────────────────────────
function NavIconShape({index}: {index: number}) {
  if (index === 4) {
    // Home — house shape
    return (
      <View style={ni.iconWrap}>
        <View style={ni.houseRoof} />
        <View style={ni.houseBody} />
      </View>
    );
  }
  if (index === 3) {
    // Cart
    return (
      <View style={ni.iconWrap}>
        <View style={ni.cartBox} />
      </View>
    );
  }
  if (index === 2) {
    // Heart
    return (
      <View style={ni.iconWrap}>
        <View style={ni.heart} />
      </View>
    );
  }
  if (index === 1) {
    // Grid (categories)
    return (
      <View style={ni.iconWrap}>
        <View style={ni.gridRow}>
          <View style={ni.gridDot} />
          <View style={ni.gridDot} />
        </View>
        <View style={ni.gridRow}>
          <View style={ni.gridDot} />
          <View style={ni.gridDot} />
        </View>
      </View>
    );
  }
  // User
  return (
    <View style={ni.iconWrap}>
      <View style={ni.userHead} />
      <View style={ni.userBody} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: STATUS_BG,
  },
  root: {
    flex: 1,
    backgroundColor: SCREEN_BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    backgroundColor: SCREEN_BG,
    paddingBottom: 20,
  },

  // ① Header ──────────────────────────────────────────────────
  header: {
    backgroundColor: STATUS_BG,
    paddingTop: 7,
    paddingBottom: 13,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 19,
    height: 37,
  },
  menuIcon: {
    width: 18,
    height: 14,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 18,
    height: 2,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
  menuLineShort: {
    width: 14,
  },
  pill: {
    flex: 1,
    marginHorizontal: 22,
    height: 37,
    backgroundColor: SEARCH_BG,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  pillSearchDot: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: 'rgba(101,98,98,0.8)',
    marginRight: 10,
    // marginLeft: 5,

  },
  pillPlaceholder: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.3)',
    textAlign: 'right',
    writingDirection: 'rtl',
    flex: 1,
    marginRight: 5,
  },
  cartBox: {
    width: 20,
    height: 21,
    borderWidth: 1.5,
    borderColor: '#000000',
    borderRadius: 3,
  },

  // ② Hero ────────────────────────────────────────────────────
  hero: {
    height: 143,
    backgroundColor: 'rgba(203,177,144,0.15)',
    overflow: 'hidden',
  },
  heroImgRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: W * 0.46,
    backgroundColor: 'rgba(196,154,108,0.2)',
  },
  heroTextBlock: {
    paddingLeft: 9,
    paddingTop: 49,
  },
  heroLine1: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: HERO_TXT1,
    writingDirection: 'rtl',
    textAlign: 'left',
    marginLeft: 50,
  },
  heroLine2: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: HERO_TXT2,
    writingDirection: 'rtl',
    marginTop: 2,
    textAlign: 'left',
    marginLeft: 60,
  },
  ctaBtn: {
    width: 61,
    height: 22,
    backgroundColor: CTA_BG,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 65,
  },
  ctaBtnTxt: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  // ③ Category cards ──────────────────────────────────────────
  catRow: {
    flexDirection: 'row',
    paddingLeft: 28,
    paddingRight: 23,
    justifyContent: 'space-between',
    marginTop: 28,
  },
  catCard: {
    width: 148,
    height: 67,
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 14,
    paddingLeft: 8,
    paddingRight: 5,
    justifyContent: 'space-between',
  },
  catTexts: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  catName: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  catDesc: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginTop: 4,
  },
  catCircle: {
    width: 44,
    height: 43,
    borderRadius: 22,
    backgroundColor: 'rgba(196,154,108,0.28)',
    flexShrink: 0,
  },

  // ④ Filter chips ────────────────────────────────────────────
  chipsWrap: {
    paddingLeft: 28,
    paddingRight: 23,
    marginTop: 32,
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipsRowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 26,
  },
  chip: {
    width: 148,
    height: 30,
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  chipTxt: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    fontWeight: '800',
    color: CHIP_COL,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  sfWrap: {
    position: 'absolute',
    right: 6,
    top: -2,
    width: 30,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sfRing: {
    position: 'absolute',
    width: 21,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(250,237,218,0.5)',
  },
  sfTxt: {
    fontFamily: 'Fustat-Regular',
    fontSize: 13,
    fontWeight: '400',
    color: '#000000',
  },

  // ⑤ Section header ──────────────────────────────────────────
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 28,
    paddingRight: 23,
    marginTop: 19,
    height: 45,
  },
  sectionTitleTxt: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: SEC_TITLE,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  seeAllTxt: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    fontWeight: '800',
    color: SEE_ALL,
  },

  // ⑥ Products ────────────────────────────────────────────────
  productsWrap: {
    marginTop: 15,
  },
  decorCircle: {
    position: 'absolute',
    left: 35,
    top: -32,
    width: 131,
    height: 161,
    borderRadius: 24,
    backgroundColor: 'rgba(196,154,108,0.15)',
  },
  productsRow: {
    flexDirection: 'row',
    paddingLeft: 28,
    paddingRight: 23,
    justifyContent: 'space-between',
  },
  prodCard: {
    height: 176,
    backgroundColor: CARD_BG,
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.2)',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  prodCardL: {
    width: 133,
    borderRadius: 20,
  },
  prodCardR: {
    width: 134,
    borderRadius: 16,
  },
  scrollPad: {
    height: 24,
  },

  // Bottom nav ─────────────────────────────────────────────────
  bottomNav: {
    height: 48,
    backgroundColor: NAV_BG,
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  navLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 2,
  },
});

// ─── Nav icon styles ──────────────────────────────────────────────────────────
const ni = StyleSheet.create({
  iconWrap: {
    width: 22,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Home
  houseRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 11,
    borderRightWidth: 11,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
  },
  houseBody: {
    width: 14,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  // Cart
  cartBox: {
    width: 16,
    height: 13,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    borderRadius: 2,
    marginTop: 3,
  },
  // Heart
  heart: {
    width: 18,
    height: 16,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#FFFFFF',
    transform: [{rotate: '45deg'}],
  },
  // Grid
  gridRow: {
    flexDirection: 'row',
    gap: 3,
    marginBottom: 3,
  },
  gridDot: {
    width: 7,
    height: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  // User
  userHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    marginBottom: 1,
  },
  userBody: {
    width: 16,
    height: 7,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: '#FFFFFF',
  },
});
