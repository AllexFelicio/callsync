import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login/Login';
import Dashboard from './src/screens/Dashboard/Dashboard';
import Chamados from './src/screens/Chamados/Chamados';
import Historico from './src/screens/Historico/Historico';
import Usuarios from './src/screens/Usuarios/Usuarios';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditarChamado from './src/screens/Historico/Editar/EditarChamado';

const Stack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();

const DashboardNavigator = () => {
  return (
    <DashboardStack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#27B1DC' } }}>
      <DashboardStack.Screen name="DashboardMain" component={Dashboard} options={{ headerBackTitleVisible: false,headerTitle: 'Menu',headerTitleStyle: {color: 'white',},}}/>
      <DashboardStack.Screen name="Chamados"component={Chamados}options={{headerTitleStyle: {color: 'white',},headerTintColor: 'white',}}/>
      <DashboardStack.Screen name="Historico"component={Historico}options={{headerTitleStyle: {color: 'white',},headerTintColor: 'white',}}/>
      <DashboardStack.Screen name="Usuarios"component={Usuarios}options={{headerTitleStyle: {color: 'white',},headerTintColor: 'white',}}/>
      <DashboardStack.Screen name="EditarChamado"component={EditarChamado}options={{headerTitleStyle: {color: 'white',},headerTintColor: 'white',headerTitle: 'Editar Chamado'}}/>
    </DashboardStack.Navigator>
  );
};



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#27B1DC' } }}>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardNavigator} options={{ headerShown: false }} />
        {/* ... Adicione outras telas aqui, se necessário */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
