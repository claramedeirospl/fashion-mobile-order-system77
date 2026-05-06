import { MaterialCommunityIcons } from '@expo/vector-icons'; // Faltava este import
import { router } from "expo-router";
import {
  SafeAreaView, // Faltava este import
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useCartStore } from './useCartStore';

export default function CheckoutReview() {
  const { items, paymentMethod } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const shippingFee = 10.00;
  const total = subtotal + shippingFee;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Review your order</Text>

        {/* ENDEREÇO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <Text style={styles.text}>Rua Exemplo, 123 - São Paulo, SP</Text>
        </View>

        {/* PAGAMENTO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.paymentRow}>
             <MaterialCommunityIcons name="credit-card" size={20} color="white" />
             <Text style={styles.text}> {paymentMethod?.toUpperCase()}</Text>
          </View>
        </View>

        {/* ITENS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {items.map(item => (
            <View key={item.id} style={styles.itemRow}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>${item.price.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* TOTAIS */}
        <View style={styles.totalContainer}>
           <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
           </View>
           <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Shipping</Text>
              <Text style={styles.totalValue}>${shippingFee.toFixed(2)}</Text>
           </View>
           <View style={[styles.totalRow, styles.finalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>${total.toFixed(2)}</Text>
           </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={() => router.push('/(tabs)/OrderConfirmation')}>
          <Text style={styles.confirmButtonText}>Place Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// O OBJETO DE ESTILOS QUE FALTAVA:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D131F', // Fundo escuro do seu projeto
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 10,
  },
  section: {
    backgroundColor: '#1E293B',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    color: '#94A3B8',
    fontSize: 16,
  },
  totalValue: {
    color: 'white',
    fontSize: 16,
  },
  finalRow: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 15,
    marginTop: 10,
  },
  totalText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#D7C4F2', // Lilás do seu Figma
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  confirmButtonText: {
    color: '#4A306D',
    fontSize: 18,
    fontWeight: 'bold',
  },
});