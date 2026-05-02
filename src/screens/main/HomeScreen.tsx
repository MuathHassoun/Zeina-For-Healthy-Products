import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useCartStore } from '../../store/useCartStore';

const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Vitamin C Serum',
    description: 'Brighten skin and support immunity.',
    price: 19.99,
    quantity: 1,
  },
  {
    id: 'prod-2',
    name: 'Herbal Tea Blend',
    description: 'Calming immune and digestion support.',
    price: 12.5,
    quantity: 1,
  },
  {
    id: 'prod-3',
    name: 'Natural Supplements Pack',
    description: 'Daily wellness essentials.',
    price: 29.9,
    quantity: 1,
  },
];

export const HomeScreen = () => {
  const addItem = useCartStore((state) => state.addItem);
  const itemCount = useCartStore((state) => state.itemCount());

  const renderProduct = ({ item }: { item: typeof PRODUCTS[number] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Text style={styles.productDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addItem(item)}
      >
        <Text style={styles.addButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Products</Text>
      <Text style={styles.subheading}>{itemCount} item(s) in cart</Text>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  heading: { fontSize: 28, fontWeight: '700', color: '#111827', marginTop: 20, marginHorizontal: 18 },
  subheading: { fontSize: 15, color: '#6B7280', marginTop: 6, marginHorizontal: 18 },
  list: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 32 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  productName: { fontSize: 17, fontWeight: '700', color: '#111827' },
  productPrice: { fontSize: 15, fontWeight: '700', color: '#6B46C1' },
  productDescription: { color: '#4B5563', fontSize: 14, marginBottom: 14 },
  addButton: { backgroundColor: '#6B46C1', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
});
