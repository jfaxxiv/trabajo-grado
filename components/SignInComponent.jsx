import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font"


const { height } = Dimensions.get("window");

function SignInComponent() {
  const {
    email,
    password,
    warning,
    defEmail,
    defPassword,
    defConfirmPassword,
    register,
    confirmPassword,
    registerSucces,
    setRegisterSucces,
    copyUser,
  } = React.useContext(UserContext);
  const [fontsLoaded, setFontsLoaded] = React.useState(false)

  React.useEffect(() => {
    if(!fontsLoaded){
      loadFonts();
    }
  })
  const loadFonts = async () => {
    await Font.loadAsync({
      'grand-casino': require("../assets/fonts/Grand-Casino-Demo.otf")
    })
    setFontsLoaded(true)
  }
  if(!fontsLoaded){
    return(<View/>)
  }
  return (
    <View style={styles.container}>
      {/* <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#27b4ad" },
          headerTitle: "",
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25, 
          },
          headerTitleAlign: "center",
        }}
      /> */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              router.replace("/");
            }}
          >
            <Ionicons name="arrow-back-outline" size={30} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Unete</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Correo"
            onChangeText={defEmail}
            value={email}
            placeholderTextColor="#fff"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            onChangeText={defPassword}
            value={password}
            secureTextEntry={true}
            placeholderTextColor="#fff"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            onChangeText={defConfirmPassword}
            value={confirmPassword}
            secureTextEntry={true}
            placeholderTextColor="#fff"
          />

          <LinearGradient
            colors={["#2DE5F7", "#2DA5F7"]}
            style={styles.button}
          >
            <Pressable
              onPress={() => {
                register();
                if (registerSucces === true) {
                  copyUser()
                  router.replace("/menu");

                }
              }}
            >
              <Text style={styles.buttonText}>Registrate</Text>
            </Pressable>
          </LinearGradient>

          <Text style={styles.warning}>{warning}</Text>
        </View>
      </ScrollView>
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
    fontFamily:"grand-casino",
  },
  header: {
    
    backgroundColor: "#2DA5F7",
    height: 230,
    borderBottomLeftRadius: 70,
    paddingLeft: 32,
    paddingTop: 70,
  },
  title: {
    //fontWeight: "bold",
    fontSize: 70,
    fontFamily:"grand-casino",
    color: "#fff",
    marginTop: 25,
    // textAlign: "center",
    //margin:20,
    // paddingVertical:30
    elevation:10
  },
  input: {
    fontFamily:"grand-casino",
    marginBottom: 40,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 6,
    height: 60,
    fontSize: 20,
    textDecoration: "none",
    //
    //borderBottomWidth: 2,
    color: "#fff",
    paddingVertical: 0,
    
  },
  warning: {
    color: "red",
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    //backgroundColor: "#fff",
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
    //fontWeight: "bold",
    fontSize: 30,
    fontFamily:"grand-casino"
  },
  formContainer: {
    margin: 32,
  },
});

export { SignInComponent };
