import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../config/theme';

interface PlayerCardComponentProps {
  name: string;
  size?: 'small' | 'normal' | 'large';
}

export const PlayerCardComponent: React.FC<PlayerCardComponentProps> = ({
  name,
  size = 'normal',
}) => {
  return (
    <View style={[styles.container, styles[size]]}>
      <Ionicons
        name="person-circle"
        size={iconSizes[size]}
        color="#FFFFFF"
      />
      <Text style={[styles.text, styles[`text_${size}`]]}>
        {name}
      </Text>
    </View>
  );
};

const iconSizes = {
  small: 60,
  normal: 90,
  large: 120,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  small: {
    width: 100,
  },
  normal: {
    width: 140,
  },
  large: {
    width: 180,
  },

  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
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
});
