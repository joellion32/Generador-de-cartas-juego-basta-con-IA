import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Card } from '../../core/models/card.model';
import { colors } from '../../config/theme';
import { useTinderCarousel } from '../hooks/useTinderCarouselHook';


interface Props {
  data: Card[];
}
const { width } = Dimensions.get('window');


export default function TinderCarousel({ data }: Props) {
  const {panResponder, VISIBLE_CARDS, index, getCardStyle} = useTinderCarousel(data)

  return (
    <>
      {data.map((item, i) => {
        if (i < index || i >= index + VISIBLE_CARDS) return null;

        const isActive = i === index;
        const isLastCard = index === data.length - 1;

        return (
          <Animated.View
            key={item.id}
            style={[
              styles.card,
              getCardStyle(i) as any,
              { zIndex: VISIBLE_CARDS - (i - index) },
            ]}
            {...(isActive && !isLastCard ? panResponder.panHandlers : {})}
          >
            {/* Contador superior derecho */}
            <Text style={styles.counterText}>{item.id}/{data.length}</Text>

            {/* Contenido principal central */}
            <View style={styles.centerContent}>
              <Text style={styles.mainTitle}>{item.title}</Text>
            </View>

            {/* Texto inferior */}
            <Text style={styles.footerText}>{isLastCard ? 'FIN DEL MAZO' : 'DESLIZA PARA VER MÁS'}</Text>
          </Animated.View>
        );
      })
        .reverse()}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: width * 0.70, // 85% del ancho de la pantalla
    aspectRatio: 0.75,   // Proporción vertical similar a la imagen
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'space-between', // Distribuye los elementos (top, center, bottom)
    padding: 25,

    // Sombras para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Sombras para Android
    elevation: 10,
  },
  mainTitle: {
    color: 'white',
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 1,
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
  footerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
});

