import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useFonts } from 'expo-font';
import InputField from '../../components/InputField';
import { login } from '../../api/AuthService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  signup: undefined;
  login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

export default function LoginScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
  });

  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    const loginData = {
      email,
      password,
    };

    try {
      const response = await login(loginData);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao realizar login. Tente novamente.');
      console.error('Erro ao fazer login:', error);
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Fazer login</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Novo por aqui?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate('signup')}>
          Cadastre-se :)
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
