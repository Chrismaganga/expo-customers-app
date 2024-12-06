import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;

const CustomersScreen = () => {
    const customers = useSelector(state => state.customer.customers);
    const regions = useSelector(state => state.region.regions);
    const router = useRouter();

    const getCustomerRegion = (customerState) => {
        const region = regions.find(r => r.states.includes(customerState));
        return region ? region.name : 'Unknown';
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.item}
            onPress={() => router.push(`/${item.id}`)}
        >
            <View style={styles.itemContent}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="person" size={isTablet ? 32 : 24} color="#1e40af" />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
                        <View style={styles.regionContainer}>
                            <MaterialIcons name="location-on" size={16} color="#0d9488" />
                            <Text style={styles.regionText}>{getCustomerRegion(item.address.state)}</Text>
                        </View>
                    </View>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="email" size={16} color="#64748b" />
                            <Text style={styles.details}>{item.email}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="home" size={16} color="#64748b" />
                            <Text style={styles.details}>
                                {item.address.street}, {item.address.city}, {item.address.state} {item.address.zip}
                            </Text>
                        </View>
                    </View>
                </View>
                <MaterialIcons 
                    name="chevron-right" 
                    size={isTablet ? 28 : 24} 
                    color="#64748b"
                    style={styles.chevron}
                />
            </View>
        </TouchableOpacity>
    );

    const EmptyList = () => (
        <View style={styles.emptyContainer}>
            <MaterialIcons name="people-outline" size={isTablet ? 64 : 48} color="#94a3b8" />
            <Text style={styles.emptyText}>No customers found</Text>
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => router.push('/addCustomer')}
            >
                <Text style={styles.addButtonText}>Add Customer</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Customers</Text>
                <Text style={styles.headerSubtitle}>
                    {customers.length} {customers.length === 1 ? 'Customer' : 'Customers'}
                </Text>
            </View>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={EmptyList}
            />
            {customers.length > 0 && (
                <TouchableOpacity 
                    style={styles.fab}
                    onPress={() => router.push('/addCustomer')}
                >
                    <MaterialIcons name="add" size={24} color="#ffffff" />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        padding: isTablet ? 32 : 20,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        alignItems: 'center',
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
    headerTitle: {
        fontSize: isTablet ? 32 : 24,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: isTablet ? 18 : 16,
        color: '#64748b',
        fontWeight: '500',
    },
    listContent: {
        padding: isTablet ? 16 : 8,
        maxWidth: isTablet ? 800 : '100%',
        alignSelf: 'center',
        width: '100%',
    },
    item: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginVertical: 6,
        ...(Platform.OS === 'web' ? {
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
        } : Platform.OS === 'ios' ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        } : {
            elevation: 4,
        }),
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: isTablet ? 20 : 16,
    },
    iconContainer: {
        width: isTablet ? 56 : 48,
        height: isTablet ? 56 : 48,
        borderRadius: isTablet ? 28 : 24,
        backgroundColor: '#eff6ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: isTablet ? 20 : 18,
        fontWeight: '600',
        color: '#0f172a',
        flex: 1,
    },
    regionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    regionText: {
        fontSize: isTablet ? 14 : 13,
        color: '#0d9488',
        fontWeight: '500',
        marginLeft: 4,
    },
    detailsContainer: {
        gap: 6,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    details: {
        fontSize: isTablet ? 15 : 14,
        color: '#475569',
        flex: 1,
    },
    chevron: {
        marginLeft: 16,
    },
    separator: {
        height: isTablet ? 12 : 8,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        marginTop: isTablet ? 64 : 32,
    },
    emptyText: {
        fontSize: isTablet ? 20 : 18,
        color: '#64748b',
        marginTop: 16,
        marginBottom: 24,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#1e40af',
        paddingHorizontal: isTablet ? 24 : 20,
        paddingVertical: isTablet ? 16 : 12,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: isTablet ? 16 : 14,
        fontWeight: '600',
    },
    fab: {
        position: 'absolute',
        right: isTablet ? 32 : 20,
        bottom: isTablet ? 32 : 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#1e40af',
        alignItems: 'center',
        justifyContent: 'center',
        ...(Platform.OS === 'web' ? {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            ':hover': {
                transform: 'scale(1.05)',
            },
        } : Platform.OS === 'ios' ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
        } : {
            elevation: 8,
        }),
    },
});

export default CustomersScreen;