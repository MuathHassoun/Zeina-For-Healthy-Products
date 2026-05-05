import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
const INPUT_BG = '#FFFAF1';
const INPUT_BORDER = 'rgba(0,0,0,0.20)';
const UPLOAD_BG = '#EDDDC8';

const CATEGORIES = ['خضروات', 'فواكه', 'مكسرات', 'زيوت', 'أعشاب'];

export default function AdminAddProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

        {/* ── Header ── */}
        <View style={styles.header}>
          {/* Back arrow placeholder */}
          <Pressable style={styles.backBtn}>
            <View style={styles.backIcon} />
          </Pressable>
          <Text style={styles.headerTitle}>اضافة منتج</Text>
          {/* Add icon */}
          <View style={styles.addIconPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">

          {/* ── Upload image area ── */}
          <Pressable style={styles.uploadArea}>
            {/* Upload icon placeholder */}
            <View style={styles.uploadIcon} />
            <Text style={styles.uploadText}>Upload Image</Text>
          </Pressable>

          {/* ── Form fields ── */}

          {/* Product name */}
          <Text style={styles.fieldLabel}>اسم المنتج</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="اضف اسم المنتج"
              placeholderTextColor="rgba(74,51,33,0.50)"
              textAlign="right"
              writingDirection="rtl"
            />
          </View>

          {/* Product price */}
          <Text style={styles.fieldLabel}>سعر المنتج</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="اضف سعر"
              placeholderTextColor="rgba(74,51,33,0.50)"
              keyboardType="numeric"
              textAlign="right"
              writingDirection="rtl"
            />
          </View>

          {/* Stock */}
          <Text style={styles.fieldLabel}>المخزون</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={stock}
              onChangeText={setStock}
              placeholder="اضف المخزون"
              placeholderTextColor="rgba(74,51,33,0.50)"
              keyboardType="numeric"
              textAlign="right"
              writingDirection="rtl"
            />
          </View>

          {/* Category */}
          <Text style={styles.fieldLabel}>التصنيف</Text>
          <Pressable
            style={styles.inputWrapper}
            onPress={() => setShowCategories(v => !v)}>
            <View style={styles.dropdownRow}>
              <View style={styles.dropdownChevron} />
              <Text
                style={[
                  styles.input,
                  styles.dropdownText,
                  !category && styles.placeholder,
                ]}>
                {category || 'اضف التصنيف'}
              </Text>
            </View>
          </Pressable>
          {showCategories && (
            <View style={styles.categoriesDropdown}>
              {CATEGORIES.map(cat => (
                <Pressable
                  key={cat}
                  style={styles.categoryItem}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategories(false);
                  }}>
                  <Text style={styles.categoryItemText}>{cat}</Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* Description */}
          <Text style={styles.fieldLabel}>الوصف</Text>
          <View style={[styles.inputWrapper, styles.textareaWrapper]}>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={description}
              onChangeText={setDescription}
              placeholder="اضف وصف المنتج"
              placeholderTextColor="rgba(74,51,33,0.50)"
              textAlign="right"
              writingDirection="rtl"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Bottom nav ── */}
      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
          <Text style={styles.navLabel}>الرئيسية</Text>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={[styles.navIcon, {backgroundColor: BRAND_BROWN}]} />
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
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    gap: 0,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: SCREEN_BG,
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
  headerTitle: {
    fontFamily: 'Fustat-ExtraBold',
    fontSize: 24,
    fontWeight: '800',
    color: BRAND_BROWN,
    writingDirection: 'rtl',
  },
  addIconPlaceholder: {
    width: 20,
    height: 20,
    backgroundColor: '#5D3F25',
    borderRadius: 3,
    opacity: 0.79,
  },

  // Upload area
  uploadArea: {
    backgroundColor: UPLOAD_BG,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 151,
    marginTop: 24,
    marginBottom: 24,
    gap: 10,
  },
  uploadIcon: {
    width: 66,
    height: 66,
    backgroundColor: '#C4A882',
    borderRadius: 12,
  },
  uploadText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: BRAND_BROWN,
    textAlign: 'center',
  },

  // Fields
  fieldLabel: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: BRAND_BROWN,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 6,
    marginTop: 14,
  },
  inputWrapper: {
    backgroundColor: INPUT_BG,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: INPUT_BORDER,
    height: 36,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 15,
    fontWeight: '800',
    color: BRAND_BROWN,
    textAlign: 'right',
    writingDirection: 'rtl',
    flex: 1,
  },
  placeholder: {
    opacity: 0.5,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  dropdownChevron: {
    width: 13,
    height: 8,
    backgroundColor: '#604B3A',
    borderRadius: 2,
    opacity: 0.8,
  },
  dropdownText: {
    flex: 1,
    height: 36,
    paddingTop: 10,
  },
  categoriesDropdown: {
    backgroundColor: INPUT_BG,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: INPUT_BORDER,
    marginTop: 2,
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: INPUT_BORDER,
  },
  categoryItemText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: BRAND_BROWN,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  textareaWrapper: {
    height: 122,
    alignItems: 'flex-start',
    paddingTop: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
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
