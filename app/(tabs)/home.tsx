import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ComodoData } from "../../api/types/ComodoTypes";
import { EletrodomesticoData } from "../../api/types/EletrodomesticoTypes";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const [comodos, setComodos] = useState<ComodoData[]>([]);
  const [selectedComodoId, setSelectedComodoId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    loadComodos();
  }, []);

  const loadComodos = async () => {
    try {
      const storedComodos = await AsyncStorage.getItem("@comodos");
      if (storedComodos) {
        setComodos(JSON.parse(storedComodos));
      }
    } catch (error) {
      console.error("Erro ao carregar cômodos:", error);
    }
  };

  const saveComodos = async (newComodos: ComodoData[]) => {
    try {
      await AsyncStorage.setItem("@comodos", JSON.stringify(newComodos));
      setComodos(newComodos);
    } catch (error) {
      console.error("Erro ao salvar cômodos:", error);
    }
  };

  const handleAddEletrodomestico = (comodoId: string) => {
    const newEletro: EletrodomesticoData = {
      id: Date.now().toString(),
      nome: "Novo Eletrodoméstico",
      potencia: 0,
      horarioInicial: "08:00",
      horarioFinal: "20:00",
      comodoId,
      diasUso: ["Segunda-feira"],
    };

    const updatedComodos = comodos.map((comodo) =>
      comodo.id === comodoId
        ? { ...comodo, eletrodomesticos: [...(comodo.eletrodomesticos || []), newEletro] }
        : comodo
    );

    saveComodos(updatedComodos);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá :)</Text>
      <Text style={styles.subtitle}>Sinta-se em casa!</Text>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownOpen((prev) => !prev)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedComodoId
            ? comodos.find((comodo) => comodo.id === selectedComodoId)?.nome
            : "Selecione o Cômodo"}
        </Text>
        <Ionicons
          name={dropdownOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>

      {dropdownOpen && (
        <View style={styles.dropdownList}>
          {comodos.map((comodo) => (
            <TouchableOpacity
              key={comodo.id}
              style={styles.dropdownItem}
              onPress={() => {
                setSelectedComodoId(comodo.id);
                setDropdownOpen(false);
              }}
            >
              <Text style={styles.dropdownItemText}>{comodo.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedComodoId && (
        <View style={styles.comodoDetails}>
          <TouchableOpacity
            style={styles.addComodoButton}
            onPress={() => handleAddEletrodomestico(selectedComodoId)}
          >
            <Ionicons name="add-circle-outline" size={24} color="#AAAAAA" />
            <Text style={styles.addComodoText}>Adicionar eletrodoméstico</Text>
          </TouchableOpacity>

          {comodos
            .find((comodo) => comodo.id === selectedComodoId)
            ?.eletrodomesticos?.map((eletro) => (
              <View key={eletro.id} style={styles.eletroDetails}>
                <Text style={styles.eletroName}>{eletro.nome}</Text>
                <Text style={styles.eletroInfo}>
                  De: {eletro.horarioInicial} Até: {eletro.horarioFinal}
                </Text>
              </View>
            ))}
        </View>
      )}
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
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    marginBottom: 10,
    color: "#2F3739",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginBottom: 20,
    color: "#2F3739",
  },
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dropdownButtonText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#2F3739",
  },
  dropdownList: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dropdownItem: {
    padding: 15,
  },
  dropdownItemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#2F3739",
  },
  comodoDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addComodoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#AAAAAA",
    borderRadius: 10,
    marginBottom: 10,
  },
  addComodoText: {
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#AAAAAA",
  },
  eletroDetails: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  eletroName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#2F3739",
  },
  eletroInfo: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#2F3739",
  },
});
