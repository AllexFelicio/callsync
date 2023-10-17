import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginTop: 5,
        fontSize: 20,
        marginBottom: 3,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 8,
        fontSize: 17,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 5,
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
        height: 100,
    },
    button: {
        marginTop: 40,
        backgroundColor: '#27B1DC',
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        marginTop:8
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:10
    },
    
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    radioText: {
        marginLeft: 10,   // Espaço entre o botão e o texto
        fontSize: 18,    // Tamanho do texto
    },
    
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#000',
    },
    
    
});