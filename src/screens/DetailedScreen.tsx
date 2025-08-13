import React from 'react'
import {View,Text} from "react-native";
import { useRoute } from "@react-navigation/native";


const DetailedScreen = () => {
  const route = useRoute();
  const launch = route.params

  console.log("the launch is @@@@@@@@@@@@@@@@@@@@@@@@@",launch)
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>this is the Detailed screen i haev</Text>
    </View>
  )
}

export default DetailedScreen
