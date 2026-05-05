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
const CARD_BG = '#FFFAF1';
const CARD_BORDER = 'rgba(0,0,0,0.20)';
const SEARCH_BG = '#FFFAF1';
const DELETE_BG = '#5D3F25';
const EDIT_BG = '#F2E4D7';

const DUMMY_PRODUCTS = [
  {id: 1, name: 'زيت الزيتون الطبيعي', price: '45 شيكل', stock: 20},
  {id: 2, name: 'عسل طبيعي أصيل', price: '60 شيكل', stock: 15},
  {id: 3, name: 'بذور الكتان العضوية', price: '25 شيكل', stock: 50},
  {id: 4, name: 'شاي الأعشاب المخلوط', price: '30 شيكل', stock: 35},
];

export default function AdminProductsScreen() {
  const [search, setSearch] = useState('');

  const filtered = DUMMY_PRODUCTS.filter(p =>
    p.name.includes(search),
  );

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerRight}>
          {/* Menu icon placeholder */}
          <View style={styles.menuIcon} />
          <Text style={styles.headerTitle}>المنتجات</Text>
        </View>
        <View style={styles.headerActions}>
          {/* Add product icon */}
          <Pressable style={styles.iconBtn}>
            <View style={[styles.actionIcon, {backgroundColor: '#5D3F25'}]} />
          </Pressable>
          {/* Filter icon */}
          <Pressable style={styles.iconBtn}>
            <View style={[styles.actionIcon, {backgroundColor: '#5D3F25'}]} />
          </Pressable>
        </View>
      </View>

      {/* ── Search bar ── */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="ابحث عن منتج ..."
          placeholderTextColor="rgba(74,51,33,0.40)"
          textAlign="right"
          textContentType="none"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>

        {filtered.map(product => (
          <View key={product.id} style={styles.productCard}>
            {/* Product image placeholder */}
            <View style={styles.productImagePlaceholder} />

            {/* Product info */}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              <Text style={styles.productStock}>المخزون: {product.stock}</Text>
            </View>

            {/* Action buttons */}
            <View style={styles.actionButtons}>
              <Pressable style={styles.editBtn}>
                <Text style={styles.editBtnText}>تعديل</Text>
              </Pressable>
              <Pressable style={styles.deleteBtn}>
                <Text style={styles.deleteBtnText}>حذف</Text>
              </Pressable>
            </View>
          </View>
        ))}

      </ScrollView>

      {/* ── Bottom nav ── */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>الرئيسية</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: '#5D3F25'}]} />
          <Text style={[styles.navLabel, styles.navLabelActive]}>المنتجات</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>المستخدمين</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
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
    paddingHorizontal: 31,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 14,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    padding: 4,
  },
  actionIcon: {
    width: 20,
    height: 20,
    borderRadius: 3,
  },

  // Search
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 31,
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
    width: 20,
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

  // Product card
  productCard: {
    backgroundColor: CARD_BG,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: CARD_BORDER,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    minHeight: 124,
    gap: 10,
  },
  productImagePlaceholder: {
    width: 70,
    height: 90,
    backgroundColor: '#E8D8C4',
    borderRadius: 16,
  },
  productInfo: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 4,
  },
  productName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  productPrice: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  productStock: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    fontWeight: '400',
    color: 'rgba(0,0,0,0.6)',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  actionButtons: {
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
  },
  editBtn: {
    backgroundColor: EDIT_BG,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: 98,
    alignItems: 'center',
  },
  editBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  deleteBtn: {
    backgroundColor: DELETE_BG,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: 98,
    alignItems: 'center',
  },
  deleteBtnText: {
    fontFamily: 'Inter-Bold',
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
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
