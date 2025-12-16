import { Alert } from 'react-native';

export const useAlert = () => {
    /**
     * Muestra una alerta con un título y un mensaje.
     * @param title 
     * @param message 
     */
    const showAlert = (title: string, message: string) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Ok',
                    onPress: () => { },
                    style: 'cancel',
                },
            ]
        );
    }
    /**
     * Muestra una alerta con un título, mensaje y botón de cancelación
     * @param title 
     * @param message 
     */
    const showAlertWithCancelButton = (title: string, message: string, onPress: (value: string) => void) => {
        Alert.alert(
            title,
            message,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sí', onPress: onPress }
            ]
        );
    }

    return {
        showAlert,
        showAlertWithCancelButton
    }
}


