import React from 'react'
import {View,Text,TouchableOpacity} from "react-native";
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList ={
    list: undefined,
    detailed: undefined
};

const ListScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const handlescreen=()=>{
        navigation.navigate("detailed")
    };

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>
        this is the List Screen i have!!
      </Text>
      <TouchableOpacity onPress={handlescreen}>
        <Text>got to the Detailed screen</Text>
      </TouchableOpacity>

    </View>
  )
}

export default ListScreen
