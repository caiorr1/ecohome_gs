// components/InputField.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IoniconsName = keyof typeof Ionicons.glyphMap;

interface InputFieldProps {
  placeholder: string;
  iconName: IoniconsName;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputField({
  placeholder,
  iconName,
  secureTextEntry,
  value,
  onChangeText,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: isFocused ? '#E5B968' : '#D3D3D3' }, // Muda a cor da linha inferior dependendo do foco
      ]}
    >
      <Ionicons name={iconName} size={20} color="#2F3739" style={styles.icon} />
      <TextInput
        style={[styles.input]}
        placeholder={placeholder}
        placeholderTextColor="#808080"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)} // Define o estado de foco como true ao focar
        onBlur={() => setIsFocused(false)} // Define o estado de foco como false ao desfocar
        underlineColorAndroid="transparent" // Remove underline do Android
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D3D3D3', // Cor inicial da linha inferior
    paddingVertical: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 5,
    borderWidth: 0, // Remove qualquer borda ao redor do TextInput
    ...Platform.select({
      web: {
        outlineStyle: 'none', // Remove contorno no Web
      },
      default: {
        outlineWidth: 0, // Remove qualquer contorno ao focar em outras plataformas
      },
    }),
  },
});
