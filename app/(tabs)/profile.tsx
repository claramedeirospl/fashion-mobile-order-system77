import { useRouter } from 'expo-router'; // Import necessário para o botão voltar
import { ChevronLeft, ChevronRight, Settings } from 'lucide-react-native';
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

export default function ProfileScreen() {
  const router = useRouter(); // Hook para controlar a navegação

  // Componente para as linhas de menu (evita repetição de código)
  const MenuOption = ({ label, value, hasArrow = true }: { label: string, value?: string, hasArrow?: boolean }) => (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuItemText}>{label}</Text>
      <View style={styles.menuItemRight}>
        {value && <Text style={styles.menuItemValue}>{value}</Text>}
        {hasArrow && <ChevronRight color="#FFF" size={20} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header atualizado com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft color="#FFF" size={28} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Profile</Text>
        
        <TouchableOpacity>
          <Settings color="#FFF" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Avatar e Nome */}
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://avatar.iran.liara.run/public/33' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>abdulrahman Aldroubie</Text>
          <Text style={styles.userEmail}>abdulrahman.aldroubie@hotmail.com</Text>
        </View>

        {/* Seção Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <MenuOption label="Personal Information" />
          <MenuOption label="Order History" />
          <MenuOption label="Saved Addresses" />
          <MenuOption label="Payment Methods" />
        </View>

        {/* Seção Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <MenuOption label="Notifications" />
          <MenuOption label="Language" value="English" />
          <MenuOption label="Currency" value="USD" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15, // Ajustado para dar espaço ao ícone maior
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
    marginLeft: -5,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    // Garante que o título fique centralizado mesmo com botões nas pontas
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    zIndex: -1, 
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#1B263B',
    marginBottom: 15,
  },
  userName: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#8E9AAF',
    fontSize: 14,
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    color: '#FFF',
    fontSize: 16,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    color: '#8E9AAF',
    marginRight: 10,
    fontSize: 16,
  },
});