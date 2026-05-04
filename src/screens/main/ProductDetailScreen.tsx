import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const BROWN_DARK  = '#392413';
const BROWN_MID   = '#48321D';
const BROWN_BTN   = '#97795A';
const CREAM_BG    = '#FBFCF8';
const QTY_BG      = '#EEE5DE';
const STAR_COLOR  = '#D6B155';
const TEXT_CREAM  = '#E8D8C9';
const TITLE_BROWN = '#503520';

const DUMMY_PRODUCTS = [
  {id: '1', name: 'بروتين بار', tag: 'عالي بروتين', rating: 200, stars: 5},
];

export default function ProductDetailScreen() {
  const [qty, setQty] = useState(1);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={s.safe}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>

        {/* ── Product image placeholder ── */}
        <View style={s.imageArea} />

        {/* ── Bottom info card ── */}
        <LinearGradient
          colors={['#B69C83', '#E8D8C9']}
          locations={[0, 0.245]}
          style={s.card}>

          {/* Name + tag */}
          <View style={s.nameRow}>
            <View style={s.tagChip}>
              <Text style={s.tagText}>عالي بروتين</Text>
            </View>
            <Text style={s.productName}>بروتين بار</Text>
          </View>

          {/* Stars + rating count */}
          <View style={s.starsRow}>
            <Text style={s.ratingText}>(200) تقييم)</Text>
            <View style={s.starsGroup}>
              {[1, 2, 3, 4, 5].map(i => (
                <View key={i} style={s.star} />
              ))}
            </View>
          </View>

          {/* Divider */}
          <View style={s.divider} />

          {/* Description section */}
          <Text style={s.sectionTitle}>الوصف</Text>
          <Text style={s.descText}>
            {'بروتين بار الشوكولاتة : مناسب للرياضين 25غم بروتين , القطعة250 كالوري خالي من الدهون المهدرجة لمن يعاني من الامراض المزمنة مثل الكوليسترول'}
          </Text>

          {/* Feature badges */}
          <View style={s.badgesRow}>
            <View style={s.badge}>
              <View style={s.badgeIconPlaceholder} />
              <Text style={s.badgeText}>خالي من لجلوتين</Text>
            </View>
            <View style={s.badge}>
              <View style={s.badgeIconPlaceholder} />
              <Text style={s.badgeText}>عالي بروتين</Text>
            </View>
          </View>

          {/* Quantity stepper */}
          <View style={s.qtyRow}>
            <Pressable
              style={s.qtyBtn}
              onPress={() => setQty(q => Math.max(1, q - 1))}>
              <Text style={s.qtyBtnText}>−</Text>
            </Pressable>
            <View style={s.qtyDisplay}>
              <Text style={s.qtyText}>{qty}</Text>
            </View>
            <Pressable style={s.qtyBtn} onPress={() => setQty(q => q + 1)}>
              {/* Plus icon */}
              <View style={s.plusIcon} />
            </Pressable>
          </View>

          {/* Action row: wishlist + add to cart */}
          <View style={s.actionRow}>
            {/* Wishlist button */}
            <Pressable style={s.wishlistBtn}>
              <View style={s.wishlistIcon} />
            </Pressable>

            {/* Add to cart */}
            <Pressable style={s.addToCartBtn}>
              <Text style={s.addToCartText}>اضف الى السلة</Text>
            </Pressable>
          </View>

        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: CREAM_BG,
  },

  // ── Product image ─────────────────────────────────────────────
  imageArea: {
    width: '100%',
    height: 356,
    backgroundColor: 'rgba(150,107,60,0.10)',
  },

  // ── Info card ─────────────────────────────────────────────────
  card: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  // Name row
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  tagChip: {
    backgroundColor: BROWN_BTN,
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 12,
  },
  tagText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  productName: {
    fontFamily: 'Calistoga-Regular',
    fontSize: 24,
    color: BROWN_DARK,
    textAlign: 'right',
    writingDirection: 'rtl',
  },

  // Stars row
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
    opacity: 0.9,
  },
  ratingText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    color: BROWN_DARK,
    marginRight: 8,
  },
  starsGroup: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    width: 14,
    height: 12,
    backgroundColor: STAR_COLOR,
    borderRadius: 2,
    opacity: 0.9,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: 'rgba(230,214,198,0.8)',
    marginBottom: 16,
  },

  // Description
  sectionTitle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 20,
    color: TITLE_BROWN,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 10,
  },
  descText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 12,
    color: BROWN_DARK,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 20,
    marginBottom: 24,
    opacity: 0.8,
  },

  // Feature badges
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 40,
    marginBottom: 20,
  },
  badge: {
    alignItems: 'center',
    gap: 6,
  },
  badgeIconPlaceholder: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(150,107,60,0.15)',
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 10,
    color: BROWN_DARK,
    textAlign: 'right',
    writingDirection: 'rtl',
  },

  // Quantity stepper
  qtyRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
  },
  qtyBtn: {
    width: 31,
    height: 26,
    backgroundColor: QTY_BG,
    borderWidth: 0.2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: BROWN_MID,
    lineHeight: 22,
  },
  plusIcon: {
    width: 12,
    height: 12,
    backgroundColor: BROWN_MID,
    borderRadius: 1,
  },
  qtyDisplay: {
    width: 31,
    height: 26,
    backgroundColor: QTY_BG,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: BROWN_MID,
    textAlign: 'right',
  },

  // Action row
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wishlistBtn: {
    width: 43,
    height: 42,
    backgroundColor: BROWN_MID,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistIcon: {
    width: 23,
    height: 21,
    backgroundColor: TEXT_CREAM,
    borderRadius: 3,
  },
  addToCartBtn: {
    flex: 1,
    height: 42,
    backgroundColor: BROWN_MID,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: TEXT_CREAM,
    textAlign: 'center',
  },
});
