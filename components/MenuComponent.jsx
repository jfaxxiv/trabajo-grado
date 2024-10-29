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
  TextInput
} from "react-native";
import { Link, Stack, router } from "expo-router";
import { db } from "../firebase/config";
import { UserContext } from "../contexts/UserContext";
import { RafflesContext } from "../contexts/RafflesContext";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { handdleIntegrationMP } from "../utils/MPintegration";
import axios from "axios";

const { height } = Dimensions.get("window");

function MenuComponent() {
  const { logOut, userConfirm } = React.useContext(UserContext);
  const { fetchData, defSearchParam,search,searchParam,rafflesFound } = React.useContext(RafflesContext);
  const [raffles, setRaffles] = React.useState([]);
  const [scrapedData, setScrapedData] = React.useState([]);
  const [htmlContent, setHtmlContent] = React.useState("");
  const [searching, setSearching] = React.useState(false);

  const handleBuy = () => {
    handdleIntegrationMP;
  };

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
          headerStyle: { backgroundColor: "#2DA5F7" },
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
            <MaterialIcons name="create" size={50} color="#2DA5F7" />
          </View>
        </Pressable>
      </View>
      <Text style={styles.textIcon}>Crea una Rifa</Text>
      <TextInput
        placeholder=""
        onChangeText={defSearchParam}
        value={searchParam}
      />
      <Button
        onPress={()=>{
          search()
          setSearching(true)
        }}
        title="buscar"
      />

      <Text style={styles.h1}>Rifas Disponibles</Text>

      {raffles.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : searching ? (
        <FlatList
          data={rafflesFound}
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
      ):(
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
    height: height,
    backgroundColor: "#2ecc71",
    marginBottom: 20,
  },
  iconView: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
  },
  textIcon: {
    textAlign: "center",
    fontSize: 19,
    color: "#fff",
    marginBottom: 10,
  },
  textIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 32,
    marginRight: 30,
  },
  iconsContainer: {
    flexDirection: "row",
    paddingTop: 15,
    justifyContent: "center",
  },

  h1: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  rafflesContainer: {
    backgroundColor: "#2DA5F7",
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
    color: "#fff",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  descriptionRaffle: {
    fontSize: 20,
    overflow: "hidden",
    // width: 270,
    marginTop: 15,
    backgroundColor: "#2DA5F7",
    backgroundColor: "#80E977",
    padding: 8,
    borderRadius: 10,
    elevation: 8,
    height: 100,
  },
  prizeRaffle: {
    fontSize: 20,
    //marginTop:"auto",
    color: "#fff",
    fontWeight: "bold",
  },
  priceRaffle: {
    color: "#fff",
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
