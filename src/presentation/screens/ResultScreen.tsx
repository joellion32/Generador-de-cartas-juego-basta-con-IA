import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { globalStyles } from '../../config/theme'
import { HeaderComponent } from '../components/HeaderComponent'
import { usePlayersStore } from '../store/player-store'
import { selectPlayerWinner } from '../../config/helpers/select-player-winner.helper'
import { ButtonComponent } from '../components/ButtonComponent'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LeaderboardItem } from '../components/LeaderboardItem'

export default function ResultScreen() {
    const { players,   } = usePlayersStore()
    const winner = selectPlayerWinner(players);
    const navigation = useNavigation<any>();

    const startNewGame = () => {
        navigation.navigate('Loading', { mode: 'ia' });
    }

    const startNewPlayers = () => {
        navigation.navigate('NewGame');
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <HeaderComponent title="RESULTADOS DE LA PARTIDA" showSettingsButton={false} />

            <View style={styles.resultContainer}>
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
            </View>

            <View style={globalStyles.scoreContainer}>
                <FlatList
                    data={players}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <LeaderboardItem
                            rank={index + 1}
                            name={item.name}
                            score={item.points}
                            isHighlighted
                            onAdd={() => { }}
                            onRemove={() => { }}
                        />
                    )}
                />
            </View>

            <View style={styles.resultContainer}>
                <ButtonComponent style={{ width: 300 }} size='normal' title="REPETIR JUEGO" onPress={startNewGame} />
                <ButtonComponent style={{ width: 300 }} size='normal' title="NUEVO JUEGO" onPress={startNewPlayers} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 20
    }
})