import { StyleSheet, View, ScrollView, TouchableOpacity, Image, BackHandler, Alert } from 'react-native'
import React, { useCallback } from 'react'
import { globalStyles } from '../../config/theme'
import { HeaderComponent } from '../components/HeaderComponent'
import { useCardStore } from '../store/cards-store'
import TinderCarousel from '../components/TinderCarousel'
import { ButtonComponent } from '../components/ButtonComponent'
import { usePlayersStore } from '../store/player-store'
import { PlayerCardComponent } from '../components/PlayerCardComponent'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAlert } from '../hooks/useAlertHook'

export default function GameScreen() {
  const cards = useCardStore.getState().cards;
  const { players, addPoints, getPoints } = usePlayersStore()
  const navigation = useNavigation<any>();
  const {showAlertWithCancelButton} = useAlert()

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

  return (
    <View style={[globalStyles.container]}>
      <HeaderComponent title="BASTA CARTAS" />

      <View style={styles.cardContainer}>
        <TinderCarousel data={cards} />
      </View>


     <View style={styles.resetContainer}>
         <TouchableOpacity onPress={() => navigation.navigate('Loading', {mode: 'local'})}  accessibilityLabel="Reset">
              <Image style={{ width: 50, height: 50 }} source={require('../../../assets/reset.png')} />
        </TouchableOpacity>
     </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scoreContainer}
      >
        {
          players.map((player, index) => (
            <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }} key={index}>
              <PlayerCardComponent name={`${player.name} - ${getPoints(player.name)}`} />
              <ButtonComponent size='small' title='SUMAR PUNTO' onPress={() => addPoints(player.name, 1)} />
            </View>
          ))
        }
      </ScrollView>


      <ButtonComponent size='large' title='TERMINAR JUEGO' onPress={() => navigation.navigate('Result')} />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 35
  },
  scoreContainer: {
    height: '30%',
    flexDirection: 'row',
    bottom: 20,
  },
  resetContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    bottom: 10,
    zIndex: 10
  }
})
function onPress(value: string): void {
  throw new Error('Function not implemented.')
}

