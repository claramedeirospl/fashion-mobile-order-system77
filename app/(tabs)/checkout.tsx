import { StyleSheet, Text, View } from "react-native";

export default function Checkout() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Checkout
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4EE",

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
  },
});