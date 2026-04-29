import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'; // Usando router do expo para o voltar
import React from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useCartStore } from './useCartStore';

const CartScreen = () => {
  // Pegamos os itens e a função de remover da loja
  const { items, removeItem } = useCartStore();

  // Cálculos dinâmicos
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const shipping = items.length > 0 ? 5.00 : 0;
  const taxes = subtotal * 0.08; // Exemplo de 8% de taxa
  const total = subtotal + shipping + taxes;

  // O renderItem agora fica aqui dentro
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.productImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>Size {item.size || 'M'}</Text>
      </View>

      <View style={styles.quantityContainer}>
        {/* Botão de remover/diminuir */}
        <TouchableOpacity 
          style={styles.qtyBtn} 
          onPress={() => removeItem(item.id)}
        >
          <Text style={styles.qtyText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.qtyNumber}>1</Text>
        
        <TouchableOpacity style={styles.qtyBtn}>
          <Text style={styles.qtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 24 }} /> 
      </View>

      {/* LISTA */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id + index}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Seu carrinho está vazio 🛒</Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.backToShop}>Voltar para a loja</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* FOOTER FINANCEIRO */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Shipping</Text>
            <Text style={styles.priceValue}>${shipping.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes</Text>
            <Text style={styles.priceValue}>${taxes.toFixed(2)}</Text>
          </View>
          
          <View style={[styles.priceRow, { marginTop: 15 }]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push("/product/shipping")}>
            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView> 
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    alignItems: 'center',
    marginTop: 40
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  listContent: { paddingHorizontal: 20, paddingBottom: 20 },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  productImage: { 
    width: 70, 
    height: 70, 
    borderRadius: 12, 
    backgroundColor: '#F5F5F5' 
  },
  itemDetails: { flex: 1, marginLeft: 15 },
  itemName: { fontSize: 16, fontWeight: '700' },
  itemSize: { color: 'gray', fontSize: 14, marginTop: 4 },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#E6E1F9',
    borderRadius: 25,
    paddingHorizontal: 10
  },
  qtyBtn: { 
    width: 30, height: 40, 
    justifyContent: 'center', alignItems: 'center' 
  },
  qtyText: { fontSize: 20, fontWeight: 'bold', color: '#6B4EFF' },
  qtyNumber: { marginHorizontal: 12, fontWeight: 'bold', fontSize: 16 },
  footer: { 
    padding: 25, 
    borderTopWidth: 1, 
    borderColor: '#F0F0F0',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // Sombra leve para o footer
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 10
  },
  priceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  priceLabel: { color: '#888', fontSize: 15 },
  priceValue: { fontWeight: '600', fontSize: 15 },
  totalText: { fontSize: 20, fontWeight: '800', color: '#1A1A1A' },
  checkoutBtn: { 
    backgroundColor: '#D7C4F2', 
    padding: 20, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 25 
  },
  checkoutBtnText: { fontWeight: '800', fontSize: 16, color: '#4A306D' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 18, color: '#888' },
  backToShop: { color: '#6B4EFF', fontWeight: 'bold', marginTop: 10 }
});