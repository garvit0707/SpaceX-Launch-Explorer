import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import api from '../utils/Api/Api';
import { useDispatch } from 'react-redux';
import { editUsers } from '../redux/Slice/UserSlice';


const UserDetails = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()
  const [newName,setNewName] = useState("");
  const [newEmail,SetNewEmail] = useState("");
  const [ids,setIds] = useState("");


  const {name,email,id} = route.params
  const handleTouch =()=>{
    console.log("handle touched has called here!!!")
    dispatch(editUsers({id,name:newName,email:newEmail}));
    navigation.navigate("detailedUser")
  }


  return (
    <View style={{flex:1,backgroundColor: "lightgrey"}}>
      <Text style ={{fontSize:20,alignSelf:"center",marginTop: 70}}>CRUD APP</Text>
      <View style ={{marginLeft:30,marginVertical:20,}}>
        <Text style={{fontSize:30,fontWeight:"bold"}}>
          EDIT USERS
        </Text>
        
        <View style={{borderWidth:1,borderColor:"grey",marginHorizontal:20,paddingHorizontal:20,backgroundColor:"#c8c7c7ff", marginVertical:20,borderRadius:12,padding:10,height:"300"}}>
          <View style={{marginVertical:30}}>
            <Text>Name</Text>
            <TextInput style={style.textinputbox} onChangeText={(text)=>setNewName(text)} >{name?name: ""}</TextInput>
          </View>

          <View>
            <Text>Email</Text>
            <TextInput style={style.textinputbox} onChangeText={(text)=>SetNewEmail(text)}>{email?email:""}</TextInput>
          </View>
          <View style={{borderWidth:1,borderColor:"black",alignItems:"center",marginHorizontal:100,marginTop:30,padding:10,borderRadius:8,backgroundColor:"grey"}}>
            <TouchableOpacity onPress={handleTouch}>
              <Text>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default UserDetails

const style = StyleSheet.create({
  textinputbox: {
    borderRadius:7,
    height:45,
    // alignSelf:"center",
    borderWidth:1,
    padding: 10,
    borderColor:"black",
    marginTop:10
  },

})