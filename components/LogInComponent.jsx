import React from "react";
import { Link, Stack, router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import * as Font from "expo-font";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

function LogInComponent() {
  const { email, password, warning, defEmail, defPassword, login } =
    React.useContext(UserContext);

  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }
  });
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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <LinearGradient
        colors={["#2DE5F7", "#2DA5F7"]}
        style={styles.header}
      >
        <Pressable
          onPress={() => {
            router.replace("/");
          }}
        >
          <Ionicons name="arrow-back-outline" size={30} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Bienvenido</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="correo"
          onChangeText={defEmail}
          value={email}
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="contraseña"
          onChangeText={defPassword}
          value={password}
          placeholderTextColor="#fff"
        />
        <LinearGradient
          colors={["#2DE5F7", "#2DA5F7"]}
          style={styles.button}
        >
          <Pressable
            onPress={() => {
              login();
              router.replace("/menu");
            }}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </LinearGradient>
        <Link href={"/updatePassword"} asChild>
          <Text style={styles.password}>¿Olvidaste tu contraseña?</Text>
        </Link>
      </View>

      <Text style={styles.warning}>{warning}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: height,
    paddingHorizontal: 0,
    backgroundColor: "#2ecc71",
    elevation: 20,
    display: "flex",
    flex: 1,
    fontFamily: "grand-casino",
  },
  header: {
    backgroundColor: "#2DA5F7",
    height: 230,
    borderBottomLeftRadius: 70,
    paddingLeft: 32,
    paddingTop: 70,
  },
  title: {
    fontSize: 70,
    fontFamily: "grand-casino",
    color: "#fff",
    marginTop: 25,
    elevation: 10,
  },
  input: {
    fontFamily: "grand-casino",
    marginBottom: 40,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 6,
    height: 60,
    fontSize: 20,
    textDecoration: "none",
    color: "#fff",
    paddingVertical: 0,
  },
  warning: {
    color: "red",
    marginTop: 10,
  },
  button: {
    margin: 0,
    backgroundColor: "#27b4ad",
    height: 50,
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
    fontSize: 30,
    fontFamily: "grand-casino",
  },
  password: {
    color: "#fff",
    marginVertical: 15,
    fontSize: 21,
    fontFamily: "grand-casino",
    textDecorationLine: "underline",
  },
  formContainer: {
    margin: 32,
  },
});

export { LogInComponent };
