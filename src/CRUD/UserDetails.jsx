import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import api from "../utils/Api/Api";
import { useSelector } from "react-redux";

const UserDetails = (props) => {
  const selector = useSelector((state) => state.user)
  console.log("@@@@@@@@@@@@@@@@@2",selector)
  const route = useRoute();
  console.log("the state log is here",selector.name,selector.email)


  const navigation = useNavigation();
  const [user, setUser] = useState([])

  const handledit = (name,email,id) => {
    console.log("handle edit has been called here", name,email,id)
    navigation.navigate("editUser", {name,email,id });
  };

  const handledelete =async(id)=>{
    await delfun(id)
    data_get()  
  };

  const delfun =async(id)=>{
    try {
      const del_response = await api.delete(`users/${id}`);
      const del_res  = del_response?.status;
      console.log(del_res)
      
    } catch (error) {
      console.log("error has been caught here",error)
    }
  };

  const data_get = async () => {
    try {
      const api_data = await api.get("users");
      setUser(api_data?.data);
      console.log("api_data_received_is_this:", api_data?.data);
    } catch (error) {
      console.log("the error is caught here!!",error)
    }
  };

  useEffect(() => {
    data_get();
  }, []);

  const handladd = () => {
    navigation.navigate("addUser");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "lightgrey" }}>
      <Text style={{ fontSize: 20, alignSelf: "center", marginTop: 70 }}>
        CRUD APP
      </Text>
      <View style={{ marginLeft: 30, marginVertical: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Users</Text>
        <View
          style={{
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
            borderWidth: 1,
            borderColor: "grey",
            marginVertical: 30,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginHorizontal: 30,
          }}
        >
          <EvilIcons name="search" size={25} color="black" />
          <TextInput
            style={style.textinputbox}
            placeholder="Search"
            placeholderTextColor="lightblack"
          ></TextInput>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <TouchableOpacity style={style.editscreen} onPress={handledit}>
            <Text>EDIT Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.editscreen} onPress={handladd}>
            <Text>ADD Screen</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            borderWidth: 1,
            borderColor: "grey",
            marginHorizontal: 44,
            marginVertical: 20,
            padding: 10,
            borderRadius: 8,
            flexDirection: "column",
            gap:10,
          }}
        >
          {user?.map((items) => (
            <View key={items.id} style={{ marginBottom: 10,borderWidth:2,borderColor:"green"}}>
              <View
                style={{
                  borderWidth:2,
                  borderColor:"red",
                  padding: 5,
                  borderRadius: 10,
                  flexDirection:"column"
                }}
              >
                <Text>{items.name}</Text>
                <Text>{items.email}</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 5 }}>
                <TouchableOpacity style={style.editscreen} onPress={()=>handledit(items?.name,items?.email,items?._id)}>
                  <Text>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style ={style.editscreen} onPress={()=>handledelete(items?.id)}>
                  <Text>
                    DELETE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.editscreen} onPress={handladd}>
                  <Text>ADD</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        </ScrollView>
      </View>
    </View>
  );
};

export default UserDetails;

const style = StyleSheet.create({
  textinputbox: {
    borderRadius: 7,
    height: 45,
    alignSelf: "center",
    width: 500,
    // borderWidth:1,
    // borderColor:"red"
  },
  editscreen: {
    borderWidth: 1,
    elevation: 8,
    borderColor: "rgba(157, 154, 154, 0.6)",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "grey",
  },
});


