import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  signup: undefined;
  index: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'index'>;

export default function IndexScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('signup');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/background_image.png')} style={styles.backgroundImage} />

      <LinearGradient
        colors={['rgba(229, 190, 104, 0.7)', 'rgba(229, 204, 104, 0.3)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.overlay}
      />

      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>bem-vindo!</Text>
        <Text style={styles.subText}>toque para continuar.</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/icon_image.png')} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 100,
    marginLeft: 30,
  },
  welcomeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 32,
    color: '#2F3739',
  },
  subText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#2F3739',
  },
  logoContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
