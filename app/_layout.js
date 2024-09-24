import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
import { RaffleProvaider } from "../contexts/RafflesContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

const _layout = () => {
  return (
    <>
      <UserProvider>
        <RaffleProvaider>
          <Stack />
        </RaffleProvaider>
      </UserProvider>
    </>
  );
};

export default _layout;
