import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCartStore } from '../(tabs)/useCartStore';

const COLORS = {
  bgDark: '#0D131F',
  cardDark: '#1E293B',
  lavender: '#D7C4F2',
  textWhite: '#FFFFFF',
  textGray: '#94A3B8',
  textInputPlaceholder: '#64748B',
  borderDark: '#334155',
};

export default function ShippingScreen() {
  const shippingAddress = useCartStore(
    (state) => state.shippingAddress
  );

  const paymentMethod = useCartStore(
    (state) => state.paymentMethod
  );

  const updateShippingAddress = useCartStore(
    (state) => state.updateShippingAddress
  );

  const [shippingMethod, setShippingMethod] =
    useState('standard');

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS.textWhite}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Shipping
        </Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* FULL NAME */}
        <Text style={styles.sectionTitle}>
          Full Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor={
            COLORS.textInputPlaceholder
          }
          value={shippingAddress.fullName}
          onChangeText={(text) =>
            updateShippingAddress({
              fullName: text,
            })
          }
        />

        {/* ADDRESS */}
        <Text style={styles.sectionTitle}>
          Address
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          placeholderTextColor={
            COLORS.textInputPlaceholder
          }
          value={shippingAddress.address}
          onChangeText={(text) =>
            updateShippingAddress({
              address: text,
            })
          }
        />

        {/* CITY */}
        <Text style={styles.sectionTitle}>
          City
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          placeholderTextColor={
            COLORS.textInputPlaceholder
          }
          value={shippingAddress.city}
          onChangeText={(text) =>
            updateShippingAddress({
              city: text,
            })
          }
        />

        {/* STATE */}
        <Text style={styles.sectionTitle}>
          State/Province
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your state/province"
          placeholderTextColor={
            COLORS.textInputPlaceholder
          }
          value={shippingAddress.state}
          onChangeText={(text) =>
            updateShippingAddress({
              state: text,
            })
          }
        />

        {/* ZIP CODE */}
        <Text style={styles.sectionTitle}>
          Zip/Postal Code
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your zip/postal code"
          placeholderTextColor={
            COLORS.textInputPlaceholder
          }
          value={shippingAddress.zipCode}
          onChangeText={(text) =>
            updateShippingAddress({
              zipCode: text,
            })
          }
        />

        {/* PHONE */}
        <Text style={styles.sectionTitle}>
          Phone Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor={
            COLORS.textInputPlaceholder
          }
        />

        {/* SHIPPING METHOD */}
        <Text style={styles.sectionTitle}>
          Shipping Method
        </Text>

        <TouchableOpacity
          style={[
            styles.methodItem,
            shippingMethod === 'standard' &&
              styles.activeMethod,
          ]}
          onPress={() =>
            setShippingMethod('standard')
          }
        >
          <View>
            <Text style={styles.methodTitle}>
              Standard (5-7 days)
            </Text>

            <Text style={styles.methodSubtitle}>
              Free
            </Text>
          </View>

          <View
            style={[
              styles.radioOuter,
              shippingMethod ===
                'standard' &&
                styles.radioOuterActive,
            ]}
          >
            {shippingMethod ===
              'standard' && (
              <View style={styles.radioInner} />
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.methodItem,
            shippingMethod === 'express' &&
              styles.activeMethod,
          ]}
          onPress={() =>
            setShippingMethod('express')
          }
        >
          <View>
            <Text style={styles.methodTitle}>
              Express (2-3 days)
            </Text>

            <Text style={styles.methodSubtitle}>
              $10
            </Text>
          </View>

          <View
            style={[
              styles.radioOuter,
              shippingMethod ===
                'express' &&
                styles.radioOuterActive,
            ]}
          >
            {shippingMethod ===
              'express' && (
              <View style={styles.radioInner} />
            )}
          </View>
        </TouchableOpacity>

        {/* PAYMENT */}
        <Text style={styles.sectionTitle}>
          Selected Payment Method
        </Text>

        <View style={styles.paymentSummary}>
          <Text style={styles.paymentText}>
            Method: {paymentMethod}
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push('/product/payment')
            }
          >
            <Text style={styles.changeText}>
              Change
            </Text>
          </TouchableOpacity>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() =>
            router.push(
              '/(tabs)/OrderConfirmation'
            )
          }
        >
          <Text style={styles.saveButtonText}>
            Continue to Payment
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/')}
        >
          <Ionicons
            name="home-outline"
            size={24}
            color="#4A306D"
          />

          <Text style={styles.navText}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
        >
          <Ionicons
            name="list-outline"
            size={24}
            color="#4A306D"
          />

          <Text style={styles.navText}>
            Categories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/cart')}
        >
          <Ionicons
            name="cart-outline"
            size={24}
            color="#4A306D"
          />

          <Text style={styles.navText}>
            Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color="#4A306D"
          />

          <Text style={styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D131F',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 160,
  },

  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },

  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 8,
  },

  activeMethod: {
    borderColor: '#D7C4F2',
  },

  methodTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  methodSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 2,
  },

  paymentSummary: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  paymentText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  changeText: {
    color: '#D7C4F2',
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: '#D7C4F2',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  saveButtonText: {
    color: '#4A306D',
    fontSize: 18,
    fontWeight: 'bold',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#D7C4F2',
    paddingVertical: 12,
    paddingBottom: 22,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  navItem: {
    alignItems: 'center',
    flex: 1,
  },

  navText: {
    color: '#4A306D',
    fontSize: 11,
    marginTop: 3,
    fontWeight: '500',
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterActive: {
    borderColor: '#D7C4F2',
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D7C4F2',
  },
});