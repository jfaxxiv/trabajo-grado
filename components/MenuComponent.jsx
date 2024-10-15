import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import { Link, Stack, router } from "expo-router";
import { db } from "../firebase/config";
import { UserContext } from "../contexts/UserContext";
import { RafflesContext } from "../contexts/RafflesContext";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { handdleIntegrationMP } from '../utils/MPintegration'
import axios from 'axios'

const { height } = Dimensions.get("window");

function MenuComponent() {
  const { logOut, userConfirm } = React.useContext(UserContext);
  const {fetchData} = React.useContext(RafflesContext)
  const [raffles, setRaffles] = React.useState([]);
  const [scrapedData, setScrapedData] = React.useState([]);
  const [htmlContent, setHtmlContent] = React.useState('');
    
const handleBuy = () => {
  handdleIntegrationMP
}

  //obtener rifas creadas
  React.useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const snapshot = await getDocs(collection(db, "raffles"));
        const rafflesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRaffles(rafflesList);
      } catch (error) {
        console.error("Error al obtener los documentos:", error);
      }
    };

    fetchRaffles();
    //fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#27b4ad" },
          headerTitle: "Bienvenido",
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          headerTitleAlign: "start",
          headerRight: () => (
            <Pressable
              style={styles.button}
              onPress={() => {
                router.replace("/profile");
              }}
            >
              <AntDesign name="user" size={40} color="#fff" />
            </Pressable>
          ),
        }}
      />
      {/* <Text style={styles.label}>Bienvenido</Text>
      <Link href={"/rafflesForm"} asChild>
        <Button title="Crear una rifa" />
      </Link>

      <Link href={"/profile"} asChild>
        <Button title="Perfil" />
      </Link>
      <Button title="cerrar sesion" onPress={logOut} /> */}
      <View style={styles.iconsContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            router.replace("/rafflesForm");
          }}
        >
         
          <View style={styles.iconView}>
            <MaterialIcons name="create" size={50} color="#27b4ad" />
          </View>
          <Text>Crea</Text>
        </Pressable>
      </View>

      <Text>Rifas Disponibles</Text>
      
      

      {raffles.length === 0 ? (
        <ActivityIndicator color={"black"} size={"large"} />
      ) : (
        <FlatList
          data={raffles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                router.replace(`/ticket/${item.id}`);
              }}
            >
              <View style={styles.rafflesContainer}>
                <Text style={styles.titleRaffle}>{item.titulo}</Text>
                <Text style={styles.descriptionRaffle} numberOfLines={3}>
                  {item.descripcion}
                </Text>
                <View style={styles.infoRaffle}>
                  <Text style={styles.prizeRaffle}>Premio: {item.premio}</Text>
                  <Text style={styles.priceRaffle}>Precio: ${item.precio}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif",
    height: height
  },
  iconView: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
  },
  textIcon: {
    textAlign: "center",
    fontSize: 20,
  },
  textIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 32,
    marginRight: 30,
  },
  iconsContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  rafflesContainer: {
    backgroundColor: "#fff",
    //borderStyle:"solid",
    //borderColor:"black",
    //borderWidth:3,
    borderRadius: 15,
    margin: 15,
    elevation: 10,
    padding: 20,
    display: "flex",
    //flexDirection: "row",
    //justifyContent: "space-between",
    height: 250,
  },
  titleRaffle: {
    textTransform: "uppercase",
    fontSize: 25,
    fontWeight: "bold",
    color: "#27b4ad",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  descriptionRaffle: {
    fontSize: 20,
    overflow: "hidden",
    // width: 270,
    marginTop: 15,
    backgroundColor: "#AADFF2",
    padding: 8,
    borderRadius: 10,
    elevation: 8,
    height: 100,
  },
  prizeRaffle: {
    fontSize: 20,
    //marginTop:"auto",
    color: "#27b4ad",
    fontWeight: "bold",
  },
  priceRaffle: {
    color: "#27b4ad",
    fontWeight: "bold",
    fontSize: 20,
  },
  infoRaffle: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export { MenuComponent };
