import React from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
  Button,
  Dimensions,
  Image,
} from "react-native";
import { db } from "../firebase/config";
import { useLocalSearchParams } from "expo-router";
import { 
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { UserContext } from "../contexts/UserContext";
import { handdleIntegrationMP } from "../utils/MPintegration";
import { openBrowserAsync } from "expo-web-browser";
import DropDownPicker from "react-native-dropdown-picker";
import { Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");
let lista = [];

function TicketsRaffles() {
  const { userConfirm } = React.useContext(UserContext);
  const { id } = useLocalSearchParams();

  const [raffleData, setRaffleData] = React.useState({});
  const [available, setAvailable] = React.useState([]);
  const [selectedButtonId, setSelectedButtonId] = React.useState(null);
  const [tickets, setTickets] = React.useState([]);

  React.useEffect(() => {
    const getRaffleData = async () => {
      try {
        // Referencia al documento
        const raffleDocRef = doc(db, "Rifas", id);

        // Obtener el documento
        const raffleDoc = await getDoc(raffleDocRef);

        if (raffleDoc.exists()) {
          // Guardar los datos en el estado
          setRaffleData(raffleDoc.data());
        } else {
          console.log("No se encontró el documento con ese ID");
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      }
    };
    getRaffleData();

    const fetchTickets = async () => {
      const querySnapshot = await getDocs(
        collection(db, "Rifas", id, "Boletos")
      );
      const fetchedTickets = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedTickets.push({
          id: doc.id,
          number: data.numero,
          disponible: data.disponibilidad,
        });
      });

      fetchedTickets.sort((a, b) => {
        return parseInt(a.number) - parseInt(b.number);
      });

      setTickets(fetchedTickets);
    };

    fetchTickets();
  }, []);

  // const handlePress = (id) => {
  //   setAvailable([...available, id]);
  // };

  const getTickets = async () => {
    await Promise.all(
      lista.map(async (idTicket) => {
        if (!idTicket) {
          console.error("ID de ticket inválido o indefinido:", idTicket);
          return;
        }

        const docRef = doc(db, "Rifas", id, "Boletos", idTicket);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
  
            // Verificar si el campo "disponible" es true antes de actualizar
            if (data.disponibilidad === true) {
              await updateDoc(docRef, {
                disponibilidad: false,
                comprador: userConfirm.uid,
              });
              console.log(`Ticket ${idTicket} actualizado exitosamente.`);
              router.replace("/menu");
            } else {
              console.log(`Ticket ${idTicket} ya no está disponible.`);
              Alert.alert(`Ticket ${idTicket} ya no está disponible.`);

            }
          } else {
            console.log(`El documento con ID ${idTicket} no existe.`);
          }
        } catch (error) {
          console.error("Error al actualizar el ticket:", error);
        }
        // await updateDoc(docRef, {
        //       diponible: false,
        //       user: userConfirm.uid,
        //     });
        
      })
    );
  };

  const selectTickets = (idTicket) => {
    lista.push(idTicket);
    //setSelectTicket((...prevTickets) => [...prevTickets, idTicket])
    console.log(lista);
  };

  const button = (content) => (
    <Pressable
      style={[
        styles.item_button,
        content.disponible ? styles.enabledButton : styles.disabledButton,
        selectedButtonId === content.id ? styles.selectedButton : null,
      ]}
      onPress={() => {
        Alert.alert("Seleccionado");
        //getTickets(content.id);
        // handlePress(content.id);
        selectTickets(content.id);
        setSelectedButtonId(content.id);
      }}
      disabled={!content.disponible}
    >
      <Text style={styles.item_text}>{content.number}</Text>
    </Pressable>
  );
  const renderItem = ({ item }) => {
    return button(item);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#2ecc71" },
          headerTitle: `${raffleData.titulo}`,
          headerTintColor: "white",
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              style={styles.button}
              onPress={() => {
                router.replace("/menu");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />

      <View style={styles.header}>
        <Text style={styles.title}>{raffleData.premio}</Text>
        <Image
          source={{ uri: raffleData.imagen_url }}
          style={{ width: 150, height: 110 }}
        />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
        />
      </View>

      <LinearGradient colors={["#35F244", "#2ecc71"]} style={styles.button}>
        <Pressable
          onPress={async () => {
            //const data = await handdleIntegrationMP(raffleData, id, lista.length);
            //openBrowserAsync(data);
            //fetchData();
            getTickets();
            
          }}
        >
          <Text style={styles.buttonText}>COMPRAR</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 12,
    backgroundColor: "#2DA5F7",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    textDecorationLine: "underline",
  },
  listContainer: {
    height: 450,
    marginTop: 5,
    textAlign:"center"
  },
  item_button: {
    margin: 5,
    backgroundColor: "#2ecc71",
    textAlign: "center",
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 1,
    borderRadius: 5,
    height: 30,
    width: 75,
  },
  item_text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    fontSize: 23,
  },
  defaultButton: {
    backgroundColor: "#2ecc71", // Color por defecto
  },
  selectedButton: {
    backgroundColor: "#35A6F2", // Color cuando está seleccionado
  },
  enabledButton: {
    backgroundColor: "#2ecc71", // Color para botones habilitados
  },
  disabledButton: {
    backgroundColor: "#000", // Color para botones deshabilitados
  },

  button: {
    marginTop: 30,
    //backgroundColor: "#fff",
    height: 60,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    color: "#fff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    //fontWeight: "bold",
    fontSize: 28,
    //fontFamily:"grand-casino"
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
export { TicketsRaffles };
