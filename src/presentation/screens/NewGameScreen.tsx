import { View, BackHandler, FlatList, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { globalStyles } from '../../config/theme'
import { TextboxComponent } from '../components/TextboxComponent'
import { HeaderComponent } from '../components/HeaderComponent'
import { ButtonComponent } from '../components/ButtonComponent'
import { useNewPlayer } from '../hooks/useAddNewPlayerHook'
import { useAlert } from '../hooks/useAlertHook'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { LeaderboardItem } from '../components/LeaderboardItem'
import { usePlayersStore } from '../store/player-store'

export default function NewGameScreen() {
    const navigation = useNavigation<any>();
    const { addPlayer } = useNewPlayer()
    const { removePlayer, players } = usePlayersStore()
    const { showAlert, showAlertWithCancelButton } = useAlert()
    const [name, setName] = useState('')
    const limitPlayers = Number(process.env.EXPO_PUBLIC_LIMIT_PLAYERS)

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
        const nameExists = players.some(player => player.name.toUpperCase() === playerName.toUpperCase());
        if (nameExists) {
            showAlert('Alerta', 'El nombre del jugador ya existe. Por favor, elige otro nombre.');
            return;
        }

        addPlayer(playerName, 0);

        // validacion limite de jugadores
        if (players.length + 1 >= limitPlayers) {
            showAlert('Alerta', 'Se ha alcanzado el número máximo de jugadores (6). No se pueden agregar más jugadores.');
        }

        setName('');
    }

    const newGame = async () => {
        if (players.length === 0) {
            showAlert('Alerta', 'No se puede iniciar el juego sin jugadores');
            return;
        }

        navigation.navigate('Loading', { mode: 'ia' })
    }

    return (
        <SafeAreaView style={globalStyles.container}>

            <View style={{ flex: 1, paddingHorizontal: 20, gap: 15 }}>
                <HeaderComponent title="AGREGAR JUGADORES" />

                <TextboxComponent value={name} onChangeText={setName} />

                <ButtonComponent
                    title="Agregar"
                    size="normal"
                    onPress={() => addNewPlayer(name)}
                />

                <FlatList
                    data={players}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 120,
                    }}
                    renderItem={({ item, index }) => (
                        <LeaderboardItem
                            rank={index + 1}
                            name={item.name}
                            score={item.points}
                            isHighlighted
                            deletedButtonVisible={true}
                            onDelete={() => removePlayer(item.name)}
                        />
                    )}
                />
            </View>

            {
                players.length > 1 &&
                <View style={styles.footer}>
                    <ButtonComponent
                        title="Comenzar Juego"
                        size="normal"
                        onPress={newGame}
                    />
                </View>
            }

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
})

