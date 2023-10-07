import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import { firestore } from '../../config/Firebase' // Verifique a importação
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const Chamados = ({route}) => {
  const [nome, setNome] = useState('');
  const [selecao, setSelecao] = useState('');
  const [observacao, setObservacao] = useState('');
  const navigation = useNavigation();
  const user = route.params;

  const handleEnviarr = () => {
    console.log('Nome:', nome);
    console.log('Seleção:', selecao);
    console.log('Observação:', observacao);
  };

  useEffect(() => {
    console.log(user.email)
  }, []);


  const handleEnviar = async () => {
    try {
        // Criar um novo documento na coleção "historico"
        const docRef = await addDoc(collection(firestore, 'historico'), {
            usuario: nome,
            motivo: selecao,
            observacao: observacao,
            status: 'Aberto',
            user: user.email
        });

        console.log("Documento escrito com ID: ", docRef.id);
        navigation.goBack();
    } catch (e) {
        console.error("Erro adicionando documento: ", e)
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Tipo de chamado:</Text>
      <Picker
      style={styles.picker}
        selectedValue={selecao}
        onValueChange={(itemValue, itemIndex) =>
          setSelecao(itemValue)
        }>
        <Picker.Item label="Suporte" value="Suporte" />
        <Picker.Item label="Infraestrutura" value="Infraestrutura" />
        <Picker.Item label="Equipamento" value="Equipamento" />
      </Picker>


      <Text style={styles.label}>Observação:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Digite sua observação"
        multiline
        numberOfLines={4}
        value={observacao}
        onChangeText={setObservacao}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chamados;