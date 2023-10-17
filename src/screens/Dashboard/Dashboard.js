import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, useState } from 'react-native';
import { styles } from './Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/Firebase';



const Dashboard = ({ route }) => {
  const user = route.params;

  const navigation = useNavigation();


  const handleAbrirChamado = () => {
    navigation.navigate('Chamados', { email: user.user });
  };

  const handleHistorico = () => {
    navigation.navigate('Historico', { email: user.user });
  };

  const handleUsuarios = () => {
    navigation.navigate('Usuarios');
  };

  useEffect(() => {
    console.log(user.user)
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };


  return (
    <View >

      <View style={styles.rectangle}>
        <Icon name="contact-page" size={70} color="black" style={{ marginLeft: 10 }} />
        <View style={styles.containerSeq}>
  <Text style={styles.text}>Olá,</Text>
  <Text style={styles.text}>{user.user}</Text>
</View>

      </View>

      <View style={styles.containerButton}>

        <TouchableOpacity style={styles.button} onPress={handleAbrirChamado}>
          <Icon name="engineering" size={70} color="black" style={{ marginLeft: 37 }} />
          <Text style={styles.buttonText}>Abrir chamado</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleHistorico}>
          <Icon name="history" size={70} color="black" style={{ marginLeft: 27 }} />
          <Text style={styles.buttonText}>Historico</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.containerButton}>
        {user.user === 'useradm@gmail.com' && (
          <TouchableOpacity style={styles.button} onPress={handleUsuarios}>
            <Icon name="group" size={70} color="black" style={{ marginLeft: 30 }} />
            <Text style={styles.buttonText}>Usuários</Text>
          </TouchableOpacity>
        )}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="logout" size={70} color="black" style={{ marginLeft: 27 }} />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;