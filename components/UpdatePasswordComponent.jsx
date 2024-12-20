import React from "react";
import { View, Text, Button, TextInput, StyleSheet,Pressable } from "react-native";
import { auth } from "../firebase/config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";


// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage) 
// });

function UpdatePasswordComponent(props) {
  const [email, setEmail] = React.useState("");
  const defEmail = (text) => {
    setEmail(text);
  };

  const emailUpdatePassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        props.navigation.navigate("LogIn");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <Pressable
              style={styles.button}
              onPress={() => {
                router.replace("/");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
          ),
        }}
      />
      <Text style={styles.label}>
        Ingresa el correo con el que te registraste
      </Text>
      <TextInput
        style={styles.input}
        placeholder="correo"
        onChangeText={defEmail}
        value={email}
      />
      <Button title="Enviar" onPress={emailUpdatePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  warning: {
    color: "red",
    marginTop: 10,
  },
});

export { UpdatePasswordComponent };