import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

export default customerDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
})
const customerDetail = () => {
  const customer = useSelector((state) => state.customer.selectedCustomer)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {customer.name}</Text>
      <Text style={styles.text}>Email: {customer.email}</Text>
      <Text style={styles.text}>Phone: {customer.phone}</Text>
    </View>
  )
}