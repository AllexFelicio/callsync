import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Picker } from '@react-native-picker/picker';
import { firestore } from '../../../config/Firebase' // Verifique a importação
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';



const EditarChamado = ({ route }) => {
    const [nome, setNome] = useState('');
    const [selecao, setSelecao] = useState('');
    const [observacao, setObservacao] = useState('');
    const [radioValue, setRadioValue] = useState('');
    const [solucao, setSolucao] =  useState('');

    const navigation = useNavigation();
    const chamado = route.params;

    const fetchChamadoData = async () => {

        const chamadoDoc = doc(firestore, 'historico', chamado.id);
        const chamadoData = await getDoc(chamadoDoc);

        if (chamadoData.exists()) {
            const { usuario, motivo, observacao, status, solucao } = chamadoData.data();
            setNome(usuario);
            setSelecao(motivo);
            setObservacao(observacao);
            setRadioValue(status);
            setSolucao(solucao);
        } else {
            console.log("No such document!");
        }
    };

    const handleSalvar = async () => {
        try {
            const chamadoDoc = doc(firestore, 'historico', chamado.id);
    
            await updateDoc(chamadoDoc, {
                usuario: nome,
                motivo: selecao,
                observacao: observacao,
                status: radioValue,
                solucao: solucao
            });
    
            //console.log("Documento atualizado com sucesso!");
            navigation.goBack();
        } catch (e) {
            console.error("Erro ao atualizar o documento: ", e);
        }
    };

    useEffect(() => {
        console.log(selecao)
        console.log(chamado.email)
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
            <TextInput
                style={styles.input}
                placeholder="Tipo de Chamado"
                value={selecao}
                onChangeText={setSelecao}
                editable={false}
            />

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
            {chamado.email === 'useradm@gmail.com' && (
                <>
                <View>
                    <Text style={styles.label}>Solução:</Text>
                    <TextInput
                        style={styles.textarea} // Estilo para a entrada de solução
                        placeholder="Digite a solução"
                        value={solucao}
                        onChangeText={setSolucao}
                    />
                </View>
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
                </>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSalvar}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditarChamado;