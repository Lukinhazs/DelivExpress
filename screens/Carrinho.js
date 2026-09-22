import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Carrinho({
  carrinho,
  setCarrinho,
  navigation,
}) {
  function aumentarQuantidade(id) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        item.id === id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  }

  function diminuirQuantidade(id) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  const subtotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  const entrega = carrinho.length > 0 ? 6 : 0;
  const total = subtotal + entrega;

  return (
    <View style={styles.container}>

      {/* CABEÇALHO */}
      <View style={styles.cabecalho}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.seta}>←</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>Meu Carrinho</Text>
      </View>

      {/* CARRINHO VAZIO */}
      {carrinho.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.textoVazio}>
            Seu carrinho está vazio.
          </Text>

          <Text style={styles.subtextoVazio}>
            Adicione produtos pelo cardápio.
          </Text>
        </View>
      ) : (
        <>
          {/* LISTA DE PRODUTOS */}
          <ScrollView>
            {carrinho.map((item, index) => (
              <View key={item.id}>

                <View style={styles.item}>

                  <View style={styles.informacoes}>
                    <Text style={styles.nome}>
                      {item.nome}
                    </Text>

                    <Text style={styles.preco}>
                      R$ {item.preco.toFixed(2).replace('.', ',')}
                    </Text>
                  </View>

                  {/* CONTROLE DE QUANTIDADE */}
                  <View style={styles.controle}>

                    <TouchableOpacity
                      style={styles.botaoQuantidade}
                      onPress={() => diminuirQuantidade(item.id)}
                    >
                      <Text style={styles.textoQuantidade}>
                        −
                      </Text>
                    </TouchableOpacity>

                    <Text style={styles.quantidade}>
                      {item.quantidade}
                    </Text>

                    <TouchableOpacity
                      style={styles.botaoQuantidade}
                      onPress={() => aumentarQuantidade(item.id)}
                    >
                      <Text style={styles.textoQuantidade}>
                        +
                      </Text>
                    </TouchableOpacity>

                  </View>

                  {/* TOTAL DO ITEM */}
                  <Text style={styles.totalItem}>
                    R$ {(item.preco * item.quantidade)
                      .toFixed(2)
                      .replace('.', ',')}
                  </Text>

                </View>

                {/* DIVISÓRIA ENTRE OS PRODUTOS */}
                {index < carrinho.length - 1 && (
                  <View style={styles.divisoria} />
                )}

              </View>
            ))}
          </ScrollView>

          {/* RESUMO */}
          <View style={styles.resumo}>

            <View style={styles.linha}>
              <Text>Subtotal</Text>

              <Text>
                R$ {subtotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <View style={styles.linha}>
              <Text>Entrega</Text>

              <Text>
                R$ {entrega.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            <View style={styles.linhaTotal}>
              <Text style={styles.textoTotal}>
                TOTAL
              </Text>

              <Text style={styles.valorTotal}>
                R$ {total.toFixed(2).replace('.', ',')}
              </Text>
            </View>

          </View>
        </>
      )}

      {/* BOTÃO CONTINUAR */}
      <TouchableOpacity
        style={[
          styles.botaoContinuar,
          carrinho.length === 0 && styles.botaoDesabilitado,
        ]}
        disabled={carrinho.length === 0}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Text style={styles.textoContinuar}>
          Continuar
        </Text>
      </TouchableOpacity>

      {/* IDENTIFICAÇÃO DA TELA */}
      <Text style={styles.identificacaoTela}>
        T2 · Carrinho
      </Text>

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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  botaoVoltar: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  seta: {
    fontSize: 28,
    color: '#fff',
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 4,
  },

  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  divisoria: {
    height: 0.5,
    backgroundColor: '#D9DDE5',
    marginHorizontal: 8,
    marginBottom: 10,
  },

  informacoes: {
    flex: 1,
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202A44',
  },

  preco: {
    fontSize: 14,
    color: '#464E5C',
    marginTop: 3,
  },

  controle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },

  botaoQuantidade: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3D5AFE',
    backgroundColor: '#E8EBF0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoQuantidade: {
    fontSize: 20,
    color: '#3D5AFE',
    fontWeight: 'bold',
  },

  quantidade: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#202A44',
  },

  totalItem: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#202A44',
  },

  resumo: {
    backgroundColor: '#E8EBF0',
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
  },

  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  linhaTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#D9DDE5',
  },

  textoTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202A44',
  },

  valorTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2EC478',
  },

  botaoContinuar: {
    backgroundColor: '#3D5AFE',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  botaoDesabilitado: {
    opacity: 0.5,
  },

  textoContinuar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  vazio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoVazio: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#202A44',
  },

  subtextoVazio: {
    fontSize: 14,
    color: '#464E5C',
    marginTop: 6,
  },

  identificacaoTela: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3D5AFE',
    marginBottom: 8,
    marginTop: 10,
  },
});