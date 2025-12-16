import { View, ScrollView, BackHandler } from 'react-native'
import React, { useCallback, useState } from 'react'
import { globalStyles } from '../../config/theme'
import { TextboxComponent } from '../components/TextboxComponent'
import { HeaderComponent } from '../components/HeaderComponent'
import { ButtonComponent } from '../components/ButtonComponent'
import { PlayerCardComponent } from '../components/PlayerCardComponent'
import { useNewPlayer } from '../hooks/useAddNewPlayerHook'
import { useAlert } from '../hooks/useAlertHook'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getItem, setItem } from '../../core/services/local-storage.service'

export default function NewGameScreen() {
    const navigation = useNavigation<any>();
    const { playersNames, addPlayer } = useNewPlayer()
    const { showAlert, showAlertWithCancelButton } = useAlert()
    const [name, setName] = useState('')    

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                showAlertWithCancelButton('Salir', '¿Seguro que deseas salir?', () => BackHandler.exitApp())
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                subscription.remove();
        }, [])
    );

    const addNewPlayer = async (playerName: string) => {
        if (playerName.trim().length === 0) return;

        // valida que no se repitan nombres
        const nameExists = playersNames.some(player => player.name.toUpperCase() === playerName.toUpperCase());
        if (nameExists) {
            showAlert('Alerta', 'El nombre del jugador ya existe. Por favor, elige otro nombre.');
            return;
        }

        addPlayer(playerName, 0);

        // valida que no haya más de 6 jugadores
        if (playersNames.length + 1 >= 6) {
            showAlert('Alerta', 'Se ha alcanzado el número máximo de jugadores (6). No se pueden agregar más jugadores.');
        }

        setName('');
    }


    const newGame = async () => {
        if (playersNames.length === 0) {
            showAlert('Alerta', 'No se puede iniciar el juego sin jugadores');
            return;
        }

        // guardar configuracion 10 cartas por defecto, si no hay total de cartas guardados
        const totalCards = await getItem({ key: "totalCards" });
        if (totalCards == null || totalCards.length === 0) {
            await setItem({ key: "totalCards", value: process.env.EXPO_PUBLIC_DEFAULT_CARDS })
        }
        navigation.navigate('Loading', { mode: 'ia' })
    }

    return (
        <ScrollView style={globalStyles.container}>
            <View style={{ paddingHorizontal: 20, gap: 15 }}>
                <HeaderComponent title="AGREGAR JUGADORES" />

                <TextboxComponent value={name} onChangeText={setName} />

                <ButtonComponent
                    title="Agregar"
                    size="normal"
                    onPress={() => addNewPlayer(name)}
                />

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 5 }}>
                    {
                        playersNames.map((player, index) => (
                            <PlayerCardComponent
                                key={index}
                                name={player.name}
                                size="normal"
                            />
                        ))
                    }
                </View>

                <ButtonComponent
                    title="Comenzar Juego"
                    size="normal"
                    onPress={newGame}
                />
            </View>
        </ScrollView>
    )
}

