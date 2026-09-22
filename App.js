import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Carrinho from './screens/Carrinho';
import Checkout from './screens/Checkout';
import Confirmacao from './screens/Confirmacao';

const Stack = createNativeStackNavigator();

const produtos = [
  {
    id: 1,
    nome: 'X-Burger',
    descricao: 'Pão, carne, queijo',
    preco: 24.9,
    imagem:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  },
  {
    id: 2,
    nome: 'X-Salada',
    descricao: 'Alface, tomate',
    preco: 27.9,
    imagem:
      'https://images.unsplash.com/photo-1550547660-d9450f859349',
  },
  {
    id: 3,
    nome: 'X-Bacon',
    descricao: 'Bacon crocante',
    preco: 29.9,
    imagem:
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  },
  {
    id: 4,
    nome: 'Batata Frita',
    descricao: 'Porção crocante',
    preco: 12.9,
    imagem:
      'https://images.unsplash.com/photo-1573080496219-bb080dd4f877',
  },
  {
    id: 5,
    nome: 'Refrigerante',
    descricao: 'Gelado 350ml',
    preco: 6.9,
    imagem:
      'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e',
  },
];

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [busca, setBusca] = useState('');

  function adicionarAoCarrinho(produto) {
    setCarrinho((carrinhoAtual) => {
      const produtoExistente = carrinhoAtual.find(
        (item) => item.id === produto.id
      );

      if (produtoExistente) {
        return carrinhoAtual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [
        ...carrinhoAtual,
        {
          ...produto,
          quantidade: 1,
        },
      ];
    });
  }

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3D5AFE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Cardápio"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <View style={styles.container}>
              <View style={styles.cabecalho}>
                <Text style={styles.titulo}>DelivExpress</Text>

                <View style={styles.contador}>
                  <Text style={styles.numeroContador}>
                    {quantidadeTotal}
                  </Text>
                </View>
              </View>

              <TextInput
                style={styles.busca}
                placeholder="🔍 Buscar lanche..."
                value={busca}
                onChangeText={setBusca}
              />

              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                {produtosFiltrados.map((produto) => (
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
                    </View>

                    <TouchableOpacity
                      style={styles.botaoAdicionar}
                      onPress={() => adicionarAoCarrinho(produto)}
                    >
                      <Text style={styles.textoAdicionar}>
                        + Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              <TouchableOpacity
                style={styles.botaoCarrinho}
                onPress={() => navigation.navigate('Carrinho')}
              >
                <Text style={styles.textoCarrinho}>
                  Ver carrinho
                </Text>
              </TouchableOpacity>

              <Text style={styles.identificacaoTela}>
                T1· Cardápios
              </Text>

              <StatusBar style="light" />
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Carrinho"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <Carrinho
              carrinho={carrinho}
              setCarrinho={setCarrinho}
              navigation={navigation}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Checkout"
          options={{ headerShown: false }}
        >
          {({ navigation }) => (
            <Checkout
              carrinho={carrinho}
              navigation={navigation}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Confirmacao"
          options={{ headerShown: false }}
        >
          {({ navigation, route }) => (
            <Confirmacao
              carrinho={carrinho}
              setCarrinho={setCarrinho}
              navigation={navigation}
              route={route}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    paddingHorizontal: 16,
  },

  cabecalho: {
    height: 60,
    backgroundColor: '#3D5AFE',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginHorizontal: -4,
    marginTop: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titulo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  contador: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2EC478',
    alignItems: 'center',
    justifyContent: 'center',
  },

  numeroContador: {
    color: '#fff',
    fontWeight: 'bold',
  },

  busca: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 8,
    height: 42,
    paddingHorizontal: 12,
    marginVertical: 12,
    fontSize: 14,
  },

  card: {
    backgroundColor: '#E8EBF0',
    borderRadius: 10,
    marginBottom: 10,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  imagem: {
    width: 58,
    height: 58,
    borderRadius: 8,
  },

  informacoes: {
    flex: 1,
    paddingHorizontal: 10,
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202A44',
  },

  descricao: {
    fontSize: 12,
    color: '#464E5C',
    marginTop: 2,
  },

  preco: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EB5757',
    marginTop: 3,
  },

  botaoAdicionar: {
    backgroundColor: '#2EC478',
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 7,
  },

  textoAdicionar: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },

  botaoCarrinho: {
    backgroundColor: '#3D5AFE',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },

  textoCarrinho: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  identificacaoTela: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3D5AFE',
    marginBottom: 8,
  },
});