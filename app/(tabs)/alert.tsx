import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EletrodomesticoData } from "../../api/types/EletrodomesticoTypes";
import { ComodoData } from "../../api/types/ComodoTypes";
import * as Progress from 'react-native-progress'; // Importação do Progress
import { useFonts } from "expo-font"; // Importação do hook de fontes

type RootStackParamList = {
  home: undefined;
  alert: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "alert">;

export default function AlertsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const [comodos, setComodos] = useState<ComodoData[]>([]); 
  const [alertas, setAlertas] = useState<EletrodomesticoData[]>([]);
  const [totalConsumo, setTotalConsumo] = useState(0);
  const [status, setStatus] = useState("");
  const [cor, setCor] = useState("#4CAF50");

  const mediaDiaria = 6.15;

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    loadComodos(); // Certifique-se de que o hook seja chamado da mesma forma todas as vezes
  }, []); // A dependência está vazia, assim o efeito só será executado na montagem

  // Função para carregar cômodos do AsyncStorage
  const loadComodos = async () => {
    try {
      const storedComodos = await AsyncStorage.getItem("@comodos");
      if (storedComodos) {
        const parsedComodos = JSON.parse(storedComodos);
        setComodos(parsedComodos); // Atualiza o estado com os cômodos
        filterAlertas(parsedComodos); // Filtra os alertas depois de carregar os dados
      }
    } catch (error) {
      console.error("Erro ao carregar cômodos:", error);
    }
  };

  const filterAlertas = (comodos: ComodoData[]) => {
    const allEletros = comodos.flatMap(
      (comodo: ComodoData) => comodo.eletrodomesticos || []
    );
    setAlertas(allEletros);
  
    const total = allEletros.reduce((acc, eletro) => acc + eletro.potencia, 0);
    setTotalConsumo(total);
  
    if (total < mediaDiaria) {
      setStatus("Seu consumo está abaixo da média");
      setCor("#4CAF50"); 
    } else {
      setStatus("Seu consumo está acima da média");
      setCor("#FF5722"); 
    }
  };

  const getIconColor = (screen: string) => {
    return route.name === screen ? "#4CAF50" : "#808080"; 
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontFamily: "Poppins-Bold" }]}>Relatório semanal</Text>

      <View style={styles.consumoBox}>
        <Ionicons name="flash" size={40} color={getIconColor("alert")} />
        <Text style={[styles.consumoText, { fontFamily: "Poppins-Regular" }]}>
          {totalConsumo.toFixed(2)} kWh
        </Text>
        
        <Progress.Bar
          progress={totalConsumo / 100}
          width={200}
          height={10}
          color={getIconColor("alert")}
          unfilledColor="#e0e0e0"
        />

        <Text style={[styles.consumoStatus, { fontFamily: "Poppins-Regular" }]}>
          {status}
        </Text>
      </View>

      <View style={styles.eletroList}>
        {alertas.length > 0 ? (
          alertas.map((eletro, index) => (
            <View key={index} style={styles.eletroItem}>
              <Text style={[styles.eletroName, { fontFamily: "Poppins-Bold" }]}>
                {eletro.nome}
              </Text>
              <Text style={[styles.eletroInfo, { fontFamily: "Poppins-Regular" }]}>
                Potência: {eletro.potencia} kWh
              </Text>
              <Text style={[styles.eletroInfo, { fontFamily: "Poppins-Regular" }]}>
                Horário: {eletro.horarioInicial} - {eletro.horarioFinal}
              </Text>
            </View>
          ))
        ) : (
          <Text style={[styles.noAlert, { fontFamily: "Poppins-Regular" }]}>
            Nenhum eletrodoméstico registrado!
          </Text>
        )}
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("home")}
        >
          <Ionicons name="home" size={24} color={getIconColor("home")} />
          <Text style={[styles.navText, { color: getIconColor("home") }]}>Home</Text>
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
          <Text style={[styles.navText, { color: getIconColor("alert") }]} >
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
  consumoBox: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  consumoText: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  consumoStatus: {
    fontSize: 16,
    color: "#777",
    marginTop: 10, 
  },
  eletroList: {
    marginVertical: 20,
  },
  eletroItem: {
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
    color: "#777",
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
