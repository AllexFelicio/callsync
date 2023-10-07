import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import { firestore } from '../../../config/Firebase' // Verifique a importação
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';



const EditarChamado = ({ route }) => {
    const [nome, setNome] = useState('');
    const [selecao, setSelecao] = useState('');
    const [observacao, setObservacao] = useState('');
    const [radioValue, setRadioValue] = useState('');

    const navigation = useNavigation();
    const chamado = route.params;

    const fetchChamadoData = async () => {
        const chamadoDoc = doc(firestore, 'historico', chamado.id);
        const chamadoData = await getDoc(chamadoDoc);

        if (chamadoData.exists()) {
            const { usuario, motivo, observacao } = chamadoData.data();
            setNome(usuario);
            setSelecao(motivo);
            setObservacao(observacao);
        } else {
            console.log("No such document!");
        }
    };

    const handleEnviar = async () => {
        try {
            // Criar um novo documento na coleção "historico"
            const docRef = await addDoc(collection(firestore, 'historico'), {
                usuario: nome,
                motivo: selecao,
                observacao: observacao,
                status: 'Aberto'
            });

            console.log("Documento escrito com ID: ", docRef.id);
            navigation.goBack();
        } catch (e) {
            console.error("Erro adicionando documento: ", e)
        }
    };

    useEffect(() => {
        console.log(chamado.id)
        fetchChamadoData();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                value={nome}
                onChangeText={setNome}
                editable={false}
            />

            <Text style={styles.label}>Tipo de chamado:</Text>
            <View pointerEvents="none">
                <Picker
                    style={styles.picker}
                    selectedValue={selecao}
                >
                    <Picker.Item label="Suporte" value="Suporte" />
                    <Picker.Item label="Infraestrutura" value="Infraestrutura" />
                    <Picker.Item label="Equipamento" value="Equipamento" />
                </Picker>
            </View>

            <Text style={styles.label}>Observação:</Text>
            <TextInput
                style={styles.textarea}
                placeholder="Digite sua observação"
                multiline
                numberOfLines={4}
                value={observacao}
                onChangeText={setObservacao}
                editable={false}
            />
            <Text style={styles.label}>Status:</Text>
            <View style={styles.radioGroup}>
                <View style={styles.radioButtonContainer}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setRadioValue('Aberto')}
                    >
                        <View style={styles.radioButton}>
                            {
                                radioValue === 'Aberto' ?
                                    <View style={styles.radioButtonInner} /> : null
                            }
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.radioText}>Aberto</Text>
                </View>

                <View style={styles.radioButtonContainer}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setRadioValue('Resolvido')}
                    >
                        <View style={styles.radioButton}>
                            {
                                radioValue === 'Resolvido' ?
                                    <View style={styles.radioButtonInner} /> : null
                            }
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.radioText}>Resolvido</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleEnviar}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditarChamado;