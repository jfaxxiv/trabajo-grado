import { View, Text } from 'react-native'
import React from 'react'
import { MenuComponent } from '../components/MenuComponent'
import { ProfileComponent } from '../components/ProfileComponent'

const menu = () => {
  return (
    <View>
      <MenuComponent />
      {/* <ProfileComponent/> */}
    </View>
  )
}

export default menu