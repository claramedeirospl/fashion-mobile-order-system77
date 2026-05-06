import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from './useCartStore'; // Ajuste o caminho

const COLORS = {
  bgDark: '#0D131F',
  cardDark: '#1E293B',
  lavender: '#D7C4F2',
  textWhite: '#FFFFFF',
  textGray: '#94A3B8',
  purpleDark: '#4A306D'
};

export default function OrderConfirmation() {
  const items = useCartStore((state) => state.items);

  const paymentMethod = useCartStore(
    (state) => state.paymentMethod
  );

  const shippingAddress = useCartStore(
    (state) => state.shippingAddress
  );

 const clearCart = useCartStore(
  (state) => state.clearCart
);

  const safeItems = Array.isArray(items)
    ? items
    : [];

  const subtotal = safeItems.reduce(
    (acc, item) => acc + (item?.price || 0),
    0
  );

  const shippingFee = 5.0;

  const total = subtotal + shippingFee;
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Placed</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.successContainer}>
          <Text style={styles.thanksText}>Thank you for your order!</Text>
          <Text style={styles.orderNumber}>Your order #123456789 has been placed and is on its way.</Text>
        </View>

        {/* INFORMAÇÕES REAIS DO PEDIDO */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>Estimated Delivery</Text>
          <Text style={styles.value}>June 15 - June 18</Text>
        </View>

        <Text style={styles.value}>
          {shippingAddress.fullName}
        </Text>

        <Text style={styles.value}>
          {shippingAddress.address}
        </Text>

        <Text style={styles.value}>
          {shippingAddress.city}, {shippingAddress.state}
        </Text>

        <Text style={styles.value}>
          {shippingAddress.zipCode}
        </Text>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>{paymentMethod} ....1234</Text>
        </View>

        <Text style={styles.sectionTitle}>Order Summary</Text>
        {items.map((item) => (
          <View key={`${item.id}`} style={styles.productItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productSize}>Size {item.size || 'M'}</Text>
            </View>
          </View>
        ))}

        {/* TOTAIS CALCULADOS */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, { marginTop: 10 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

  <TouchableOpacity
  style={styles.primaryButton}
  onPress={() => {
    useCartStore.setState({
      items: [],
      paymentMethod: 'Not Selected',
      shippingAddress: {
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      },
    });

    router.replace('/home');
  }}
>
  <Text style={styles.primaryButtonText}>
    Continue Shopping
  </Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>View Order Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bgDark },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  successContainer: { alignItems: 'center', marginBottom: 30 },
  thanksText: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  orderNumber: { color: COLORS.textGray, textAlign: 'center', marginTop: 10, fontSize: 14 },
  infoSection: { marginBottom: 20 },
  label: { color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  value: { color: COLORS.textGray, fontSize: 14 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  productItem: { flexDirection: 'row', backgroundColor: COLORS.cardDark, borderRadius: 12, padding: 10, marginBottom: 10 },
  productImage: { width: 60, height: 60, borderRadius: 8 },
  productDetails: { marginLeft: 15, justifyContent: 'center' },
  productName: { color: 'white', fontWeight: 'bold' },
  productSize: { color: COLORS.textGray, fontSize: 12 },
  summaryContainer: { marginTop: 20, borderTopWidth: 1, borderTopColor: COLORS.cardDark, paddingTop: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { color: COLORS.textGray, fontSize: 16 },
  summaryValue: { color: 'white', fontSize: 16 },
  totalLabel: { color: COLORS.textGray, fontSize: 18, fontWeight: 'bold' },
  totalValue: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  primaryButton: { backgroundColor: COLORS.lavender, padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 30 },
  primaryButtonText: { color: COLORS.purpleDark, fontWeight: 'bold', fontSize: 16 },
  secondaryButton: { padding: 18, borderRadius: 12, alignItems: 'center', marginTop: 10, backgroundColor: 'rgba(215, 196, 242, 0.2)' },
  secondaryButtonText: { color: COLORS.lavender, fontWeight: 'bold', fontSize: 16 }
});