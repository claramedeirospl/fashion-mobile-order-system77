import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCartStore } from '../(tabs)/useCartStore'; // ajuste o caminho se necessário

export default function ProductDetailPage() {
  const { id, name, price, image } = useLocalSearchParams();
  const addItem = useCartStore((state) => state.addItem); // <--- PEGA A FUNÇÃO DA LOJA

  const handleAddToCart = () => {
    // Convertemos o preço para número (removendo o $) para o cálculo do subtotal funcionar
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace('$', '')) 
      : 0;

    addItem({
      id: id as string,
      name: name as string,
      price: numericPrice,
      image: image as string,
      size: 'M' // Valor padrão ou pegue de um estado de seleção
    });

    router.push("/cart"); // Navega para o carrinho
  };
  return (
    
    <SafeAreaView style={styles.container}>
      {/* 1. ÁREA ROLÁVEL (Imagem e Informações) */}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Image 
          source={{ uri: image as string }} 
          style={styles.productImage} 
        />
        
        <View style={styles.textDetails}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>${price}</Text>
          
          {/* Aqui você adicionaria as seções de Size, Color e Reviews do Figma */}
          <Text style={styles.sectionTitle}>Size</Text>
          {/* ... botões de tamanho ... */}
        </View>
      </ScrollView>

      {/* 2. RODAPÉ FIXO (Preço e Botão) */}
      <View style={styles.footerContainer}>
        <View style={styles.priceTag}>
            <Text style={styles.footerPrice}>${price}</Text>
        </View>
        
        <TouchableOpacity 
      style={styles.addToCartButton}
      onPress={handleAddToCart} // <--- AGORA ELE ADICIONA E NAVEGA
    >
      <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F4EE', // Cor de fundo do Figma
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
    paddingBottom: 30, // Espaço extra para o iPhone
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
    backgroundColor: '#D7C4F2', // Lilás do Figma
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