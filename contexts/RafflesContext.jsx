import React from "react";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { UserContext } from "./UserContext";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import BackgroundTimer from "react-native-background-timer";
import axios from "axios";
const RafflesContext = React.createContext();

function RaffleProvaider({ children }) {
  const { userConfirm } = React.useContext(UserContext);
  const [titleRaffle, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [prize, setPrize] = React.useState("");
  const [descriptionPrize, setDescriptionPrize] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  // const [scrapedData, setScrapedData] = React.useState([]);
  // const [htmlContent, setHtmlContent] = React.useState('');

  const defTitle = (text) => {
    setTitle(text);
  };
  const defDescription = (text) => {
    setDescription(text);
  };
  const defPrize = (text) => {
    setPrize(text);
  };
  const defDescriptionPrize = (text) => {
    setDescriptionPrize(text);
  };
  const defPrice = (num) => {
    setPrice(Number(num));
  };

  const [lista, setLista] = React.useState([]);
  React.useEffect(() => {
    const numeros = [];
    for (let i = 0; i < 100; i++) {
      const numero = i.toString().padStart(2, "0");
      numeros.push(numero);
    }
    // Actualizamos el estado con la lista generada
    setLista(numeros);
  }, []);

  const pickImage = async () => {
    //pedir permisos para acceder a galeria
    // const  result = await ImagePicker.requestMediaLibraryPermissionsAsync()
    // if (result.granted === false ){
    //   alert("Permiso Denegado")
    //   return
    // }

    //abrir galeria
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(pickerResult.assets[0].uri);

    if (pickerResult.canceled === false) {
      setImage(pickerResult.assets[0].uri);
      console.log(image);
    }
  };

  const saveRaffle = async () => {
    setUploading(true);
    let imageUrl = null;

    if (image) {
      try {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageRef = ref(storage, `${prize}.jpeg`);

        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    }

    const docData = {
      titulo: titleRaffle,
      descripcion: description,
      premio: prize,
      descripcionPremio: descriptionPrize,
      precio: price,
      usuario: userConfirm.uid,
      imageUrl: imageUrl,
      fechaCreacion: Timestamp.now(),
    };

    const raffleRef = await addDoc(collection(db, "raffles"), docData);
    const ticketsSubcollectionRef = collection(raffleRef, "boletos");

    for (var i = 0; i <= 100; i++) {
      await setDoc(doc(ticketsSubcollectionRef, `${i}`), {
        number: lista[i],
        diponible: true,
        user: null,
      });
    }

    setUploading(false);
  };

  const checkDay = () => {
    const today = new Date().getDay();
    if (today == 4) {
      console.log("es jueves");
      return true;
    } else {
      console.log("no es jueves");
      return false;
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://api.scraperapi.com?api_key=495eea07294cce137757f77e02ab36de&url=https://loteriasdehoy.co/loteria-del-valle"
      );
      const htmlContent = response.data;
      const regex = /<span\s+class=["']redondo premio1["'][^>]*>(.*?)<\/span>/g;
      const matches = [...htmlContent.matchAll(regex)];
      const contents = matches.map((match) => match[1]);
      const scrapedData = contents;
      const winNumber = Number(scrapedData.join(""));
      const data = {
        number: winNumber,
        fecha: Timestamp.now(),
      };
      const collectionRef = collection(db, "winNumbers");
      const docRef = addDoc(collectionRef, data);
      console.log("guardo");
      //console.log(htmlContent);
      //console.log(`esto es: ${scrapedData}`);
    } catch (error) {
      console.log(error);
    }
  };

  const startDailyCheck = async () => {
    try {
      BackgroundTimer.setInterval(
        async () => {
          const isCorrectDay = checkDay();
          if (isCorrectDay) {
            await fetchData();
          }
        },
        24 * 60 * 60 * 1000
      );
    } catch (error) {
      console.log(error);
    }
  };

  const winner = async (IDs) => {
    // Filtra los boletos no disponibles
    const unavailableTickets = IDs.filter((ticket) => !ticket.disponible);

    if (unavailableTickets.length > 0) {
      const randomIndex = Math.floor(Math.random() * unavailableTickets.length);
      return unavailableTickets[randomIndex];
    } else {
      console.log("No hay boletos no disponibles.");
      return null;
    }
  };

  const getUser = async (id, fun) => {
    try {
      // Referencia al documento específico usando su ID
      const docRef = doc(db, "usuarios", id);

      // Obtener el documento
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // El documento fue encontrado
        const docData = docSnapshot.data(); // Obtienes los datos del documento
        fun(docData.email); // Aquí puedes hacer lo que necesites con los datos
      } else {
        // El documento no existe
        console.log("No se encontró el documento");
      }
    } catch (error) {
      console.error("Error al obtener el documento: ", error);
    }
  };

  return (
    <RafflesContext.Provider
      value={{
        titleRaffle,
        setTitle,
        description,
        setDescription,
        prize,
        setPrize,
        descriptionPrize,
        setDescriptionPrize,
        price,
        setPrice,
        defTitle,
        defDescription,
        defPrize,
        defDescriptionPrize,
        defPrice,
        saveRaffle,
        pickImage,
        image,
        fetchData,
        winner,
        getUser,
      }}
    >
      {children}
    </RafflesContext.Provider>
  );
}

export { RafflesContext, RaffleProvaider };
