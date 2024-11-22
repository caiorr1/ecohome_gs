import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EletrodomesticoData } from "../../api/types/EletrodomesticoTypes";
import { ComodoData } from "../../api/types/ComodoTypes";

type RootStackParamList = {
  home: undefined;
  alert: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'alert'>;

export default function AlertsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const [comodos, setComodos] = useState<ComodoData[]>([]);
  const [alertas, setAlertas] = useState<EletrodomesticoData[]>([]);

  useEffect(() => {
    loadComodos();
  }, []);

  const loadComodos = async () => {
    try {
      const storedComodos = await AsyncStorage.getItem("@comodos");
      if (storedComodos) {
        const parsedComodos = JSON.parse(storedComodos);
        setComodos(parsedComodos);
        const allEletros = parsedComodos.flatMap((comodo: ComodoData) => comodo.eletrodomesticos || []);
        setAlertas(allEletros);
      }
    } catch (error) {
      console.error("Erro ao carregar cômodos:", error);
    }
  };

  const getIconColor = (screen: string) => {
    return route.name === screen ? "#4CAF50" : "#808080";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relatório semanal</Text>
      <Text style={styles.subtitle}>
        {alertas.length > 0
          ? "Seu consumo está acima da média"
          : "Seu consumo está abaixo da média"}
      </Text>

      {alertas.length > 0 ? (
        alertas.map((eletro) => (
          <View key={eletro.id} style={styles.alertItem}>
            <Text style={styles.eletroName}>{eletro.nome}</Text>
            <Text style={styles.eletroInfo}>
              Potência: {eletro.potencia}Kw/h
            </Text>
            <Text style={styles.eletroInfo}>
              Horário: {eletro.horarioInicial} - {eletro.horarioFinal}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.noAlert}>Nenhuma medida necessária!</Text>
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("home")}
        >
          <Ionicons
            name="home"
            size={24}
            color={getIconColor("home")}
          />
          <Text style={[styles.navText, { color: getIconColor("home") }]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("alert")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={getIconColor("alert")}
          />
          <Text style={[styles.navText, { color: getIconColor("alert") }]}>
            Alertas
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F7F7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2F3739",
  },
  subtitle: {
    fontSize: 16,
    color: "#2F3739",
    marginBottom: 20,
  },
  alertItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  eletroName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  eletroInfo: {
    fontSize: 14,
    color: "#777",
  },
  noAlert: {
    fontSize: 18,
    color: "#28a745",
    textAlign: "center",
    marginTop: 20,
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
  },
});
