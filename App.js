import { StyleSheet, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import Customers from './app/components/Customers';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>customers-relations@24</Text>
      <Customers/>
      <StatusBar style="auto" />   
       </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
