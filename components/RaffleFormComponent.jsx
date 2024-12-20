import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Dimensions,
  Pressable,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";
import { RafflesContext } from "../contexts/RafflesContext";
import { Link, Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

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
    defRule,
    startDailyCheck,
    fetchDataValle,
    date,
    defDate
  } = React.useContext(RafflesContext);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    { label: "Loteria del Valle", value: "valle" },
    { label: "Loteria de Medellin", value: "medellin" },
    { label: "Personalizado", value: "personalized" },
  ]);

  
  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    defDate(currentDate);
  };
  const showDatePicker = () => {
    setShow(true);
  };

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
              size={40}
              color="#fff"
              style={{ textAlign: "center" }}
            />
            <Text style={{ color: "#fff", fontSize: 14 }}>Subir Imagen</Text>
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
          <View style={styles.pickerContainer}>

        <DropDownPicker
          open={open}
          value={rule}
          items={items}
          setOpen={setOpen}
          setValue={defRule}
          setItems={setItems}
          multiple={false} 
          style={styles.picker}
          dropDownContainerStyle={styles.dropDownStyle}
          />
          </View>
        <View style={{marginTop:10}}>
         <Button 
         onPress={showDatePicker} 
         title="Seleccionar Fecha"
         color="#2DA5F7"
          />
          {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={onChange}
        />

      )}
      </View>
      </View>
      <LinearGradient colors={["#2DE5F7", "#2DA5F7"]} style={styles.button}>
        <Pressable
          onPress={() => {
              saveRaffle();
              router.replace("/menu");
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
    marginBottom: 20,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 6,
    height: 40,
    fontSize: 15,
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
    height: 40,
    fontSize: 15,
    textDecoration: "none",
    color: "#fff",
    paddingVertical: 0,
    width: 200,
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
    marginTop:50,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
  },
  dropDownStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  pickerContainer: {
    width: "100%",
    zIndex: 300, // Asegura que el picker esté sobre otros elementos
  },
});

export { RafflesFormComponent };
