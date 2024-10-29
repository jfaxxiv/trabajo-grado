import React from "react";
import { View, Button } from "react-native";
import { MainComponent } from '../components/MainComponent'
import { TicketsRaffles } from '../components/TicketsRaffles'
import { MenuComponent } from '../components/MenuComponent'
import { ProfileComponent } from '../components/ProfileComponent'
import { RafflesFormComponent } from "../components/RaffleFormComponent";


export default function index() {
  return (
    <View>
      <MainComponent />
      {/* <MenuComponent /> */}
      {/* <TicketsRaffles /> */}
      {/* <ProfileComponent /> */}
      {/* <RafflesFormComponent /> */}
    </View>
  );
}


