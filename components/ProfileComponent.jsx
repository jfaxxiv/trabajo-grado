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
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/config"; 
import { Link, Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const { height } = Dimensions.get("window");

const ProfileComponent = () => {
  const { userConfirm } = React.useContext(UserContext);

  const uid = userConfirm.uid;

  console.log(typeof uid);
  const [raffles, setRaffles] = React.useState([]);
  const [rafflesParticipate, setRafflesParticipate] = React.useState([]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  React.useEffect(() => {
    //Rifas creadas
    const fetchData = async () => {
      const q = query(collection(db, "Rifas"), where("creador", "==", uid));
      const querySnapshot = await getDocs(q);
      const rafflesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRaffles(rafflesList);
    };
    //Rifas en las que participa
    const fetchDataParticipate = async () => {
      const rafflesRef = collection(db, "Rifas");
      const rafflesSnapshot = await getDocs(rafflesRef);

      const allTickets = [];

      for (const raffleDoc of rafflesSnapshot.docs) {
        const ticketRef = collection(raffleDoc.ref, "Boletos");
        const raffleData = raffleDoc.data();

        const ticketsQuery = query(
          ticketRef,
          where("comprador", "==", uid),
          limit(1)
        );
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

  const renderItem = ({ item: doc }) => {
    const fechaRealizacionDate = doc.fecha_realizacion.toDate(); 
    const isFechaRealizacionToday = isToday(fechaRealizacionDate); 

    return (
      <View key={doc.id} style={styles.rafflesContainer}>
        <View style={styles.raffleTitleContainer}>
          <Text style={styles.rafflesCreated}>
            Has creado una rifa con el nombre de{" "}
            <Text style={styles.rafflesCreated__tile}>"{doc.titulo}"</Text>
          </Text>
          {doc.metodo_eleccion_ganador === "personalized" ? (
            <Button
              title="Elegir Ganador"
              color="#2ecc71"
              onPress={() => {
                router.replace(`/Personalized/${doc.id}`);
              }}
              disabled={false}
            />
          ) : (
            <Button
              title="Elegir Ganador"
              color="#2ecc71"
              onPress={() => {
                router.replace(`/lottery/${doc.id}`);
              }}
              disabled={!isFechaRealizacionToday}
            />
          )}
        </View>
      </View>
    );
  };
  const renderItem2 = ({ item: doc }) => {
    return (
      <View key={doc.id} style={styles.rafflesContainer}>
        <View style={styles.raffleTitleContainer}>
          <Text style={styles.rafflesCreated}>
            Estas participando en una rifa llamada:
            <Text style={styles.rafflesCreated__tile}> "{doc.title}"</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#2DA5F7" },
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable
              style={styles.button}
              onPress={() => {
                router.replace("/menu");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <Text style={styles.textSection}>Rifas Creadas</Text>
      <View style={styles.rafflesContainerList}>
      <FlatList
        data={raffles}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      </View>
      <Text style={styles.textSection}>Participando</Text>

      <View style={styles.rafflesContainerList}>
        <FlatList
          data={rafflesParticipate} 
          keyExtractor={(item) => item.id.toString()} 
          renderItem={renderItem2} 
        />
        {/* <View style={{height:70}}></View> */}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif",
    //backgroundColor: "#2ecc71",
    backgroundColor: "#2EA671",
    height: height,
  },
  rafflesContainer: {
    // backgroundColor:"#27b4ad"
  
  },
  rafflesContainerList:{
    height:250,
    backgroundColor: "#2EA671",
  },
  rafflesCreated: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 15,
    //textAlign:"center"
  },
  rafflesCreated__tile: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  textSection: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#fff",
    paddingTop: 15,
    paddingRight: 15,
    textAlign: "center",
    paddingVertical:5,
    borderColor:"#fff",
    borderBottomWidth:2,
    borderTopWidth:2,
    backgroundColor: "#2ecc71",
    
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
