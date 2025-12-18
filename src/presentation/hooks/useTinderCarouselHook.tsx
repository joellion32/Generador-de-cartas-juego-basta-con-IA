import { useRef, useState, useEffect } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";

export const useTinderCarousel = (data?: { id: any }[]) => {
    const { width } = Dimensions.get('window');
    const SWIPE_THRESHOLD = width * 0.25;
    const position = useRef(new Animated.ValueXY()).current;
    const [index, setIndex] = useState(0);
    const indexRef = useRef(index);
    const VISIBLE_CARDS = 5;

    useEffect(() => {
        indexRef.current = index;
    }, [index]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderMove: (_, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },

            onPanResponderRelease: (_, gesture) => {
                const length = data?.length ?? 0;
                if (indexRef.current === length - 1) {
                    resetPosition();
                    return;
                }
                if (gesture.dx > SWIPE_THRESHOLD) {
                    forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    forceSwipe('left');
                } else {
                    resetPosition();
                }
            },
        })
    ).current;

    const forceSwipe = (direction: 'left' | 'right') => {
        const x = direction === 'right' ? width : -width;

        Animated.timing(position, {
            toValue: { x, y: 0 },
            duration: 250,
            useNativeDriver: false,
        }).start(onSwipeComplete);
    };

    const resetPosition = () => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
        }).start();
    };

    // completar swipe
    const onSwipeComplete = () => {
        position.setValue({ x: 0, y: 0 });
        const length = data?.length ?? 0;
        const newIndex = indexRef.current + 1;
        if (newIndex < length) setIndex(newIndex);
    };

    // avanzar con animación (llamable desde padre)
    const nextCard = () => {
        const length = data?.length ?? 0;
        const current = indexRef.current;
        if (current < length - 1) {
            const x = width;
            Animated.timing(position, {
                toValue: { x, y: 0 },
                duration: 250,
                useNativeDriver: false,
            }).start(() => {
                position.setValue({ x: 0, y: 0 });
                setIndex(current + 1);
            });
        }
    };

    // avanzar sin animación
    const skipCard = () => {
        const length = data?.length ?? 0;
        const current = indexRef.current;
        if (current < length - 1) {
            position.setValue({ x: 0, y: 0 });
            setIndex(current + 1);
        }
    };

    /* 🎨 Animaciones de cartas detrás */
    const getCardStyle = (i: number) => {
        if (i === index) {
            const rotate = position.x.interpolate({
                inputRange: [-width, 0, width],
                outputRange: ['-15deg', '0deg', '15deg'],
            });

            return {
                transform: [
                    { translateX: position.x },
                    { translateY: position.y },
                    { rotate },
                ],
            };
        }

        const scale = position.x.interpolate({
            inputRange: [-width, 0, width],
            outputRange: [1, 0.95, 1],
            extrapolate: 'clamp',
        });

        const translateY = position.x.interpolate({
            inputRange: [-width, 0, width],
            outputRange: [0, 10 * (i - index), 0],
            extrapolate: 'clamp',
        });

        const opacity = position.x.interpolate({
            inputRange: [-width, 0, width],
            outputRange: [1, 0.8, 1],
            extrapolate: 'clamp',
        });

        return {
            transform: [{ scale }, { translateY }],
            opacity,
        };
    };

    return {
        panResponder,
        VISIBLE_CARDS,
        index,
        position,

        forceSwipe,
        resetPosition,
        onSwipeComplete,
        nextCard,
        skipCard,
        getCardStyle
    }
}