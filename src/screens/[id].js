import { useLocalSearchParams, router } from 'expo-router';
import { View, StyleSheet, ScrollView, Platform, Dimensions, Text, Pressable, Alert, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteCustomer, updateCustomer } from '../store/customerSlice';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;

export default function CustomerDetails() {
  const { id } = useLocalSearchParams();
  const dispatch = useDispatch();
  const customerState = useSelector(state => state.customer);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(null);
  
  const customer = customerState?.customers?.find(c => c.id === Number(id));

  const handleEditPress = () => {
    setEditedCustomer(customer);
    setIsEditing(true);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Customer",
      "Are you sure you want to delete this customer?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            dispatch(deleteCustomer(Number(id)));
            router.replace('/customers');
          }
        }
      ]
    );
  };

  const handleSave = () => {
    if (!editedCustomer.name.trim() || !editedCustomer.email.trim() || !editedCustomer.phone.trim()) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }
    dispatch(updateCustomer(editedCustomer));
    setIsEditing(false);
  };

  if (customerState?.loading) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="hourglass-empty" size={48} color="#2563eb" />
        <Text style={styles.messageText}>Loading...</Text>
      </View>
    );
  }

  if (customerState?.error) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="error-outline" size={48} color="#ef4444" />
        <Text style={styles.messageText}>{customerState.error}</Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.button, styles.errorButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  if (!customer) {
    return (
      <View style={styles.centerContainer}>
        <MaterialIcons name="person-off" size={48} color="#ef4444" />
        <Text style={styles.messageText}>Customer not found</Text>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [styles.button, styles.errorButton, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="person" size={isTablet ? 40 : 32} color="#1e40af" />
            </View>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={editedCustomer.name}
                onChangeText={(text) => setEditedCustomer({ ...editedCustomer, name: text })}
                placeholder="Customer Name"
              />
            ) : (
              <Text style={styles.titleText}>{customer.name}</Text>
            )}
          </View>
          <View style={styles.actionButtons}>
            {isEditing ? (
              <>
                <Pressable
                  onPress={handleSave}
                  style={({ pressed }) => [styles.button, styles.saveButton, pressed && styles.buttonPressed]}
                >
                  <MaterialIcons name="check" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>Save</Text>
                </Pressable>
                <Pressable
                  onPress={() => setIsEditing(false)}
                  style={({ pressed }) => [styles.button, styles.cancelButton, pressed && styles.buttonPressed]}
                >
                  <MaterialIcons name="close" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  onPress={handleEditPress}
                  style={({ pressed }) => [styles.button, styles.editButton, pressed && styles.buttonPressed]}
                >
                  <MaterialIcons name="edit" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
                <Pressable
                  onPress={handleDelete}
                  style={({ pressed }) => [styles.button, styles.deleteButton, pressed && styles.buttonPressed]}
                >
                  <MaterialIcons name="delete" size={24} color="#ffffff" />
                  <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.infoRow}>
            <MaterialIcons name="email" size={24} color="#2563eb" />
            <View style={styles.infoContent}>
              <Text style={styles.label}>Email</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedCustomer.email}
                  onChangeText={(text) => setEditedCustomer({ ...editedCustomer, email: text })}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <Text style={styles.value}>{customer.email}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={24} color="#2563eb" />
            <View style={styles.infoContent}>
              <Text style={styles.label}>Phone</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={editedCustomer.phone}
                  onChangeText={(text) => setEditedCustomer({ ...editedCustomer, phone: text })}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                />
              ) : (
                <Text style={styles.value}>{customer.phone}</Text>
              )}
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={24} color="#2563eb" />
            <View style={styles.infoContent}>
              <Text style={styles.label}>Address</Text>
              {isEditing ? (
                <>
                  <TextInput
                    style={styles.input}
                    value={editedCustomer.address.street}
                    onChangeText={(text) => setEditedCustomer({
                      ...editedCustomer,
                      address: { ...editedCustomer.address, street: text }
                    })}
                    placeholder="Street Address"
                  />
                  <View style={styles.addressRow}>
                    <TextInput
                      style={[styles.input, { flex: 1, marginRight: 8 }]}
                      value={editedCustomer.address.city}
                      onChangeText={(text) => setEditedCustomer({
                        ...editedCustomer,
                        address: { ...editedCustomer.address, city: text }
                      })}
                      placeholder="City"
                    />
                    <TextInput
                      style={[styles.input, { width: 80, marginRight: 8 }]}
                      value={editedCustomer.address.state}
                      onChangeText={(text) => setEditedCustomer({
                        ...editedCustomer,
                        address: { ...editedCustomer.address, state: text }
                      })}
                      placeholder="State"
                      maxLength={2}
                    />
                    <TextInput
                      style={[styles.input, { width: 100 }]}
                      value={editedCustomer.address.zip}
                      onChangeText={(text) => setEditedCustomer({
                        ...editedCustomer,
                        address: { ...editedCustomer.address, zip: text }
                      })}
                      placeholder="ZIP"
                      keyboardType="numeric"
                      maxLength={5}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Text style={styles.value}>{customer.address.street}</Text>
                  <Text style={styles.value}>
                    {customer.address.city}, {customer.address.state} {customer.address.zip}
                  </Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    maxWidth: isTablet ? 800 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: isTablet ? 32 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    } : Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } : {
      elevation: 4,
    }),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: isTablet ? 80 : 64,
    height: isTablet ? 80 : 64,
    borderRadius: isTablet ? 40 : 32,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  titleText: {
    fontSize: isTablet ? 32 : 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: isTablet ? 16 : 8,
    padding: isTablet ? 24 : 16,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    } : Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } : {
      elevation: 4,
    }),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  label: {
    fontSize: isTablet ? 16 : 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
  },
  value: {
    fontSize: isTablet ? 18 : 16,
    color: '#0f172a',
    marginBottom: 2,
  },
  messageText: {
    fontSize: isTablet ? 20 : 18,
    color: '#64748b',
    marginTop: 16,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isTablet ? 20 : 16,
    paddingVertical: isTablet ? 12 : 8,
    borderRadius: 8,
    gap: 8,
  },
  editButton: {
    backgroundColor: '#2563eb',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
  },
  saveButton: {
    backgroundColor: '#059669',
  },
  cancelButton: {
    backgroundColor: '#64748b',
  },
  errorButton: {
    backgroundColor: '#2563eb',
    marginTop: 16,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: isTablet ? 12 : 8,
    fontSize: isTablet ? 18 : 16,
    color: '#0f172a',
    backgroundColor: '#ffffff',
    marginBottom: 8,
  },
  nameInput: {
    fontSize: isTablet ? 32 : 24,
    fontWeight: '700',
    color: '#0f172a',
    padding: 0,
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    gap: 8,
  },
});