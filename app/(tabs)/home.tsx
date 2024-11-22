import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { EletrodomesticoData } from "../../api/types/EletrodomesticoTypes";
import { ComodoData } from "../../api/types/ComodoTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Progress from "react-native-progress"; // Importação do Progress

type RootStackParamList = {
  signup: undefined;
  login: undefined;
  home: undefined;
  alert: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "home">;

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
  });

  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const [comodos, setComodos] = useState<ComodoData[]>([]);
  const [selectedComodoId, setSelectedComodoId] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [eletroModalVisible, setEletroModalVisible] = useState(false);
  const [editingEletroId, setEditingEletroId] = useState<string | null>(null);
  const [newComodo, setNewComodo] = useState<string>("");
  const [newEletro, setNewEletro] = useState<EletrodomesticoData>({
    nome: "",
    potencia: 0,
    horarioInicial: "",
    horarioFinal: "",
    diasUso: [],
    comodoId: "",
    id: "",
  });

  useEffect(() => {
    loadComodos();
  }, []);

  const loadComodos = async () => {
    try {
      const storedComodos = await AsyncStorage.getItem("@comodos");
      if (storedComodos) {
        const parsedComodos = JSON.parse(storedComodos);
        setComodos(parsedComodos);
      }
    } catch (error) {
      console.error("Erro ao carregar cômodos:", error);
    }
  };

  const saveComodos = async (updatedComodos: ComodoData[]) => {
    try {
      await AsyncStorage.setItem("@comodos", JSON.stringify(updatedComodos));
      setComodos(updatedComodos);
    } catch (error) {
      console.error("Erro ao salvar cômodos:", error);
    }
  };

  const handleAddComodo = () => {
    if (newComodo.trim() === "") {
      Alert.alert("Erro", "O nome do cômodo não pode estar vazio!");
      return;
    }
    const newComodoData: ComodoData = {
      id: Date.now().toString(),
      nome: newComodo.trim(),
      eletrodomesticos: [],
    };
    saveComodos([...comodos, newComodoData]);
    setNewComodo("");
    setModalVisible(false);
  };

  const handleAddOrEditEletrodomestico = () => {
    if (!selectedComodoId) return;
    if (
      newEletro.nome.trim() === "" ||
      newEletro.horarioInicial === "" ||
      newEletro.horarioFinal === "" ||
      newEletro.potencia <= 0
    ) {
      Alert.alert("Erro", "Preencha todos os campos corretamente!");
      return;
    }

    const updatedComodos = comodos.map((comodo) => {
      if (comodo.id === selectedComodoId) {
        const updatedEletrodomesticos = editingEletroId
          ? (comodo.eletrodomesticos || []).map((eletro) =>
              eletro.id === editingEletroId ? { ...newEletro } : eletro
            )
          : [
              ...(comodo.eletrodomesticos || []),
              { ...newEletro, id: Date.now().toString() },
            ];

        return { ...comodo, eletrodomesticos: updatedEletrodomesticos };
      }
      return comodo;
    });

    saveComodos(updatedComodos);
    setNewEletro({
      nome: "",
      potencia: 0,
      horarioInicial: "",
      horarioFinal: "",
      diasUso: [],
      comodoId: "",
      id: "",
    });
    setEditingEletroId(null);
    setEletroModalVisible(false);
  };

  const handleRemoveEletrodomestico = (eletroId: string) => {
    if (!selectedComodoId) return;

    const updatedComodos = comodos.map((comodo) => {
      if (comodo.id === selectedComodoId) {
        return {
          ...comodo,
          eletrodomesticos: (comodo.eletrodomesticos || []).filter(
            (eletro) => eletro.id !== eletroId
          ),
        };
      }
      return comodo;
    });

    saveComodos(updatedComodos);
  };

  const handleEditEletrodomestico = (eletroId: string) => {
    const comodo = comodos.find((c) => c.id === selectedComodoId);
    if (!comodo || !comodo.eletrodomesticos) return;

    const eletro = comodo.eletrodomesticos.find((e) => e.id === eletroId);
    if (!eletro) return;

    setNewEletro(eletro);
    setEditingEletroId(eletroId);
    setEletroModalVisible(true);
  };

  const handleSelectComodo = (id: string) => {
    setSelectedComodoId(id);
    setDropdownOpen(false);
  };

  const handleNavigateToAlert = () => {
    navigation.navigate("alert");
  };

  const getIconColor = (screen: string) => {
    return route.name === screen ? "#4CAF50" : "#808080";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá :)</Text>
      <Text style={styles.subtitle}>Sinta-se em casa!</Text>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedComodoId
            ? comodos.find((comodo) => comodo.id === selectedComodoId)?.nome
            : "Selecione um cômodo"}
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
              onPress={() => handleSelectComodo(comodo.id)}
            >
              <Text style={styles.dropdownItemText}>{comodo.nome}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              setModalVisible(true);
              setDropdownOpen(false);
            }}
          >
            <Text style={[styles.dropdownItemText, { color: "#007BFF" }]}>
              + Adicionar Novo Cômodo
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedComodoId && (
        <View style={styles.comodoDetails}>
          <TouchableOpacity
            style={styles.addComodoButton}
            onPress={() => setEletroModalVisible(true)}
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
                <Text style={styles.eletroInfo}>
                  Potência: {eletro.potencia} kWh
                </Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={() => handleEditEletrodomestico(eletro.id || "")}
                  >
                    <Ionicons name="create-outline" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleRemoveEletrodomestico(eletro.id || "")}
                  >
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Adicionar Cômodo</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do cômodo"
              value={newComodo}
              onChangeText={setNewComodo}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddComodo}
            >
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={eletroModalVisible}
        onRequestClose={() => setEletroModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              {editingEletroId ? "Editar" : "Adicionar"} Eletrodoméstico
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do eletrodoméstico"
              value={newEletro.nome}
              onChangeText={(text) =>
                setNewEletro({ ...newEletro, nome: text })
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Horário Inicial (Ex: 08:00)"
              value={newEletro.horarioInicial}
              onChangeText={(text) =>
                setNewEletro({ ...newEletro, horarioInicial: text })
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Horário Final (Ex: 20:00)"
              value={newEletro.horarioFinal}
              onChangeText={(text) =>
                setNewEletro({ ...newEletro, horarioFinal: text })
              }
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Potência em kWh"
              keyboardType="numeric"
              value={newEletro.potencia ? String(newEletro.potencia) : ""}
              onChangeText={(text) =>
                setNewEletro({ ...newEletro, potencia: parseFloat(text) || 0 })
              }
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddOrEditEletrodomestico}
            >
              <Text style={styles.buttonText}>
                {editingEletroId ? "Salvar" : "Adicionar"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("home")}
        >
          <Ionicons
            name="home"
            size={24}
            color={getIconColor("home")} // Aplica a cor da função para "Home"
          />
          <Text style={[styles.navText, { color: getIconColor("home") }]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={handleNavigateToAlert}
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
  actionButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
  },
  modalInput: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F9F9F9",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#FFF",
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
    color: "#4CAF50",
  },
});
