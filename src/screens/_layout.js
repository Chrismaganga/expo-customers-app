import { Slot, Stack, Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const RootLayout = () => {
  return (
    <Tabs.Screen
  name="home"
  options={{
    title: "index",
    tabBarIcon: ({ size, color }) => (
  <MaterialIcons name="home" size={24} color="black" />
    ),
  }}
  />,
    <Tabs>
      <Tabs.Screen
       name="customers"
       options={{
         title: "Customers",
         headerShown: false,
         tabBarIcon: ({ size, color }) => (
           <Entypo name="users"
            size={24} color="black" />
         ),
        }}
      />
      <Tabs.Screen
        name="regions"
        options={{
          title: "Regions",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="city"
            size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen name="index" 
      options={{ href: null }} />
    </Tabs>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});