import { router } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Usamos "as" para dar um apelido ao ícone e não bater com o nome da função
import { House as HomeIcon, List, ShoppingCart, User } from 'lucide-react-native';
const categories = ["Featured", "New Arrivals", "Best Sellers", "Sale"];

const products = [
    { id: "1", name: "Cozy Knit Sweater", price: "$49.99", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800" },
    { id: "2", name: "Classic Denim Jeans", price: "$59.99", image: "https://images.unsplash.com/photo-1542272604-787c38355359?q=80&w=800" },
    { id: "3", name: "Leather Ankle Boots", price: "$89.99", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800" },
    { id: "4", name: "Cotton Crewneck Tee", price: "$24.99", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800" },
    { id: "5", name: "Wool Blend Scarf", price: "$34.99", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800" },
    { id: "6", name: "Canvas Tote Bag", price: "$19.99", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800" },
];

export default function Home() {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
        <Text style={styles.search}>⌕</Text>
      </View>

      {/* CATEGORIES */}
      <View style={{ height: 60 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.categoriesContainer}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryButton}>
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
      </View>

      {/* PRODUCTS */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }: { item: any }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({
              pathname: "/product/[id]",
              params: { 
                id: item.id, 
                name: item.name, 
                price: item.price, 
                image: item.image 
              }
            })}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/")}>
        <HomeIcon color="#1B263B" size={24} />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/")}>
        <List color="#1B263B" size={24} />
        <Text style={styles.navText}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push("/cart")}>
        <ShoppingCart color="#1B263B" size={24} />
        <Text style={styles.navText}>Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
        <User color="#1B263B" size={24} />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  </View>
  ); // <--- AQUI FECHA O RETURN
} // <--- AQUI FECHA A FUNÇÃO HOME

// O STYLES DEVE FICAR FORA DA FUNÇÃO HOME!
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4EE",
    paddingTop: 60,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  search: {
    fontSize: 24,
  },
  categoriesContainer: {
    paddingBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#D8C2E8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center",
  },
  card: {
    width: "48%",
    marginBottom: 20,
  },
  productImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: "#E5E5E5",
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#D8C2E8",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 28,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  navIcon: {
    fontSize: 20,
  },
  navText: {
    fontSize: 11,
    fontWeight: "500",
  },
});