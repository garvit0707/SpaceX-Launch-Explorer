import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import api from "../utils/Api/Api";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "../redux/Slice/UserSlice";


const UserDetails = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const navigation = useNavigation();

  const fetchUser = async () => {
    try {
      const payload = {
        name: name,
        email: email,
      };
      const apicall = await api.post("users", payload);
      console.log("apicall is here", apicall.data);
    } catch (error) {
      console.log("the error comes here!!", error);
    }
  };


  const handleTouch = () => {
    fetchUser();
    dispatch(saveUser({name,email}))
    navigation.navigate("detailedUser", { name, email });
  };

  const handleuser = ()=>{
    navigation.navigate("detailedUser")
  };

  const handlename = (text) => {
    setName(text);
    console.log("handlename is called", name);
  };

  const handlemail = (text) => {
    setEmail(text);
    console.log("handleemail is called", email);
  };
  return (
    <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
      <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 70 }}>
        CRUD APP
      </Text>
      <View style={{ marginLeft: 30, marginVertical: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>ADD USERS</Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: "grey",
            marginHorizontal: 20,
            paddingHorizontal: 20,
            backgroundColor: "#c8c7c7ff",
            marginVertical: 20,
            borderRadius: 12,
            padding: 10,
            height: "300",
          }}
        >
          <View style={{ marginVertical: 30 }}>
            <Text>Name</Text>
            <TextInput
              style={style.textinputbox}
              placeholder="Enter Name"
              value={name}
              onChangeText={handlename}
            ></TextInput>
          </View>

          <View>
            <Text>Email</Text>
            <TextInput
              style={style.textinputbox}
              placeholder="Enter Email"
              value={email}
              onChangeText={handlemail}
            ></TextInput>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey1",
              alignItems: "center",
              marginHorizontal: 100,
              marginTop: 30,
              padding: 10,
              borderRadius: 8,
              backgroundColor: "grey",
            }}
          >
            <TouchableOpacity onPress={handleTouch}>
              <Text>ADD</Text>
            </TouchableOpacity>
          </View>
            <TouchableOpacity onPress={handleuser} style={{marginTop:30}}>
              <Text>user data</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;

const style = StyleSheet.create({
  textinputbox: {
    borderRadius: 7,
    height: 45,
    // alignSelf:"center",
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
    marginTop: 10,
  },
});
