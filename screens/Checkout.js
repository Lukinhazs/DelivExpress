import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Checkout({
  carrinho,
  navigation,
}) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');
  const [pagamento, setPagamento] = useState('');
  const [precisoTroco, setPrecisoTroco] = useState(false);
  const [trocoPara, setTrocoPara] = useState('');
  const [erroCampo, setErroCampo] = useState('');

  function finalizarPedido() {
    if (carrinho.length === 0) {
      setErroCampo('carrinho');
      return;
    }

    if (nome.trim() === '') {
      setErroCampo('nome');
      return;
    }

    if (telefone.replace(/\D/g, '').length < 10) {
      setErroCampo('telefone');
      return;
    }

    if (cep.replace(/\D/g, '').length !== 8) {
      setErroCampo('cep');
      return;
    }

    if (endereco.trim() === '') {
      setErroCampo('endereco');
      return;
    }

    if (!/^[0-9]+$/.test(numero)) {
      setErroCampo('numero');
      return;
    }

    if (pagamento === '') {
      setErroCampo('pagamento');
      return;
    }

    setErroCampo('');

    navigation.navigate('Confirmacao', {
      dados: {
        nome,
        telefone,
        cep,
        endereco,
        numero,
        complemento,
        referencia,
        pagamento,
        precisoTroco,
        trocoPara,
      },
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.seta}>←</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>
          Dados de Entrega
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Nome</Text>

        <TextInput
          style={[
            styles.input,
            erroCampo === 'nome' && styles.inputErro,
          ]}
          value={nome}
          onChangeText={setNome}
        />

        {erroCampo === 'nome' && (
          <Text style={styles.mensagemErro}>
            ⚠ Informe seu nome.
          </Text>
        )}

        <Text style={styles.label}>Telefone</Text>

        <TextInput
          style={[
            styles.input,
            erroCampo === 'telefone' && styles.inputErro,
          ]}
          placeholder="(19) 9____"
          placeholderTextColor="#9CA3AF"
          value={telefone}
          onChangeText={(texto) =>
            setTelefone(texto.replace(/\D/g, ''))
          }
          keyboardType="phone-pad"
          maxLength={11}
        />

        {erroCampo === 'telefone' && (
          <Text style={styles.mensagemErro}>
            ⚠ Telefone inválido.
          </Text>
        )}

        <Text style={styles.label}>CEP</Text>

        <TextInput
          style={[
            styles.input,
            erroCampo === 'cep' && styles.inputErro,
          ]}
          value={cep}
          onChangeText={(texto) =>
            setCep(texto.replace(/\D/g, ''))
          }
          keyboardType="numeric"
          maxLength={8}
        />

        {erroCampo === 'cep' && (
          <Text style={styles.mensagemErro}>
            ⚠ CEP deve ter 8 dígitos.
          </Text>
        )}

        <Text style={styles.label}>Endereço</Text>

        <TextInput
          style={[
            styles.input,
            erroCampo === 'endereco' && styles.inputErro,
          ]}
          value={endereco}
          onChangeText={setEndereco}
        />

        {erroCampo === 'endereco' && (
          <Text style={styles.mensagemErro}>
            ⚠ Informe o endereço.
          </Text>
        )}

        <Text style={styles.label}>Número</Text>

        <TextInput
          style={[
            styles.input,
            erroCampo === 'numero' && styles.inputErro,
          ]}
          value={numero}
          onChangeText={(texto) =>
            setNumero(texto.replace(/\D/g, ''))
          }
          keyboardType="numeric"
        />

        {erroCampo === 'numero' && (
          <Text style={styles.mensagemErro}>
            ⚠ Número inválido.
          </Text>
        )}

        <Text style={styles.label}>
          Complemento
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Opcional"
          placeholderTextColor="#9CA3AF"
          value={complemento}
          onChangeText={setComplemento}
        />

        <Text style={styles.label}>Referência</Text>

        <TextInput
          style={styles.input}
          value={referencia}
          onChangeText={setReferencia}
        />

        <Text style={styles.label}>
          Pagamento
        </Text>

        <View
          style={[
            styles.pickerContainer,
            erroCampo === 'pagamento' &&
              styles.pickerErro,
          ]}
        >
          <Picker
            selectedValue={pagamento}
            onValueChange={(valor) => setPagamento(valor)}
            mode="dropdown"
            dropdownIconColor="#3D5AFE"
            style={styles.picker}
          >
            <Picker.Item
              label="Selecione uma opção"
              value=""
            />

            <Picker.Item
              label="Cartão"
              value="Cartão"
            />

            <Picker.Item
              label="Pix"
              value="Pix"
            />

            <Picker.Item
              label="Dinheiro"
              value="Dinheiro"
            />
          </Picker>
        </View>

        {erroCampo === 'pagamento' && (
          <Text style={styles.mensagemErro}>
            ⚠ Escolha a forma de pagamento.
          </Text>
        )}

        {pagamento === 'Dinheiro' && (
          <View style={styles.trocoContainer}>
            <View style={styles.linhaSwitch}>
              <Text style={styles.labelTroco}>
                Preciso de troco
              </Text>

              <Switch
                value={precisoTroco}
                onValueChange={setPrecisoTroco}
              />
            </View>

            {precisoTroco && (
              <>
                <Text style={styles.label}>
                  Troco para
                </Text>

                <TextInput
                  style={styles.input}
                  value={trocoPara}
                  onChangeText={(texto) =>
                    setTrocoPara(texto.replace(/\D/g, ''))
                  }
                  keyboardType="numeric"
                />
              </>
            )}
          </View>
        )}

        {erroCampo === 'carrinho' && (
          <Text style={styles.mensagemErro}>
            ⚠ Seu carrinho está vazio.
          </Text>
        )}

        <TouchableOpacity
          style={styles.botaoFinalizar}
          onPress={finalizarPedido}
        >
          <Text style={styles.textoFinalizar}>
            Finalizar pedido
          </Text>
        </TouchableOpacity>

        <Text style={styles.identificacaoTela}>
          T3 · Checkout
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 14,
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
    marginLeft: 2,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#202A44',
    marginBottom: 5,
    marginTop: 4,
  },

  input: {
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 14,
    color: '#202A44',
  },

  inputErro: {
    borderColor: '#EB5757',
    backgroundColor: '#FDECEC',
  },

  mensagemErro: {
    color: '#EB5757',
    fontSize: 14,
    marginTop: -4,
    marginBottom: 10,
    fontWeight: '500',
  },

  pickerContainer: {
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D9DDE5',
    borderRadius: 8,
    marginBottom: 10,
  },

  pickerErro: {
    borderColor: '#EB5757',
    backgroundColor: '#FDECEC',
  },

  picker: {
    height: 44,
    width: '100%',
    color: '#202A44',
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  trocoContainer: {
    backgroundColor: '#E8EBF0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  linhaSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  labelTroco: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#202A44',
  },

  botaoFinalizar: {
    backgroundColor: '#3D5AFE',
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  textoFinalizar: {
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