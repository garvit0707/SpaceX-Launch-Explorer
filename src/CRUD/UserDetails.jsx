import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../redux/Slice/UserSlice";

const UserDetails = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const route = useRoute();
  console.log("the state log is here", selector.name, selector.email);

  const navigation = useNavigation();
  const [user, setUser] = useState([]);

  const handlEdit = (name, email, id) => {
    // console.log("handle edit has been called here", name,email,id)
    navigation.navigate("editUser", { name, email, id });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handlAdd = () => {
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
          <TouchableOpacity style={style.editscreen} onPress={handlEdit}>
            <Text>EDIT Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.editscreen} onPress={handlAdd}>
            <Text>ADD Screen</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={style.scrollContainer}>
          {user?.map((items) => (
            <View
              key={items.id}
              style={style.outerBox}
            >
              <View style={style.detailedContainer}>
                <Text>{items.name}</Text>
                <Text>{items.email}</Text>
              </View>
              <View style={style.buttonContainer}>
                <TouchableOpacity
                  style={style.editscreen}
                  onPress={() =>
                    handlEdit(items?.name, items?.email, items?._id)
                  }
                >
                  <Text>EDIT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.editscreen}
                  onPress={() => handleDelete(items?.id)}
                >
                  <Text>DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.editscreen} onPress={handlAdd}>
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
  scrollContainer: {
    borderWidth: 1,
    borderColor: "grey",
    marginHorizontal: 44,
    marginVertical: 20,
    padding: 10,
    borderRadius: 8,
    flexDirection: "column",
    gap: 10,
  },
  detailedContainer: {
    borderWidth: 2,
    borderColor: "red",
    padding: 5,
    borderRadius: 10,
    flexDirection: "column",
  },
  buttonContainer: { flexDirection: "row", gap: 8, marginTop: 5 },
  outerBox:{ marginBottom: 10, borderWidth: 2, borderColor: "green"}
});
