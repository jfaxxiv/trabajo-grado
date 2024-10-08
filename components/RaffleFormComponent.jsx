import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";

import { RafflesContext } from "../contexts/RafflesContext";
import { Link, Stack, router } from "expo-router";

function RafflesFormComponent() {
  const {
    titleRaffle,
    description,
    prize,
    descriptionPrize,
    price,
    defTitle,
    defDescription,
    defPrize,
    defDescriptionPeize,
    defPrice,
    saveRaffle,
  } = React.useContext(RafflesContext);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titulo</Text>
      <TextInput
        style={styles.input}
        placeholder="ingrese un titulo"
        onChangeText={defTitle}
        value={titleRaffle}
      />
      <Text style={styles.label}>Descripcion</Text>
      <TextInput
        style={styles.input}
        placeholder="añade una descripcion"
        value={description}
        multiline={true}
        numberOfLines={4}
        onChangeText={defDescription}
      />
      <Text style={styles.label}>Premio</Text>
      <TextInput
        style={styles.input}
        placeholder="premnio"
        onChangeText={defPrize}
        value={prize}
      />
      <Text style={styles.label}>Descripcion del premio</Text>
      <TextInput
        style={styles.input}
        placeholder="añade una descripcion"
        value={descriptionPrize}
        multiline={true}
        numberOfLines={4}
        onChangeText={defDescriptionPeize}
      />
      <Text style={styles.label}>Precio de cada boleta</Text>
      <TextInput
        style={styles.input}
        placeholder="ingrese un precio"
        onChangeText={defPrice}
        value={price}
        keyboardType="numeric"
      />
      <Button title="Confirmar" onPress = {() => {
        saveRaffle ()
        router.replace("/menu")
      }} 
        />
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
});

export { RafflesFormComponent };