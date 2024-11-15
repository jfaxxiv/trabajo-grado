import React from "react";
import {
  View,
  Button,
  Pressable,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { Link, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../assets/img/logoapp.gif";
import * as Font from "expo-font";
import { RafflesContext } from "../contexts/RafflesContext";

const { height } = Dimensions.get("window");

export default function MainComponent() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const {fetchData} = React.useContext(RafflesContext)

  React.useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
    
  });
  //fetchData()
  const loadFonts = async () => {
    await Font.loadAsync({
      "grand-casino": require("../assets/fonts/Grand-Casino-Demo.otf"),
    });
    setFontsLoaded(true);
  };
  if (!fontsLoaded) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#2DA5F7" },
          headerTitle: "Rifa Magica",
          headerTintColor: "white",
          headerTitleStyle: {
            //fontFamily: "grand-casino",
            fontSize: 35,
          },
          headerTitleAlign: "center",
        }}
      />
      <Image source={logo} style={styles.gif} />
      <View style={styles.buttonsContainer}>
        {/* <Text style={styles.title}>Bienvenidos</Text> */}
        {/* <Link href={"/signIn"} style={styles.button}>
          Registrate
        </Link> */}
        <LinearGradient
          colors={["#fff", "#ffff"]}
          //start={{ x: 0, y: 0 }}
          //end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Pressable
            //style={styles.button}
            onPress={() => {
              router.replace("/signIn");
            }}
          >
            <Text style={styles.buttonText}>Registrate</Text>
          </Pressable>
        </LinearGradient>

        <LinearGradient
          colors={["#fff", "#fff"]}
          //start={{ x: 0, y: 0 }}
          //end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Pressable
            //style={styles.button}
            onPress={() => {
              router.replace("/logIn");
            }}
          >
            <Text style={styles.buttonText}>Inicia Sesion</Text>
          </Pressable>
        </LinearGradient>
        {/* <Link href={"/logIn"} style={styles.button}>
          Inicia Sesion
        </Link> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2ecc71",
    height: height,
  },
  gif: {
    width: 400,
    height: 400,
    margin: "auto",
  },
  button: {
    margin: 10,
    backgroundColor: "#27b4ad",
    height: 50,
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    color: "#fff",
    borderRadius: 5,
    marginLeft: 33,
    marginRight: 33,
  },
  buttonsContainer: {
    backgroundColor: "black",
    elevation: 20,
    borderRadius: 6,
    //height: 540,
    //margin: 25,
    paddingBottom: 80,
    backgroundColor: "#2DA5F7",
    marginTop: "auto",
    borderTopRightRadius: 70,
    elevation: 20,
    paddingTop: 60,
  },
  image: {
    height: 300,
    width: 300,
    margin: "auto",
  },
  title: {
    //fontWeight: "bold",
    fontSize: 30,
    color: "#fff",
    textAlign: "center",
    margin: 20,
    //fontFamily: "grand-casino",
  },
  buttonText: {
    color: "#2DA5F7",
    textAlign: "center",
    //fontWeight: "bold",
    fontSize: 28,
    //fontFamily: "grand-casino",
    
  },
});

export { MainComponent };
