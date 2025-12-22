import { StyleSheet, View, FlatList, BackHandler, Text } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { colors, globalStyles } from '../../config/theme'
import { HeaderComponent } from '../components/HeaderComponent'
import { useCardStore } from '../store/cards-store'
import TinderCarousel from '../components/TinderCarousel'
import { ButtonComponent } from '../components/ButtonComponent'
import { usePlayersStore } from '../store/player-store'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAlert } from '../hooks/useAlertHook'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LeaderboardItem } from '../components/LeaderboardItem'

export default function GameScreen() {
  const { cards } = useCardStore();
  const { players, addPoints, subtractPoints } = usePlayersStore()
  const navigation = useNavigation<any>();
  const { showAlertWithCancelButton } = useAlert()
  const carouselRef = useRef<any>(null);

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

  const addPointNextSwipe = (playerName) => {
    addPoints(playerName, 1)
    // Llamar al método expuesto por el componente TinderCarousel
    carouselRef.current?.nextCard?.();
  }

  console.log(players)



  return (
    <SafeAreaView style={[globalStyles.container]}>
      <HeaderComponent title="BASTA CARTAS" />

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <TinderCarousel ref={carouselRef} data={cards} />
        </View>

        <View style={globalStyles.scoreContainer}>
          <Text style={[globalStyles.subTitle, { fontSize: 18, top: 5 }]}>PUNTUACIÓN</Text>
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
                scoreButtonsVisible={true}
                onAdd={() => addPointNextSwipe(item.name)}
                onRemove={() => subtractPoints(item.name, 1)}
              />
            )}
          />
        </View>

        <View style={styles.footerContainer}>
          <ButtonComponent style={{ width: 150, paddingHorizontal: 20, backgroundColor: colors.secondary }} size='normal' title='REINICIAR' onPress={() => navigation.navigate('Loading', { mode: 'local' })} />
          <ButtonComponent style={{ width: 200 }} size='normal' title='FINALIZAR' onPress={() => navigation.navigate('Result')} />
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  cardContainer: {
    flex: 2,
    alignItems: 'center',
    paddingTop: 12,   // pequeño respiro visual
  },
  footerContainer: {
    height: 80,           // 🔥 altura fija
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
});



