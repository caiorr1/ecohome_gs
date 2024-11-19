import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function TopImage() {
  return (
    <Image source={require('../assets/images/group_things.png')} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
