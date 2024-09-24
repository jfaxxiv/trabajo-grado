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

function TicketsRaffles() {
  const { userConfirm } = React.useContext(UserContext);
  const { id, descripcion } = useLocalSearchParams();

  const [raffleData, setRaffleData] = React.useState({});

  React.useEffect(() => {
    const getRaffleData = async () => {
      try {
        // Referencia al documento
        const raffleDocRef = doc(db, "raffles", id);

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
      try {
        const ticketsCollectionRef = collection(
          doc(db, "raffles", id),
          "boletos"
        );
        const querySnapshot = await getDocs(ticketsCollectionRef);
        console.log(querySnapshot);

        const ticketsList = querySnapshot.docs.map((doc) => ({
          label: doc.data().value,
          value: doc.data().value,
          disabled: doc.data().disabled,
          user: doc.data().user,
        }));

        //setItemsFirst(ticketsList);
      } catch (error) {
        console.error("Error al obtener los productos: ", error);
      }
    };
    //fetchTickets();
  }, []);

  const [openFirst, setOpenFirst] = React.useState(false);
  const [valueFirst, setValueFirst] = React.useState([]);
  const [itemsFirst, setItemsFirst] = React.useState(
    [
      { label: "00", value: "00", disabled: false },
      { label: "01", value: "01", disabled: false },
      { label: "02", value: "02", disabled: false },
      { label: "03", value: "03", disabled: false },
      { label: "04", value: "04", disabled: false },
      { label: "05", value: "05", disabled: false },
      { label: "06", value: "06", disabled: false },
      { label: "07", value: "07", disabled: false },
      { label: "08", value: "08", disabled: false },
      { label: "09", value: "09", disabled: false },
      { label: "10", value: "10", disabled: false },
      { label: "11", value: "11", disabled: false },
      { label: "12", value: "12", disabled: false },
      { label: "13", value: "13", disabled: false },
      { label: "14", value: "14", disabled: false },
      { label: "15", value: "15", disabled: false },
      { label: "16", value: "16", disabled: false },
      { label: "17", value: "17", disabled: false },
      { label: "18", value: "18", disabled: false },
      { label: "19", value: "19", disabled: false },
      { label: "20", value: "20", disabled: false },
      { label: "21", value: "21", disabled: false },
      { label: "22", value: "22", disabled: false },
      { label: "23", value: "23", disabled: false },
      { label: "24", value: "24", disabled: false },
      { label: "25", value: "25", disabled: false },
      { label: "26", value: "26", disabled: false },
      { label: "27", value: "27", disabled: false },
      { label: "28", value: "28", disabled: false },
      { label: "29", value: "29", disabled: false },
      { label: "30", value: "30", disabled: false },
      { label: "31", value: "31", disabled: false },
      { label: "32", value: "32", disabled: false },
      { label: "33", value: "33", disabled: false },
      { label: "34", value: "34", disabled: false },
      { label: "35", value: "35", disabled: false },
      { label: "36", value: "36", disabled: false },
      { label: "37", value: "37", disabled: false },
      { label: "38", value: "38", disabled: false },
      { label: "39", value: "39", disabled: false },
      { label: "40", value: "40", disabled: false },
      { label: "41", value: "41", disabled: false },
      { label: "42", value: "42", disabled: false },
      { label: "43", value: "43", disabled: false },
      { label: "44", value: "44", disabled: false },
      { label: "45", value: "45", disabled: false },
      { label: "46", value: "46", disabled: false },
      { label: "47", value: "47", disabled: false },
      { label: "48", value: "48", disabled: false },
      { label: "49", value: "49", disabled: false },
      { label: "50", value: "50", disabled: false },
      { label: "51", value: "51", disabled: false },
      { label: "52", value: "52", disabled: false },
      { label: "53", value: "53", disabled: false },
      { label: "54", value: "54", disabled: false },
      { label: "55", value: "55", disabled: false },
      { label: "56", value: "56", disabled: false },
      { label: "57", value: "57", disabled: false },
      { label: "58", value: "58", disabled: false },
      { label: "59", value: "59", disabled: false },
      { label: "60", value: "60", disabled: false },
      { label: "61", value: "61", disabled: false },
      { label: "62", value: "62", disabled: false },
      { label: "63", value: "63", disabled: false },
      { label: "64", value: "64", disabled: false },
      { label: "65", value: "65", disabled: false },
      { label: "66", value: "66", disabled: false },
      { label: "67", value: "67", disabled: false },
      { label: "68", value: "68", disabled: false },
      { label: "69", value: "69", disabled: false },
      { label: "70", value: "70", disabled: false },
      { label: "71", value: "71", disabled: false },
      { label: "72", value: "72", disabled: false },
      { label: "73", value: "73", disabled: false },
      { label: "74", value: "74", disabled: false },
      { label: "75", value: "75", disabled: false },
      { label: "76", value: "76", disabled: false },
      { label: "77", value: "77", disabled: false },
      { label: "78", value: "78", disabled: false },
      { label: "79", value: "79", disabled: false },
      { label: "80", value: "80", disabled: false },
      { label: "81", value: "81", disabled: false },
      { label: "82", value: "82", disabled: false },
      { label: "83", value: "83", disabled: false },
      { label: "84", value: "84", disabled: false },
      { label: "85", value: "85", disabled: false },
      { label: "86", value: "86", disabled: false },
      { label: "87", value: "87", disabled: false },
      { label: "88", value: "88", disabled: false },
      { label: "89", value: "89", disabled: false },
      { label: "90", value: "90", disabled: false },
      { label: "91", value: "91", disabled: false },
      { label: "92", value: "92", disabled: false },
      { label: "93", value: "93", disabled: false },
      { label: "94", value: "94", disabled: false },
      { label: "95", value: "95", disabled: false },
      { label: "96", value: "96", disabled: false },
      { label: "97", value: "97", disabled: false },
      { label: "98", value: "98", disabled: false },
      { label: "99", value: "99", disabled: false },
    ]
  );

  const [openSecond, setOpenSecond] = React.useState(false);
  const [valueSecond, setValueSecond] = React.useState(null);
  const [itemsSecond, setItemsSecond] = React.useState([
    { label: "1", value: "1", disabled: false },
    { label: "2", value: "2", disabled: false },
    { label: "3", value: "3", disabled: false },
  ]);

  const [placeholder, setPlaceholder] = React.useState("");

  const handleChange = (value) => {
    setValueSecond(value);
    setPlaceholder(value ? "nada" : "");
  };

  const handleValueChange = (value) => {
    setValueSecond(value);

    // Deshabilitar el ítem seleccionado
    setItemsSecond((prevItems) =>
      prevItems.map((item) =>
        item.value === value ? { ...item, disabled: true } : item
      )
    );
  };

  // const handlePress = (id) => {
  //   setAvailable([...available, id]);
  // };

  // const getTickets = async (idTicket) => {
  //   const docRef = doc(db, "raffles", id, "boletos", idTicket);
  //   await updateDoc(docRef, {
  //     disponible: false,
  //     user: userConfirm.uid,
  //   });
  // };

  // const button = (content) => (
  //   <Pressable
  //     style={styles.item_button}
  //     onPress={() => {
  //       Alert.alert("hi");
  //       getTickets(content.id);
  //       handlePress(content.id);
  //     }}
  //     disabled={available.includes(content.id)}
  //   >
  //     <Text style={styles.item_text}>{content.content}</Text>
  //   </Pressable>
  // );
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
      <Text style={styles.title}>Premio</Text>
      <View style={styles.list_container}>
        <View style={styles.pickerContainer}>
          <Text>Numero de Boletos</Text>
          <DropDownPicker
            open={openSecond}
            value={valueSecond}
            items={itemsSecond}
            setOpen={setOpenSecond}
            setValue={handleValueChange}
            setItems={setItemsSecond}
            multiple={true} // Permite selección múltiple
            min={1} // mínimo
            max={1} // Máximo de elementos seleccionables
            style={{ zIndex: 1000 }}
            containerStyle={{ zIndex: 1000, width: 200 }}
            placeholder={placeholder}
          />
        </View>
        <View>
          <Text>Elige el Numero</Text>
          <DropDownPicker
            open={openFirst}
            value={valueFirst}
            items={itemsFirst}
            setOpen={setOpenFirst}
            setValue={setValueFirst}
            setItems={setItemsFirst}
            multiple={true} // Permite selección múltiple
            min={1} // mínimo
            max={3} // Máximo de elementos seleccionables
            style={{ zIndex: 500 }}
            containerStyle={{ zIndex: 500 }}
            placeholder=""
          />
        </View>

        <LinearGradient colors={["#2DE5F7", "#2DA5F7"]} style={styles.button}>
          <Pressable
            onPress={async () => {
              const data = await handdleIntegrationMP(raffleData, id);
              openBrowserAsync(data);
            }}
          >
            <Text style={styles.buttonText}>COMPRAR</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 12,
    backgroundColor: "white",
  },
  title: {
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
  },
  item_button: {
    margin: 10,
    backgroundColor: "#27b4ad",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20,
    color: "#fff",
    borderRadius: 5,
    height: 75,
    width: 75,
  },
  item_text: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 23,
  },
  itemContainer: {},
  list_container: {
    marginTop: 50,
    padding: 2,
    elevation: 5,
  },
  pickerContainer: {
    marginBottom: 0,
  },
  pickerStyles: {
    zIndex: 1000,
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
});
export { TicketsRaffles };
