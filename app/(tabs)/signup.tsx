import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useFonts } from 'expo-font';
import InputField from '../../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  signup: undefined;
  login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'signup'>;

export default function SignupScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
  
    const signupData = {
      email,
      password,
    };
  
    try {
      await AsyncStorage.clear();
  
      await AsyncStorage.setItem(`user_${signupData.email}`, JSON.stringify(signupData));
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('login');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao realizar cadastro. Tente novamente.');
      console.error('Erro ao fazer signup:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/group_things.png')} style={styles.image} />
      </View>

      <Text style={styles.title}>Preencha com seus dados :)</Text>

      <InputField
        placeholder="E-mail"
        iconName="mail-outline"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        placeholder="Senha"
        iconName="lock-closed-outline"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <InputField
        placeholder="Confirme sua senha"
        iconName="lock-closed-outline"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Já tem uma conta?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('login')}>
          Faça login :)
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginBottom: 20,
    color: '#2F3739',
  },
  button: {
    backgroundColor: '#E5B968',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  signupText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#2F3739',
    textAlign: 'center',
    marginTop: 20,
  },
  signupLink: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
});
