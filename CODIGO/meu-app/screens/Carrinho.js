import { View, Text, StyleSheet } from 'react-native';

export default function Carrinho() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>
      <Text>Seu carrinho aparecerá aqui.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});