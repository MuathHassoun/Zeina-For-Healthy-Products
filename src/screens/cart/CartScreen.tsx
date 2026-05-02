import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';

export const CartScreen = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalAmount = useCartStore((state) => state.totalAmount());
  const itemCount = useCartStore((state) => state.itemCount());
  const { isGuest, promptSignIn } = useAuthStore();

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Cart is empty', 'Please add products before checking out.');
      return;
    }

    if (isGuest) {
      Alert.alert(
        'Sign in required',
        'You must sign in or register before placing an order.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Continue', onPress: promptSignIn },
        ],
      );
      return;
    }

    Alert.alert('Checkout', 'Checkout flow is not implemented yet.');
  };

  const renderItem = ({ item }: { item: typeof items[number] }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <Text style={styles.itemDescription}>Qty: {item.quantity}</Text>
      <View style={styles.itemActions}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
        >
          <Text style={styles.quantityText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>{itemCount} item(s)</Text>
      </View>
      {items.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Your cart is empty. Add products from the Home screen.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>{isGuest ? 'Sign in to checkout' : 'Proceed to checkout'}</Text>
        </TouchableOpacity>
        {items.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
            <Text style={styles.clearText}>Clear cart</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { paddingHorizontal: 18, paddingTop: 24, paddingBottom: 12 },
  title: { fontSize: 26, fontWeight: '700', color: '#111827' },
  subtitle: { color: '#6B7280', marginTop: 4 },
  emptyCard: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 26 },
  emptyText: { color: '#6B7280', fontSize: 16, textAlign: 'center' },
  list: { paddingHorizontal: 18, paddingBottom: 24 },
  itemCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18, marginBottom: 14, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  itemName: { fontSize: 17, fontWeight: '700', color: '#111827' },
  itemPrice: { color: '#6B46C1', fontWeight: '700' },
  itemDescription: { color: '#6B7280', marginBottom: 14 },
  itemActions: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#EDE9FE', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  quantityText: { fontSize: 22, color: '#6B46C1' },
  removeButton: { marginLeft: 12, justifyContent: 'center' },
  removeText: { color: '#EF4444', fontWeight: '600' },
  footer: { paddingHorizontal: 18, paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#E5E7EB', backgroundColor: '#FFFFFF' },
  totalText: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 14 },
  checkoutButton: { backgroundColor: '#6B46C1', borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  checkoutText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  clearButton: { marginTop: 12, paddingVertical: 14, alignItems: 'center' },
  clearText: { color: '#6B46C1', fontSize: 15, fontWeight: '600' },
});
