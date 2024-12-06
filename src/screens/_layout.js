import { Tabs } from "expo-router";
import { StyleSheet, Platform, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { FadeIn } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;

const RootLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        headerShadowVisible: false,
        tabBarLabelStyle: styles.tabBarLabel,
        headerTitleAlign: 'left',
        headerLeftContainerStyle: styles.headerLeftContainer,
        headerRightContainerStyle: styles.headerRightContainer,
        unmountOnBlur: true,
        animation: 'none',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={26} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: "Customers",
          tabBarIcon: ({ color }) => (
            <Entypo name="users" size={26} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="addCustomer"
        options={{
          title: "Add Customer",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person-add" size={26} color={color} />
          ),
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="[id]"
        options={{
          href: null,
          headerShown: true,
        }}
      />
    </Tabs>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    height: Platform.OS === 'ios' ? 110 : 70,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    } : Platform.OS === 'ios' ? {
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
    } : {
      elevation: 4,
    }),
  },
  headerTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  headerLeftContainer: {
    paddingLeft: isTablet ? 24 : 16,
  },
  headerRightContainer: {
    paddingRight: isTablet ? 24 : 16,
  },
  tabBar: {
    backgroundColor: '#ffffff',
    height: Platform.OS === 'ios' ? 88 : 60,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    } : Platform.OS === 'ios' ? {
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
    } : {
      elevation: 8,
    }),
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});