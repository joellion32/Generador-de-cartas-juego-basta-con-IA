import React from 'react';
import { View, TextInput, StyleSheet, StyleProp, ViewStyle, KeyboardTypeOptions } from 'react-native';
import { colors } from '../../config/theme';

interface TextboxComponentProps {
  value?: any;
  onChangeText?: (text: any) => void;
  placeholder?: any;
  style?: StyleProp<ViewStyle>;
  keyboardType?: KeyboardTypeOptions
}

export const TextboxComponent: React.FC<TextboxComponentProps> = ({
  value = '',
  onChangeText,
  placeholder = 'NOMBRE JUGADOR',
  keyboardType = 'default',
  style
}) => {

  const handleChange = (newText: string) => {
    onChangeText?.(newText);
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        keyboardType={keyboardType}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor="#E0E0E0"
        style={styles.input}
        textAlign="center"
        autoCapitalize="characters"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary, // vino
    borderColor: '#FFFFFF',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {

    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
