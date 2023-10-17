import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import { firestore } from '../../config/Firebase' // Verifique a importação
import { styles } from './styles'; // Importe o estilo
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

const Historico = ({route}) => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = route.params;
  const isFocused = useIsFocused();

  const fetchDataFromFirebase = async () => {
    setLoading(true);
    if(user.email === 'useradm@gmail.com'){
    try {
      const usersRef = query(collection(firestore, 'historico'));
      const resultado = await getDocs(usersRef);
      //const searchData = resultado.docs.map((doc) => doc.data());
      const searchData = resultado.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id 
      }));

      // Ordenar os dados com base no doc.id em ordem decrescente
    searchData.sort((a, b) => {
      return b.docId.localeCompare(a.docId);
    });
      setData(searchData);
    } catch (error) {
      console.error('Erro ao buscar dados do Firebase:', error);
    }finally {
      setLoading(false); 
    }
  }else{
    try {
      const usersRef = query(collection(firestore, 'historico'),
      where('user', '==', user.email));
      const resultado = await getDocs(usersRef);
      const searchData = resultado.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id 
      }));
      
      setData(searchData);
    } catch (error) {
      console.error('Erro ao buscar dados do Firebase:', error);
    }finally {
      setLoading(false); 
    }
  }
  };
  
  const handleChamado = () => {
    navigation.navigate('Chamados',{email: user.email});
  };

  const handleEditar= (docId) => {
    navigation.navigate('EditarChamado',{ id: docId, email: user.email});
  }

  const handleSearch = async () => {
    setLoading(true);
    try {
      const usersRef = collection(firestore, 'historico');
      let usersQuery = query(usersRef);

      // Verifique se há um searchTerm antes de aplicar o filtro
      if (searchTerm) {
        usersQuery = query(usersRef,where('usuario', '>=', searchTerm),where('usuario', '<=', searchTerm + '\uf8ff'));
      }

      const response = await getDocs(usersQuery);
      const searchData = response.docs.map((doc) => doc.data());
      setData(searchData);
    } catch (error) {
      console.error('Erro ao buscar dados do Firebase:', error);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataFromFirebase();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchDataFromFirebase();
    }
  }, [isFocused]);

  return (
    <>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua pesquisa"
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <Button title="Pesquisar" onPress={handleSearch} />
        </View>
        <View style={styles.line} />
        {loading ? ( 
          <ActivityIndicator size="large" color="#27B1DC" />
        ) : (
          <View style={styles.container}>
          <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
              <TouchableOpacity style={styles.itemContainer} onPress={() => handleEditar(item.docId)}>
                  <View style={styles.itemFlat}>
                      <Text style={styles.Titulo}>{item.usuario}</Text>
                      <Text>Motivo: {item.motivo}</Text>
                      <Text>Obs: {item.observacao}</Text>
                      <Text>Data: {format(item.dataHora.toDate(), "dd/MM/yyyy HH:mm")}</Text>
                      {item.solucao ? <Text>Solução: {item.solucao}</Text> : null}
                  </View>
                  <View style={[styles.itemStatus, { backgroundColor: item.status === 'Aberto' ? '#F2CC0D' : '#02BA26' }]}>
                      <Text>{item.status}</Text>
                  </View>
              </TouchableOpacity>
        )}
    />
</View>
        )}
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.roundedButton} onPress={handleChamado}>
          <Text style={styles.buttonText}>Novo Chamado</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Historico;