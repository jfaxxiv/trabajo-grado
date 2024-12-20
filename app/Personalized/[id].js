import { View, Text,Pressable } from "react-native";
import React from "react";
import Winner from "../../components/PersonalizedWinnerComponent";

import { Link, Stack, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const winner = () => {
  return (
    <View>
      <Winner/>
    </View>
  );
};

export default winner;