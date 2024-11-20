import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const MainTab = () => {
  return (
    <Tabs>
      {/* Welcome Tab */}
      <Tabs.Screen
        name="welcome"
        options={{
          title: "Welcome",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Customers Tab */}
      <Tabs.Screen
        name="customers"
        options={{
          title: "Customers",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="users" size={size} color={color} />
          ),
        }}
      />

      {/* Regions Tab */}
      <Tabs.Screen
        name="regions"
        options={{
          title: "Regions",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="city" size={size} color={color} />
          ),
        }}
      />

      {/* Customer Details Tab */}
      <Tabs.Screen
        name="customerDetail"
        options={{
          title: "Customer Details",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user-alt" size={size} color={color} />
          ),
        }}
      />

      {/* Index Tab */}
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
};

export default MainTab;

const styles = StyleSheet.create({});
