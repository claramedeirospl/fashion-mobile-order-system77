import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
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

export default function PaymentScreen() {
  const [selectedMethod, setSelectedMethod] = useState('visa');

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Method</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Accepted Payment Methods</Text>
        
        {/* MÉTODOS DE CARTÃO */}
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
        
        {/* CAMPOS DE DETALHES DO CARTÃO */}
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

        {/* WALLETS DIGITAIS */}
        <TouchableOpacity style={styles.walletItem}>
          <Ionicons name="logo-apple" size={24} color="white" />
          <Text style={styles.methodLabel}>Apple Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.walletItem}>
          <Ionicons name="logo-google" size={24} color="white" />
          <Text style={styles.methodLabel}>Google Pay</Text>
        </TouchableOpacity>

        {/* BOTÃO DE SALVAR */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Payment Method</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Fundo Dark conforme imagem
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
  },
  methodsContainer: {
    gap: 12,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeMethod: {
    borderColor: '#3b82f6', // Borda azul ao selecionar
    backgroundColor: '#1e293b',
  },
  walletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  methodLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputFull: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 18,
    color: 'white',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  inputHalf: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 18,
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#3b82f6', // Azul vibrante do botão
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});