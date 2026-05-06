import { router, Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCartStore } from '../(tabs)/useCartStore';

export default function ProductDetailPage() {
  const params = useLocalSearchParams();

  const addItem = useCartStore(
    (state) => state.addItem
  );

  const product = {
    id: String(params.id || Date.now()),
    name: String(params.name || 'Produto'),
    image: String(params.image || ''),
    price: Number(
      String(params.price || '0').replace(
        '$',
        ''
      )
    ),
    size: 'M',
  };

  const handleAddToCart = () => {
  addItem({
    ...product,
    id: `${product.id}-${Date.now()}`
  });

  router.push('/cart');

    console.log('Produto adicionado:', product);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: product.name, // Isso substitui o "product/[id]" pelo nome real
          headerTitleAlign: 'center', // Opcional: centraliza o título
        }} 
      />
      
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
        />

        <View style={styles.textDetails}>
          <Text style={styles.productName}>
            {product.name}
          </Text>

          <Text style={styles.productPrice}>
            ${product.price}
          </Text>

          <Text style={styles.sectionTitle}>
            Size
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.priceTag}>
          <Text style={styles.footerPrice}>
            ${product.price}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EE',
  },

  scrollContainer: {
    flex: 1,
  },

  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },

  textDetails: {
    padding: 20,
  },

  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  productPrice: {
    fontSize: 18,
    color: '#000',
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },

  footerContainer: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#EEE',
  },

  priceTag: {
    backgroundColor: '#E6E1F9',
    padding: 15,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },

  footerPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },

  addToCartButton: {
    backgroundColor: '#D7C4F2',
    flex: 1,
    marginLeft: 20,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },

  addToCartText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4A306D',
  },
});