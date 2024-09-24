import React from "react";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { UserContext } from "./UserContext";
const RafflesContext = React.createContext();


function RaffleProvaider({ children }) {
  const { userConfirm } = React.useContext(UserContext);
  const [titleRaffle, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [prize, setPrize] = React.useState("");
  const [descriptionPrize, setDescriptionPrize] = React.useState("");
  const [price, setPrice] = React.useState("");

  const defTitle = (text) => {
    setTitle(text);
  };
  const defDescription = (text) => {
    setDescription(text);
  };
  const defPrize = (text) => {
    setPrize(text);
  };
  const defDescriptionPeize = (text) => {
    setDescriptionPrize(text);
  };
  const defPrice = (text) => {
    const validation = /^[0-9]*$/;
    if (validation.test(text)) {
      setPrice(text);
    }
  };

  const [lista, setLista] = React.useState([]);
  React.useEffect(()=>{
    const numeros = [];
    for (let i = 0; i < 100; i++) {
      const numero = i.toString().padStart(2, '0');
      numeros.push(numero);
    }
    // Actualizamos el estado con la lista generada
    setLista(numeros);
  },[])

  const saveRaffle = async () => {
    const docData = {
      titulo: titleRaffle,
      descripcion: description,
      premio: prize,
      descripcionPremio: descriptionPrize,
      precio: price,
      usuario: userConfirm.uid,
    };
    const raffleRef = await addDoc(collection(db, "raffles"), docData);
    const ticketsSubcollectionRef = collection(raffleRef, "boletos");

    for(var i = 0; i<=100; i++){
      await setDoc(doc(ticketsSubcollectionRef, `${i}`), {
          label:`${i}`,
          value:lista[i],
          disabled: false,
          user: null,
      });
    }
    
    // await setDoc(doc(ticketsSubcollectionRef, "boleto2"), {
    //   boleto1: {
    //     id: "2",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto3"), {
    //   boleto1: {
    //     id: "3",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto4"), {
    //   boleto1: {
    //     id: "4",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto5"), {
    //   boleto1: {
    //     id: "5",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto6"), {
    //   boleto1: {
    //     id: "6",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto7"), {
    //   boleto1: {
    //     id: "8",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto1"), {
    //   boleto1: {
    //     id: "1",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto1"), {
    //   boleto1: {
    //     id: "1",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto1"), {
    //   boleto1: {
    //     id: "1",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto1"), {
    //   boleto1: {
    //     id: "1",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto1"), {
    //   boleto1: {
    //     id: "1",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto1"), {
    //   boleto1: {
    //     id: "1",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto1"), {
    //   boleto1: {
    //     id: "1",
    //     user: null,
    //     disponible: true,
    //   }
    // });
    // await setDoc(doc(ticketsSubcollectionRef, "boleto1"), {
    //   boleto1: {
    //     id: "1",
    //     user: null,
    //     disponible: true,
    //   }
    // });
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
        defDescriptionPeize,
        defPrice,
        saveRaffle,
      }}
    >
      {children}
    </RafflesContext.Provider>
  );
}

export { RafflesContext, RaffleProvaider };
