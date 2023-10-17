import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row'
  },
  containerSeq: {
    flex: 1,
    justifyContent: 'column',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  button: {
    backgroundColor: 'white',
    width: 165,
    height: 140,
    borderRadius: 20, // Ajuste o valor do raio para a borda arredondada desejada
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'black', // Cor do texto dentro do botão
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // iconContainer: {
  //   marginLeft: 23, // Espaço entre o ícone e o texto
  // },
});