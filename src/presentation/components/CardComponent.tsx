import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native'; import React from 'react'
import { globalStyles, colors } from '../../config/theme'

interface CardComponentProps {
    title?: string;
}

const { width } = Dimensions.get('window');

export const CardComponent: React.FC<CardComponentProps> = ({ title }) => {
    return (
        <View style={styles.card}>
            {/* Contador superior derecho */}
            <Text style={styles.counterText}>1/200</Text>

            {/* Contenido principal central */}
            <View style={styles.centerContent}>
                <Text style={styles.mainTitle}>{title}</Text>
            </View>

            {/* Texto inferior */}
            <Text style={styles.footerText}>DESLIZA PARA VER MÁS</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: width * 0.85, // 85% del ancho de la pantalla
        aspectRatio: 0.75,   // Proporción vertical similar a la imagen
        backgroundColor: colors.primary, // Rojo vibrante de la imagen
        borderRadius: 25,
        padding: 25,
        justifyContent: 'space-between', // Distribuye los elementos (top, center, bottom)

        // Sombras para iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        // Sombras para Android
        elevation: 10,
    },
    counterText: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'right',
        marginTop: 10,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        color: 'white',
        fontSize: 42,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 1,
    },
    footerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.9,
    },
});