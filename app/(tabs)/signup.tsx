// screens/SignupScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import TopImage from '../../components/TopImage';

export default function SignupScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TopImage />
      <Text style={styles.title}>Preencha com seus dados :)</Text>

      <InputField placeholder="E-mail" iconName="mail-outline" />
      <InputField placeholder="Senha" iconName="lock-closed-outline" secureTextEntry />
      <InputField placeholder="Confirme sua senha" iconName="lock-closed-outline" secureTextEntry />

      <PrimaryButton title="Cadastrar-se" onPress={() => console.log('Cadastro realizado')} />

      <Text style={styles.footerText}>
        Já tem uma conta? <Text style={styles.footerLink}>Faça login :)</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#F6F6F6',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    textAlign: 'left',
    marginBottom: 20,
    color: '#2F3739',
  },
  footerText: {
    marginTop: 20,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: '#808080',
  },
  footerLink: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
});
