import React, { FC, useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Image, Text} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type RootStackparamList ={
  list: undefined,
  splash: undefined
}
const SplashScreen:FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackparamList>>();
  const scaleAnim = useRef(new Animated.Value(1)).current; 
  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1.6, 
      duration: 2500, 
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("list");
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: "https://images2.imgbox.com/a3/99/qswRYzE8_o.png", 
        }}
        style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
        {/* <Text style={styles.logoText}> SpaceX Explorer</Text> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    // backgroundColor:"black"
  },
    logoText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  image: {
    width: 200,
    height: 200,
  },
});
