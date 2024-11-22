import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: 'Cadastro',
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarStyle: {
            display: 'none',
          },
        }}
      />
    </Tabs>
  );
}
