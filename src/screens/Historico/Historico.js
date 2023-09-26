import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native';
import { firestore } from '../../config/Firebase' // Verifique a importação
import { styles } from './styles'; // Importe o estilo
import { collection, getDocs, query, where } from 'firebase/firestore'

const Historico = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataFromFirebase = async () => {
    setLoading(true);
    try {
      const usersRef = query(collection(firestore, 'historico'));
      const resultado = await getDocs(usersRef); // Use firestore assim
      const searchData = resultado.docs.map((doc) => doc.data());
      
      setData(searchData);
    } catch (error) {
      console.error('Erro ao buscar dados do Firebase:', error);
    }finally {
      setLoading(false); // Define o estado de loading como false quando a busca é concluída (mesmo se houver erro)
    }
  };

  useEffect(() => {
    fetchDataFromFirebase();
  }, []);

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
      setLoading(false); // Define o estado de loading como false quando a busca é concluída (mesmo se houver erro)
    }
  };

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
        {loading ? ( // Renderize o indicador de carregamento quando o estado de loading for true
          <ActivityIndicator size="large" color="#27B1DC" />
        ) : (
          <View style={styles.container}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.itemContainer} onPress={() => {}}>
                  <View style={styles.itemFlat}>
                    <Text>{item.usuario}</Text>
                    <Text>{item.motivo}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.roundedButton}>
          <Text style={styles.buttonText}>Novo Chamado</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Historico;
