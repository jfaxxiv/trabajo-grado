import React from "react";
import { View, Button } from "react-native";
import { MainComponent } from '../components/MainComponent'
import { TicketsRaffles } from '../components/TicketsRaffles'
import { MenuComponent } from '../components/MenuComponent'
import { ProfileComponent } from '../components/ProfileComponent'


export default function index() {
  return (
    <View>
      <MainComponent />
      {/* <MenuComponent /> */}
      {/* <TicketsRaffles /> */}
      {/* <ProfileComponent /> */}
    </View>
  );
}


