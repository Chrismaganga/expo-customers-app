import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../store/customerSlice';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;

export default function AddCustomer() {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
        if (!phone.trim()) newErrors.phone = 'Phone is required';
        if (!street.trim()) newErrors.street = 'Street address is required';
        if (!city.trim()) newErrors.city = 'City is required';
        if (!state.trim()) newErrors.state = 'State is required';
        else if (state.length !== 2) newErrors.state = 'State should be 2 characters';
        if (!zip.trim()) newErrors.zip = 'ZIP code is required';
        else if (zip.length !== 5) newErrors.zip = 'ZIP should be 5 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const newCustomer = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                phone,
                address: {
                    street,
                    city,
                    state,
                    zip
                }
            };
            
            dispatch(addCustomer(newCustomer));
            router.back();
        }
    };

    const renderError = (field) => {
        if (errors[field]) {
            return (
                <View style={styles.errorContainer}>
                    <MaterialIcons name="error-outline" size={16} color="#ef4444" />
                    <Text style={styles.errorText}>{errors[field]}</Text>
                </View>
            );
        }
        return null;
    };

    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <LinearGradient
                colors={['#4ade80', '#22c55e']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <Text style={styles.headerTitle}>Add New Customer</Text>
                <Text style={styles.headerSubtitle}>Enter customer details below</Text>
            </LinearGradient>

            <View style={styles.formContainer}>
                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    <View style={styles.inputGroup}>
                        <View>
                            <View style={[styles.inputContainer, errors.firstName && styles.inputError]}>
                                <MaterialIcons name="person" size={20} color="#22c55e" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="First Name"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                            {renderError('firstName')}
                        </View>
                        <View>
                            <View style={[styles.inputContainer, errors.lastName && styles.inputError]}>
                                <MaterialIcons name="person" size={20} color="#22c55e" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                            {renderError('lastName')}
                        </View>
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    <View style={styles.inputGroup}>
                        <View>
                            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                                <MaterialIcons name="email" size={20} color="#22c55e" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                            {renderError('email')}
                        </View>
                        <View>
                            <View style={[styles.inputContainer, errors.phone && styles.inputError]}>
                                <MaterialIcons name="phone" size={20} color="#22c55e" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone"
                                    value={phone}
                                    onChangeText={setPhone}
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                            {renderError('phone')}
                        </View>
                    </View>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <View style={styles.inputGroup}>
                        <View>
                            <View style={[styles.inputContainer, errors.street && styles.inputError]}>
                                <MaterialIcons name="home" size={20} color="#22c55e" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Street Address"
                                    value={street}
                                    onChangeText={setStreet}
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                            {renderError('street')}
                        </View>
                        <View>
                            <View style={[styles.inputContainer, errors.city && styles.inputError]}>
                                <MaterialIcons name="location-city" size={20} color="#22c55e" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="City"
                                    value={city}
                                    onChangeText={setCity}
                                    placeholderTextColor="#94a3b8"
                                />
                            </View>
                            {renderError('city')}
                        </View>
                        <View style={styles.inputRow}>
                            <View style={{ flex: 1, marginRight: 8 }}>
                                <View style={[styles.inputContainer, errors.state && styles.inputError]}>
                                    <MaterialIcons name="flag" size={20} color="#22c55e" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="State"
                                        value={state}
                                        onChangeText={setState}
                                        maxLength={2}
                                        autoCapitalize="characters"
                                        placeholderTextColor="#94a3b8"
                                    />
                                </View>
                                {renderError('state')}
                            </View>
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <View style={[styles.inputContainer, errors.zip && styles.inputError]}>
                                    <MaterialIcons name="local-post-office" size={20} color="#22c55e" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ZIP Code"
                                        value={zip}
                                        onChangeText={setZip}
                                        keyboardType="numeric"
                                        maxLength={5}
                                        placeholderTextColor="#94a3b8"
                                    />
                                </View>
                                {renderError('zip')}
                            </View>
                        </View>
                    </View>
                </View>

                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Add Customer</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        padding: isTablet ? 32 : 24,
        paddingTop: Platform.OS === 'ios' ? 60 : 24,
    },
    headerTitle: {
        fontSize: isTablet ? 32 : 24,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: isTablet ? 18 : 16,
        color: '#ffffff',
        opacity: 0.9,
    },
    formContainer: {
        padding: isTablet ? 32 : 16,
        maxWidth: isTablet ? 800 : '100%',
        width: '100%',
        alignSelf: 'center',
    },
    formSection: {
        marginBottom: 24,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: isTablet ? 24 : 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    sectionTitle: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: '600',
        color: '#22c55e',
        marginBottom: 16,
    },
    inputGroup: {
        gap: 12,
    },
    inputContainer: {
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    inputError: {
        borderColor: '#ef4444',
        borderWidth: 1,
    },
    inputIcon: {
        padding: 12,
        backgroundColor: '#f8fafc',
    },
    input: {
        flex: 1,
        paddingVertical: isTablet ? 16 : 12,
        paddingHorizontal: 12,
        fontSize: isTablet ? 16 : 15,
        color: '#0f172a',
    },
    inputRow: {
        flexDirection: 'row',
        marginTop: 12,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        paddingHorizontal: 4,
    },
    errorText: {
        color: '#ef4444',
        fontSize: isTablet ? 14 : 12,
        marginLeft: 4,
    },
    submitButton: {
        backgroundColor: '#22c55e',
        padding: isTablet ? 20 : 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: isTablet ? 32 : 24,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: isTablet ? 18 : 16,
        fontWeight: '600',
    },
});