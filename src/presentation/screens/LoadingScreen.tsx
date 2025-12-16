import { Image, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../../config/theme'
import { useNavigation } from '@react-navigation/native';
import { useCardStore } from '../store/cards-store';
import { useGeminiModel } from '../hooks/useGeminiModel'
import { usePlayersStore } from '../store/player-store';
import { getItem, setItem } from '../../core/services/local-storage.service';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen({ route }) {
    const navigation = useNavigation<any>();
    const { mode } = route.params;
    const [dots, setDots] = useState('');
    const { generateContent } = useGeminiModel()
    const { resetPoints } = usePlayersStore()
    let text;

    useEffect(() => {
        generateLoading()
        initializeCards()
    }, []);

    const generateLoading = () => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length === 3 ? '' : prev + '.'));
        }, 500);

        return () => clearInterval(interval);
    }

    // Genera contenido con Gemini (o fallback) y mapea al modelo Card
    const initializeCards = async () => {
        try {
            const totalCards = await getItem({ key: "totalCards" });

            // modo (ia) genera el contenido con el modelo
            if (mode == 'ia') {
                text = await generateContent(Number(totalCards));
                console.log("ia:", text)
                await setItem({ key: "cards", value: text }) // almacenar en el local storage
            }
            // modo (local) muestra el contenido desde el local storage
            else if (mode == 'local') {
                text = await getItem({ key: "cards" })
                console.log("local:", text)
            }

            const raw = JSON.parse(text);
            const mapped = raw.map((it: any) => ({ id: String(it.id), title: String(it.title), used: false }));

            // guardar datos en el store zustand
            useCardStore.getState().setCards(mapped);
            resetPoints()  // reiniciar puntos
        } catch (e) {
            console.error('Error generating or parsing cards:', e);
            // Fallback adicional si algo sale mal con el parseo
            const backup = Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1), title: `Carta ${i + 1}`, used: false }));
            useCardStore.getState().setCards(backup);
        } finally {
            navigation.navigate('Game');
        }
    };


    return (
        <SafeAreaView style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <Image style={{ width: 150, height: 150 }} source={require('../../../assets/logo.png')} />
            <Text style={{ color: 'white', marginTop: 20, fontSize: 28, fontWeight: 'bold' }}>Cargando{dots}</Text>
        </SafeAreaView>
    )
}
