import { StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'
import { globalStyles } from '../../config/theme'
import { HeaderComponent } from '../components/HeaderComponent'
import { usePlayersStore } from '../store/player-store'
import { PlayerCardComponent } from '../components/PlayerCardComponent'
import { selectPlayerWinner } from '../../config/helpers/select-player-winner.helper'
import { ButtonComponent } from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ResultScreen() {
    const { players } = usePlayersStore()
    const winner = selectPlayerWinner(players);
    const navigation = useNavigation<any>();

    const startNewGame = () => {
        navigation.navigate('Loading',  {mode: 'ia'});
    }

    const startNewPlayers = () => {
        navigation.navigate('NewGame');
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <HeaderComponent title="RESULTADOS DE LA PARTIDA" showSettingsButton={false} />

            <View style={styles.resultContainer}>
                {
                    players.map((player, index) => (
                        <PlayerCardComponent key={index} name={`${player.name} \n ${player.points} Puntos`} />
                    ))
                }
            </View>

            <View style={styles.resultContainerFooter}>
                {
                    winner === 1 ?
                        <>
                            <Image style={{ width: 100, height: 100 }} source={require('../../../assets/hand.png')} />
                            <Text style={globalStyles.subTitle}>EMPATE</Text>
                        </> : winner ?
                            <>
                                <Image style={{ width: 100, height: 100 }} source={require('../../../assets/stars.png')} />
                                <Text style={globalStyles.subTitle}>{winner.name} GANADOR</Text>
                            </> :
                            <>
                                <Image style={{ width: 100, height: 100 }} source={require('../../../assets/sad-emoji.png')} />
                                <Text style={globalStyles.subTitle}>SIN GANADOR</Text>
                            </>
                }

                <ButtonComponent size='normal' title="REPETIR JUEGO" onPress={startNewGame} />
                <ButtonComponent size='normal' title="NUEVO JUEGO" onPress={startNewPlayers} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    resultContainerFooter: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 20
    }
})