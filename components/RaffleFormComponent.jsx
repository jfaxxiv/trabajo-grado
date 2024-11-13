import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Platform,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { RafflesContext } from "../contexts/RafflesContext";
import { Link, Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

const { height } = Dimensions.get("window");

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
    defDescriptionPrize, 
    defPrice,
    saveRaffle,
    pickImage,
    image,
    uploading,
    rule, 
    defRule
  } = React.useContext(RafflesContext);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: "Loteria del Valle", value: "lottery" },
    { label: "Personalizado", value: "personalized" },
  ]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          // Hide the header for this route
          headerStyle: { backgroundColor: "#2DA5F7" },
          headerShown: true,
          headerTitleAlign: "center",
          headerTitle: "¡Crea una Rifa!",
          headerTintColor: "white",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.replace("/menu");
              }}
            >
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Titulo</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Titulo"
          onChangeText={defTitle}
          value={titleRaffle}
          placeholderTextColor="#fff"
        />
        {/* <Text style={styles.label}>Descripcion</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Descripcion Rifa"
          value={description}
          multiline={true}
          numberOfLines={4}
          onChangeText={defDescription}
          placeholderTextColor="#fff"
        />
        {/* <Text style={styles.label}>Premio</Text> */}
        <View style={styles.prizeContainer}>
          <TextInput
            style={styles.inputPrize}
            placeholder="Premio"
            onChangeText={defPrize}
            value={prize}
            placeholderTextColor="#fff"
          />
          

          <Pressable onPress={pickImage}>
            <Feather
              name="upload"
              size={50}
              color="#fff"
              style={{ textAlign: "center" }}
            />
            <Text style={{ color: "#fff", fontSize: 15 }}>Subir Imagen</Text>
          </Pressable>
        </View>
        {/* <Text style={styles.label}>Descripcion del premio</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Descripcion Premio"
          value={descriptionPrize}
          multiline={true}
          numberOfLines={4}
          onChangeText={defDescriptionPrize}
          placeholderTextColor="#fff"
        />
        {/* <Text style={styles.label}>Precio de cada boleta</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Precio"
          onChangeText={defPrice}
          value={price}
          keyboardType="numeric"
          placeholderTextColor="#fff"
        />
        <DropDownPicker
          open={open}
          value={rule}
          items={items}
          setOpen={setOpen}
          setValue={defRule}
          setItems={setItems}
          multiple={false} 
        />
        
      </View>
      {/* <Button title="Confirmar" onPress = {() => {
        saveRaffle ()
        console.log(image);
        //router.replace("/menu")
      }} 
      disabled={uploading}
        /> */}
      <LinearGradient colors={["#2DE5F7", "#2DA5F7"]} style={styles.button}>
        <Pressable
          onPress={() => {
              saveRaffle();
              router.replace("/menu");
              console.log(typeof value);
           
          }}
        >
          <Text style={styles.buttonText}>Confirmar</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    backgroundColor: "#2ecc71",
    elevation: 20,
    height: height,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
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
  inputContainer: {
    backgroundColor: "#2ecc71",
    margin: 32,
  },
  prizeContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    gap: 20,
  },
  inputPrize: {
    marginBottom: 40,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 6,
    height: 60,
    fontSize: 20,
    textDecoration: "none",
    color: "#fff",
    paddingVertical: 0,
    width: 250,
  },
  buttonText: {
    color: "#fff",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#27b4ad",
    height: 60,
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
    fontSize: 25,
  },
});

export { RafflesFormComponent };
