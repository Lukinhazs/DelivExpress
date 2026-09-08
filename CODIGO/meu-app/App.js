import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Carrinho from './screens/Carrinho';

const Stack = createNativeStackNavigator();

const produtos = [
  {
    id: 1,
    nome: 'X-Burger',
    descricao: 'Hambúrguer, queijo e molho especial',
    preco: 18.9,
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  },
  {
    id: 2,
    nome: 'X-Salada',
    descricao: 'Hambúrguer, queijo, alface e tomate',
    preco: 21.9,
    imagem: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
  },
  {
    id: 3,
    nome: 'Batata Frita',
    descricao: 'Porção de batatas fritas crocantes',
    preco: 12.9,
    imagem: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
  },
  {
    id: 4,
    nome: 'Pizza',
    descricao: 'Pizza de queijo com molho de tomate',
    preco: 29.9,
    imagem: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002',
  },
  {
    id: 5,
    nome: 'Refrigerante',
    descricao: 'Refrigerante gelado 350ml',
    preco: 6.9,
    imagem: 'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e',
  },
];

export default function App() {
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cardápio">
          {({ navigation }) => (
            <View style={styles.container}>
              <Text style={styles.titulo}>DelivExpress</Text>

              <Text style={styles.subtitulo}>Cardápio</Text>

              <Text style={styles.contador}>
                🛒 {quantidadeCarrinho}
              </Text>

              <TouchableOpacity
                style={styles.botaoCarrinho}
                onPress={() =>
                  navigation.navigate('Carrinho')}>
                <Text style={styles.textoBotao}>Ver carrinho</Text>
              </TouchableOpacity>

              <ScrollView>
                {produtos.map((produto) => (
                  <View style={styles.card} key={produto.id}>
                    <Image
                      source={{ uri: produto.imagem }}
                      style={styles.imagem}
                    />

                    <View style={styles.informacoes}>
                      <Text style={styles.nome}>
                        {produto.nome}
                      </Text>

                      <Text style={styles.descricao}>
                        {produto.descricao}
                      </Text>

                      <Text style={styles.preco}>
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </Text>

                      <TouchableOpacity
                        style={styles.botao}
                        onPress={() =>
                          setQuantidadeCarrinho(
                            quantidadeCarrinho + 1
                          )
                        }
                      >
                        <Text style={styles.textoBotao}>
                          Adicionar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <StatusBar style="auto" />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Carrinho"
          component={Carrinho}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#202A44',
  },

  subtitulo: {
    fontSize: 20,
    marginBottom: 16,
    color: '#464E5C',
  },

  contador: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202A44',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },

  imagem: {
    width: '100%',
    height: 180,
  },

  informacoes: {
    padding: 14,
  },

  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#202A44',
  },

  descricao: {
    fontSize: 14,
    color: '#464E5C',
    marginTop: 4,
    marginBottom: 8,
  },

  preco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202A44',
    marginBottom: 10,
  },

  botao: {
    backgroundColor: '#3D5AFE',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoCarrinho: {
    backgroundColor: '#3D5AFE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
});