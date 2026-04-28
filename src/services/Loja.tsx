import { Ionicons } from '@expo/vector-icons'; // Ícones nativos do Expo
import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Simulando os dados dos seus produtos
const PRODUTOS = [
  { id: '1', nome: 'Pijama Soft Cetim', preco: '149,90', imagem: 'https://via.placeholder.com/150' },
  { id: '2', nome: 'Robe Imperial', preco: '199,00', imagem: 'https://via.placeholder.com/150' },
  { id: '3', nome: 'Short Doll Renda', preco: '89,90', imagem: 'https://via.placeholder.com/150' },
  { id: '4', nome: 'Pantufa Nuvem', preco: '59,90', imagem: 'https://via.placeholder.com/150' },
];

export default function Loja() {
  // Função que renderiza cada "quadradinho" de produto
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
      </View>
      <Text style={styles.productName}>{item.nome}</Text>
      <Text style={styles.price}>R$ {item.preco}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho da Loja */}
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <View style={styles.categories}>
        <Text style={[styles.categoryBadge, styles.activeCategory]}>Destaques</Text>
        <Text style={styles.categoryBadge}>Lançamentos</Text>
        <Text style={styles.categoryBadge}>Promoções</Text>
      </View>

      {/* Lista de Produtos em 2 colunas */}
      <FlatList
        data={PRODUTOS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // Isso cria o visual de grade (grid)
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFEF7', // Fundo off-white elegante
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  categories: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginBottom: 20,
  },
  categoryBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E8DAEF', // Lilás suave
    marginRight: 10,
    fontSize: 12,
    color: '#5B2C6F',
    overflow: 'hidden',
  },
  activeCategory: {
    backgroundColor: '#D2B4DE',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    // Sombra leve
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
});