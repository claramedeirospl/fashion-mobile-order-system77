import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router'; // Importado Stack para esconder o header
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useCartStore } from '../(tabs)/useCartStore';

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('visa');
  
  // Pega a função de salvar o pagamento da sua Store
  const setPaymentMethod = useCartStore((state) => state.setPaymentMethod);

  const handleSavePayment = () => {
    // 1. Salva o método selecionado na Store Global
    setPaymentMethod(selectedMethod);
    
    // 2. Volta para a tela de Shipping (que já estará lendo o valor atualizado)
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Esconde o header branco padrão do Expo Router */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER PERSONALIZADO */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Accepted Payment Methods</Text>
        
        <View style={styles.methodsContainer}>
          <TouchableOpacity 
            style={[styles.methodItem, selectedMethod === 'visa' && styles.activeMethod]}
            onPress={() => setSelectedMethod('visa')}
          >
            <MaterialCommunityIcons name="credit-card-outline" size={24} color="white" />
            <Text style={styles.methodLabel}>Visa</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.methodItem, selectedMethod === 'mastercard' && styles.activeMethod]}
            onPress={() => setSelectedMethod('mastercard')}
          >
            <MaterialCommunityIcons name="credit-card-outline" size={24} color="white" />
            <Text style={styles.methodLabel}>Mastercard</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.methodItem, selectedMethod === 'amex' && styles.activeMethod]}
            onPress={() => setSelectedMethod('amex')}
          >
            <MaterialCommunityIcons name="credit-card-outline" size={24} color="white" />
            <Text style={styles.methodLabel}>American Express</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Card Details</Text>
        
        <View style={styles.inputGroup}>
          <TextInput 
            style={styles.inputFull} 
            placeholder="Card Number" 
            placeholderTextColor="#64748b" 
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <TextInput 
            style={[styles.inputHalf, { marginRight: 10 }]} 
            placeholder="Expiration Date" 
            placeholderTextColor="#64748b" 
          />
          <TextInput 
            style={styles.inputHalf} 
            placeholder="CVV" 
            placeholderTextColor="#64748b" 
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        <Text style={styles.sectionTitle}>Digital Wallets</Text>

        <TouchableOpacity 
          style={[styles.walletItem, selectedMethod === 'apple-pay' && styles.activeMethod]}
          onPress={() => setSelectedMethod('apple-pay')}
        >
          <Ionicons name="logo-apple" size={24} color="white" />
          <Text style={styles.methodLabel}>Apple Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.walletItem, selectedMethod === 'google-pay' && styles.activeMethod]}
          onPress={() => setSelectedMethod('google-pay')}
        >
          <Ionicons name="logo-google" size={24} color="white" />
          <Text style={styles.methodLabel}>Google Pay</Text>
        </TouchableOpacity>

        {/* BOTÃO DE SALVAR ATUALIZADO */}
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSavePayment}
        >
          <Text style={styles.saveButtonText}>Save Payment Method</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// ... styles permanecem os mesmos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
  scrollContent: { padding: 20 },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
  methodsContainer: { gap: 12 },
  methodItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: 'transparent' },
  activeMethod: { borderColor: '#3b82f6', backgroundColor: '#1e293b' },
  walletItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: 'transparent' },
  methodLabel: { color: 'white', fontSize: 16, marginLeft: 15 },
  inputGroup: { marginBottom: 15 },
  inputFull: { backgroundColor: '#1e293b', borderRadius: 12, padding: 18, color: 'white', fontSize: 16 },
  row: { flexDirection: 'row', marginBottom: 25 },
  inputHalf: { flex: 1, backgroundColor: '#1e293b', borderRadius: 12, padding: 18, color: 'white', fontSize: 16 },
  saveButton: { backgroundColor: '#3b82f6', padding: 20, borderRadius: 15, alignItems: 'center', marginTop: 20, marginBottom: 40 },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});