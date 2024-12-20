import React from "react";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  Timestamp,
  getDoc,
  getDocs,
  query,
  where,
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
  const [rule, setRule] = React.useState(null);
  const [searchParam, setSearchParam] = React.useState("");
  const [rafflesFound, setRafflesFound] = React.useState([]);
  const [date, setDate] = React.useState(new Date());

  const defDate = (date) => {
    setDate(date);
  };

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
  const defSearchParam = (text) => {
    setSearchParam(text);
  };
  const defRule = (text) => {
    setRule(text);
  };

  const [lista, setLista] = React.useState([]);
  React.useEffect(() => {
    const numeros = [];
    for (let i = 0; i < 100; i++) {
      const numero = i.toString().padStart(2, "0");
      numeros.push(numero);
    }

    setLista(numeros);
  }, []);

  const pickImage = async () => {


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
      descripcion_premio: descriptionPrize,
      precio: price,
      creador: userConfirm.uid,
      imagen_url: imageUrl,
      metodo_eleccion_ganador: rule,
      fecha_realizacion: date,
      fecha_creacion: Timestamp.now(),
    };
    // titulo: titleRaffle,
    //   descripcion: description,
    //   premio: prize,
    //   descripcion_premio: descriptionPrize,
    //   precio: price,
    //   creador: userConfirm.uid,
    //   imagen_url: imageUrl,
    //   metodo_eleccion_ganador: rule,
    //   fecha_realizacion: date,
    //   fecha_creacion: Timestamp.now(),

    const raffleRef = await addDoc(collection(db, "Rifas"), docData);
    const ticketsSubcollectionRef = collection(raffleRef, "Boletos");

    for (var i = 0; i <= 100; i++) {
      await setDoc(doc(ticketsSubcollectionRef, `${i}`), {
        numero: lista[i],
        disponibilidad: true,
        comprador: null,
      });
    }

    setUploading(false);
  };

  const search = async () => {
    try {
      const raffleRef = collection(db, "Rifas");
      const q = query(raffleRef, where("titulo", "==", searchParam));
      const querySnapshot = await getDocs(q);
      const foundRaffles = [];
      querySnapshot.forEach((doc) => {
        foundRaffles.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setRafflesFound(foundRaffles);
      console.log(rafflesFound);
    } catch (error) {
      console.log(error);
    }
  };



  const fetchDataValle = async (IDs, fun1, fun2) => {
    try {
      const response = await axios.get(
        "http://api.scraperapi.com?api_key=495eea07294cce137757f77e02ab36de&url=https://loteriasdehoy.co/loteria-del-valle"
      );
      const htmlContent = response.data;
      const regex = /<span\s+class=["']redondo premio1["'][^>]*>(.*?)<\/span>/g;
      const matches = [...htmlContent.matchAll(regex)];
      const contents = matches.map((match) => match[1]);
      console.log(contents);
      const scrapedData = contents;
      const winNumber = parseInt(
        scrapedData[scrapedData.length - 2] +
          scrapedData[scrapedData.length - 1]
      ); //Number(scrapedData.join(""));
      const winner = IDs.find((ticket) => ticket.id == winNumber);
      if (winner.disponible) {
        console.log(
          `El numero ganador fue ${winNumber} pero nadie participo con ese numero`
        );
        fun1("(No hubo ganador)");
        fun2(winNumber)
      } else {
        console.log(`El ganador fue el usuario ${winner.user}`);
        //fun(winner.user)
        fun2(winNumber)
        const getUserLottery = async () => {
          try {
          
            const docRef = doc(db, "usuarios", winner.user);
  
            const docSnapshot = await getDoc(docRef);
  
            if (docSnapshot.exists()) {
              const docData = docSnapshot.data();
              fun1(docData.email);
              console.log(docData);
  
              const sendEmail = async () => {
                try {
                  const response = await axios.post(
                    "https://sendemail-xlulfn643a-uc.a.run.app",
                    {
                      email: docData.email,
                    }
                  );
                  console.log(response.data);
                } catch (error) {
                  console.error(error);
                }
              };
              sendEmail();
            } else {
              console.log("No se encontró el documento");
            }
          } catch (error) {
            console.error("Error al obtener el documento: ", error);
          }
        };
        getUserLottery();
      }
      //return winNumber;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataMedellin = async (IDs, fun1, fun2) => {
    try {
      const response = await axios.get(
        "http://api.scraperapi.com?api_key=495eea07294cce137757f77e02ab36de&url=https://loteriasdehoy.co/loteria-de-medellin"
      );
      const htmlContent = response.data;
      const regex = /<span\s+class=["']redondo premio1["'][^>]*>(.*?)<\/span>/g;
      const matches = [...htmlContent.matchAll(regex)];
      const contents = matches.map((match) => match[1]);
      console.log(contents);
      const scrapedData = contents;
      const winNumber = parseInt(
        scrapedData[scrapedData.length - 2] +
          scrapedData[scrapedData.length - 1]
      ); //Number(scrapedData.join(""));
      const winner = IDs.find((ticket) => ticket.id == winNumber);
      if (winner.disponible) {
        console.log(
          `El numero ganador fue ${winNumber} pero nadie participo con ese numero`
        );
        fun1("(No hubo ganador)");
        fun2(winNumber)
      } else {
        console.log(`El ganador fue el usuario ${winner.user}`);
        //fun(winner.user)
        fun2(winNumber)
        const getUserLottery = async () => {
          try {
          
            const docRef = doc(db, "usuarios", winner.user);
  
            const docSnapshot = await getDoc(docRef);
  
            if (docSnapshot.exists()) {
              const docData = docSnapshot.data();
              fun1(docData.email);
              console.log(docData);
  
              const sendEmail = async () => {
                try {
                  const response = await axios.post(
                    "https://sendemail-xlulfn643a-uc.a.run.app",
                    {
                      email: docData.email,
                    }
                  );
                  console.log(response.data);
                } catch (error) {
                  console.error(error);
                }
              };
              sendEmail();
            } else {
              console.log("No se encontró el documento");
            }
          } catch (error) {
            console.error("Error al obtener el documento: ", error);
          }
        };
        getUserLottery();
      }
      //return winNumber;
    } catch (error) {
      console.log(error);
    }
  };

  const winner = async (IDs) => {
    const unavailableTickets = IDs.filter((ticket) => !ticket.disponible);

    if (unavailableTickets.length > 0) {
      const randomIndex = Math.floor(Math.random() * unavailableTickets.length);
      return unavailableTickets[randomIndex];
    } else {
      console.log("No hay boletos no disponibles.");
      return null;
    }
  };

  const lotteryWin = async (num, IDs, fun) => {
    const winner = IDs.find((ticket) => ticket.id == num);
    if (winner.disponible) {
      console.log(
        `El numero ganador fue ${num} pero nadie participo con ese numero`
      );
      fun("(No hubo ganador)");
    } else {
      console.log(`El ganador fue el usuario ${winner.comprador}`);
      //fun(winner.user)
      const getUserLottery = async () => {
        try {
          const docRef = doc(db, "usuarios", winner.comprador);

          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const docData = docSnapshot.data();
            fun(docData.email);
            console.log(docData);

            const sendEmail = async () => {
              try {
                const response = await axios.post(
                  "https://sendemail-xlulfn643a-uc.a.run.app",
                  {
                    email: docData.email,
                  }
                );
                console.log(response.data);
              } catch (error) {
                console.error(error);
              }
            };
            sendEmail();
          } else {
            console.log("No se encontró el documento");
          }
        } catch (error) {
          console.error("Error al obtener el documento: ", error);
        }
      };
      getUserLottery();
    }
  };

  const getUser = async (id, fun) => {
    try {
      const docRef = doc(db, "usuarios", id);

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        fun(docData.email);
        console.log(docData);

        const sendEmail = async () => {
          try {
            const response = await axios.post(
              "https://sendemail-xlulfn643a-uc.a.run.app",
              {
                email: docData.email,
              }
            );
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        sendEmail();
      } else {
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
        fetchDataValle,
        winner,
        getUser,
        fetchDataMedellin,
        rule,
        defRule,
        defSearchParam,
        searchParam,
        search,
        rafflesFound,
        lotteryWin,
        date,
        defDate,
      }}
    >
      {children}
    </RafflesContext.Provider>
  );
}

export { RafflesContext, RaffleProvaider };
