import { View, Text, Button, Pressable, StyleSheet,Dimensions } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { RafflesContext } from "../contexts/RafflesContext";
import { Link, Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { LinearGradient } from "expo-linear-gradient"; 

const { height } = Dimensions.get("window");

const Winner = () => {
  const { id } = useLocalSearchParams();
  const { winner, getUser,lotteryWin } = React.useContext(RafflesContext);
  const [tickets, setTickets] = React.useState([]);
  const [userWinner, setUserWinner] = React.useState({});
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
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
          user: data.comprador,
        });
      });

      fetchedTickets.sort((a, b) => {
        return parseInt(a.number) - parseInt(b.number);
      });

      setTickets(fetchedTickets);
    };

    fetchTickets();
  }, []);

  const onPress = async () => {
    const randomTicket = winner(tickets);
    //lotteryWin(10,tickets)
    if (randomTicket) {
      console.log("Ticket seleccionado:", randomTicket._j.id);
      setUserWinner(randomTicket._j);
      getUser(randomTicket._j.user, setUser);
    }

    console.log(user);
  };

  return (
    <View style={styles.container}>
    <Stack.Screen
      options={{
        headerStyle: { backgroundColor: "#2DA5F7" },
        headerTitle: "",
        headerShown: true,
        headerTitleAlign: "center",
        headerLeft: () => (
          <Pressable
            onPress={() => {
              router.replace("/profile");
            }}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        ),
      }}
    />
    <Text style={styles.title}>Elige el Ganador!!</Text>
    {/* <Button title="elegir" onPress={onPress} /> */}
    <LinearGradient colors={["#2DE5F7", "#2DA5F7"]} style={styles.button}>
      <Pressable onPress={onPress}>
        <Text style={styles.buttonText}>Elegir</Text>
      </Pressable>
    </LinearGradient>
    <Text style={styles.result}>
      el ganador fue: {user} con el numero: {userWinner.number}
    </Text>

   
  </View>
);
};
const styles = StyleSheet.create({
container:{
  height: height,
  paddingHorizontal: 10,
  backgroundColor: "#2ecc71",
  elevation: 20,
  paddingTop:20
  
},
button: {
  marginTop: 0,
  //backgroundColor: "#fff",
  height: 50,
  textAlign: "center",
  paddingTop: 5,
  paddingBottom:5,
  fontSize: 20,
  color: "#fff",
  borderRadius: 5,
},
buttonText: {
  color: "#fff",
  textAlign: "center",
  //fontWeight: "bold",
  fontSize: 30,
  //fontFamily:"grand-casino"
},
result:{
  fontSize: 18,
  color: "#fff",
  marginBottom: 15,
  marginTop:10,
  
  
},
title:{
  fontSize: 25,
  color: "#fff",
  marginBottom: 15,
  fontWeight:"bold",
  textAlign:"center"
}
});
export default Winner;
//userWinner.number