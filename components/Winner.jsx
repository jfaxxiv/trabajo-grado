import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { RafflesContext } from "../contexts/RafflesContext";
import { Link, Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const Winner = () => {
  const { id } = useLocalSearchParams();
  const { winner, getUser } = React.useContext(RafflesContext);
  const [tickets, setTickets] = React.useState([]);
  const [userWinner, setUserWinner] = React.useState({});
  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    const fetchTickets = async () => {
      const querySnapshot = await getDocs(
        collection(db, "raffles", id, "boletos")
      );
      const fetchedTickets = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedTickets.push({
          id: doc.id,
          number: data.number,
          disponible: data.diponible,
          user: data.user,
        });
      });

      fetchedTickets.sort((a, b) => {
        return parseInt(a.number) - parseInt(b.number);
      });

      setTickets(fetchedTickets);
    };

    fetchTickets();
  }, []);

  const onPress = () => {
    const randomTicket = winner(tickets);
    if (randomTicket) {
      console.log("Ticket seleccionado:", randomTicket._j.id);
      setUserWinner(randomTicket._j);
      getUser(randomTicket._j.user, setUser);
    }
    console.log(user);
  };

  return (
    <View>
      <Stack.Screen
        options={{
          // Hide the header for this route
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.replace("/menu");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Text>Winner</Text>
      <Button title="elegir" onPress={onPress} />
      <Text>
        el ganador fue: {user} con el numero: {userWinner.number}
      </Text>
    </View>
  );
};

export default Winner;
