import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

export default function Confirmacao({
  carrinho,
  setCarrinho,
  navigation,
  route,
}) {
  const { dados } = route.params;

  const [numeroPedido] = useState(
    () => Math.floor(1000 + Math.random() * 9000)
  );

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const entrega = 6;
  const total = subtotal + entrega;

  useEffect(() => {
    Alert.alert(
      'Pedido confirmado!',
      `Seu pedido foi realizado com sucesso!\nPedido #${numeroPedido}`,
      [
        {
          text: 'OK',
        },
      ]
    );
  }, []);

  function novoPedido() {
    setCarrinho([]);
    navigation.navigate('Cardápio');
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Pedido confirmado!
        </Text>
      </View>

      <ScrollView>
        <View style={styles.sucesso}>
          <Text style={styles.check}>✓</Text>

          <Text style={styles.mensagem}>
            Seu pedido foi realizado com sucesso!
          </Text>

          <Text style={styles.numero}>
            Pedido #{numeroPedido}
          </Text>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.tituloBloco}>
            Itens do pedido
          </Text>

          {carrinho.map((item) => (
            <View style={styles.linha} key={item.id}>
              <Text style={styles.texto}>
                {item.nome} x{item.quantidade}
              </Text>

              <Text style={styles.texto}>
                R$ {(item.preco * item.quantidade)
                  .toFixed(2)
                  .replace('.', ',')}
              </Text>
            </View>
          ))}

          <View style={styles.linha}>
            <Text style={styles.texto}>
              Entrega
            </Text>

            <Text style={styles.texto}>
              R$ 6,00
            </Text>
          </View>

          <View style={styles.linhaTotal}>
            <Text style={styles.totalTexto}>
              TOTAL
            </Text>

            <Text style={styles.totalValor}>
              R$ {total.toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

        <View style={styles.bloco}>
          <Text style={styles.tituloBloco}>
            Entrega
          </Text>

          <Text style={styles.texto}>
            {dados.nome}
          </Text>

          <Text style={styles.texto}>
            {dados.endereco}, {dados.numero}
          </Text>

          {dados.complemento !== '' && (
            <Text style={styles.texto}>
              {dados.complemento}
            </Text>
          )}

          <Text style={styles.texto}>
            CEP: {dados.cep}
          </Text>

          {dados.referencia !== '' && (
            <Text style={styles.texto}>
              Referência: {dados.referencia}
            </Text>
          )}
        </View>

        <View style={styles.bloco}>
          <Text style={styles.tituloBloco}>
            Forma de pagamento
          </Text>

          <Text style={styles.texto}>
            {dados.pagamento}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoNovoPedido}
          onPress={novoPedido}
        >
          <Text style={styles.textoBotao}>
            Fazer novo pedido
          </Text>
        </TouchableOpacity>

        <Text style={styles.identificacaoTela}>
          T4 · Confirmação
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
    padding: 12,
  },

  cabecalho: {
    height: 60,
    backgroundColor: '#3D5AFE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  sucesso: {
    backgroundColor: '#E8EBF0',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginBottom: 10,
  },

  check: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2EC478',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 10,
  },

  mensagem: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#202A44',
    textAlign: 'center',
  },

  numero: {
    fontSize: 15,
    color: '#3D5AFE',
    fontWeight: 'bold',
    marginTop: 6,
  },

  bloco: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },

  tituloBloco: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#202A44',
    marginBottom: 10,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  texto: {
    fontSize: 14,
    color: '#202A44',
    marginBottom: 5,
  },

  linhaTotal: {
    borderTopWidth: 1,
    borderTopColor: '#D9DDE5',
    paddingTop: 10,
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202A44',
  },

  totalValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2EC478',
  },

  botaoNovoPedido: {
    backgroundColor: '#3D5AFE',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  identificacaoTela: {
    textAlign: 'center',
    fontSize: 12,
    color: '#3D5AFE',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});