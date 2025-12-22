import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle
} from 'react-native';

type ButtonSize = 'small' | 'normal' | 'large';

interface ButtonComponentProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>
}

export const ButtonComponent: React.FC<ButtonComponentProps> = ({
  title,
  onPress,
  size = 'normal',
  disabled = false,
  style
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[size],
        style,
        disabled && styles.disabled,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, styles[`text_${size}`]]}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  /* Base */
  base: {
    backgroundColor: '#F02B3A', // rojo del botón
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Tamaños */
  small: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  normal: {
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  large: {
    paddingVertical: 20,
    paddingHorizontal: 48,
  },

  /* Texto */
  text: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 1,
  },
  text_small: {
    fontSize: 14,
  },
  text_normal: {
    fontSize: 18,
  },
  text_large: {
    fontSize: 22,
  },

  /* Disabled */
  disabled: {
    opacity: 0.5,
  },
});
