import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  ImageBackground,
  SafeAreaView,
  Button,
  Dimensions,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { collection, query, where, getDocs, doc, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import image from "../assets/img/background.png";
import { Link, Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const { height } = Dimensions.get("window");

const ProfileComponent = () => {
  const { userConfirm } = React.useContext(UserContext); 

  const uid = userConfirm.uid;
  //const uid = "ypohS0ChogOMtPUfUHH6nw1Jdtl2";

  console.log(typeof uid);
  const [raffles, setRaffles] = React.useState([]);
  const [rafflesParticipate, setRafflesParticipate] = React.useState([]);

  React.useEffect(() => {
    //Rifas creadas
    const fetchData = async () => {
      const q = query(collection(db, "raffles"), where("usuario", "==", uid));
      const querySnapshot = await getDocs(q);
      const rafflesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRaffles(rafflesList);
    };
    //Rifas en las que participa
    const fetchDataParticipate = async () => {
      const rafflesRef = collection(db, "raffles");
      const rafflesSnapshot = await getDocs(rafflesRef);

      const allTickets = [];

      for (const raffleDoc of rafflesSnapshot.docs) {
        const ticketRef = collection(raffleDoc.ref, "boletos");
        const raffleData = raffleDoc.data();

        const ticketsQuery = query(ticketRef, where("user", "==", uid),limit(1));
        const ticketsSnapshot = await getDocs(ticketsQuery);
        ticketsSnapshot.forEach((doc) => {
          allTickets.push({
            id: doc.id,
            title: raffleData.titulo,
            ...doc.data(),
          });
        });
      }
      setRafflesParticipate(allTickets);
    };
    fetchData();
    fetchDataParticipate();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          // Hide the header for this route
          headerStyle: { backgroundColor: "#2DA5F7" },
          headerShown: true,
          headerTitle:"",
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

      {/* <Text>{userConfirm.email}</Text> */}

      {/* <Text>jg020466@gmail.com</Text> */}

    
      
       <Text style={styles.textSection}>Rifas Creadas</Text>
      

      {raffles.map((doc) => (
        <View key={doc.id} style={styles.rafflesContainer}>
          <View style={styles.raffleTitleContainer}>
            <Text style={styles.rafflesCreated}>
              Has creado una rifa con el nombre de{" "}
              <Text style={styles.rafflesCreated__tile}>"{doc.titulo}"</Text>
            </Text>
            <Button
              title="elegir al ganador"
              color="#2ecc71"
              onPress={() => {
                router.replace(`/winner/${doc.id}`);
              }}
            />
          </View>
        </View>
      ))}
      <Text style={styles.textSection}>Participando</Text>
      {rafflesParticipate.map((doc) => (
        <View key={doc.id} style={styles.rafflesContainer}>
          <View style={styles.raffleTitleContainer}>
          <Text style={styles.rafflesCreated}>
             Estas participando en una rifa llamada: 
             <Text style={styles.rafflesCreated__tile}> "{doc.title}"</Text>
          </Text>
        </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif",
    backgroundColor: "#2ecc71",
    height: height,
  },
  rafflesContainer: {
    // backgroundColor:"#27b4ad"
  },
  rafflesCreated: {
    fontSize: 18,
    color:"#fff",
    marginBottom:15
    //textAlign:"center"
  },
  rafflesCreated__tile: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  textSection: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#fff",
    paddingTop: 15,
    paddingRight: 15,
    textAlign: "center",
  },
  raffleTitleContainer: {
    backgroundColor: "#2DA5F7",
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    elevation: 10,
    borderRadius: 20,
  },
});

export { ProfileComponent };
