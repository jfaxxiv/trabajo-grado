import React from "react";
import { auth } from "../firebase/config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const UserContext = React.createContext();

function UserProvider({ children }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [warning, setWarning] = React.useState("");
  const [userConfirm, setUserConfirm] = React.useState(null);
  const [registerSucces, setRegisterSucces] = React.useState(false);

  const defEmail = (text) => {
    setEmail(text);
  };
  const defPassword = (text) => {
    setPassword(text);
  };
  const defConfirmPassword = (text) => {
    setConfirmPassword(text);
  };

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserConfirm(user);
      } else {
        setUserConfirm(null);
      }
    });
    return () => unsubscribe();
  }, []);

  //registrar usuario
  const register = () => {
    if (password === confirmPassword) {
      setRegisterSucces(true);
      createUserWithEmailAndPassword(auth, email, password);
      // .then((userCredential) => {
      //     // Signed in
      //     const user = userCredential.user

      //     // ...
      // })
      // .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     // ..
      // });
    } else {
      setWarning("Las contraseñas no coinciden");
    }
  };
  //iniciar sesion con usuario
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setWarning("No se encontro el Usuario");
      });
  };
  const logOut = () => {
    auth.signOut();
  };

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        warning,
        setWarning,
        defEmail,
        defPassword,
        defConfirmPassword,
        register,
        login,
        auth,
        confirmPassword,
        setConfirmPassword,
        userConfirm,
        registerSucces,
        setRegisterSucces,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
