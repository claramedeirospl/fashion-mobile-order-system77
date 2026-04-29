import { Ionicons } from '@expo/vector-icons';
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

export default function ShippingScreen() {
  const [shippingMethod, setShippingMethod] = useState('standard');

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* FORMULÁRIO */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Enter your full name" placeholderTextColor="#A0AEC0" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput style={styles.input} placeholder="Enter your address" placeholderTextColor="#A0AEC0" />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} placeholder="City" placeholderTextColor="#A0AEC0" />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>State/Province</Text>
            <TextInput style={styles.input} placeholder="State" placeholderTextColor="#A0AEC0" />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Zip/Postal Code</Text>
            <TextInput style={styles.input} placeholder="Zip Code" placeholderTextColor="#A0AEC0" keyboardType="numeric" />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} placeholder="Phone" placeholderTextColor="#A0AEC0" keyboardType="phone-pad" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Shipping Method</Text>

        {/* SHIPPING METHODS */}
        <TouchableOpacity 
          style={[styles.methodCard, shippingMethod === 'standard' && styles.methodCardActive]} 
          onPress={() => setShippingMethod('standard')}
        >
          <View>
            <Text style={styles.methodTitle}>Standard (5-7 days)</Text>
            <Text style={styles.methodPrice}>Free</Text>
          </View>
          <View style={styles.radioOuter}>
            {shippingMethod === 'standard' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.methodCard, shippingMethod === 'express' && styles.methodCardActive]} 
          onPress={() => setShippingMethod('express')}
        >
          <View>
            <Text style={styles.methodTitle}>Express (2-3 days)</Text>
            <Text style={styles.methodPrice}>$10</Text>
          </View>
          <View style={styles.radioOuter}>
            {shippingMethod === 'express' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        {/* BOTÃO FINAL */}
        <TouchableOpacity style={styles.continueButton} onPress={() => router.push('../payment')}>
          <Text style={styles.continueText}>Continue to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Azul bem escuro do seu Figma
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#D7C4F2', // Cabeçalho lilás igual ao print
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#0F172A',
  },
  row: {
    flexDirection: 'row',
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  methodCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
  },
  methodCardActive: {
    borderColor: '#D7C4F2',
    backgroundColor: '#1E293B',
  },
  methodTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  methodPrice: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 4,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D7C4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D7C4F2',
  },
  continueButton: {
    backgroundColor: '#D7C4F2',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  continueText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: 'bold',
  },
});