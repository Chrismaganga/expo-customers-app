import { View, Text, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setRegions } from '../store/regionSlice';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isTablet = SCREEN_WIDTH >= 768;

export default function Home() {
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customer.customers);
  const regions = useSelector(state => state.region.regions);
  const regionsLoading = useSelector(state => state.region.loading);

  useEffect(() => {
    // Example regions data - replace with your actual data source
    const sampleRegions = [
      { id: 1, name: 'North', states: ['IL', 'WI', 'MI'] },
      { id: 2, name: 'South', states: ['FL', 'GA', 'AL'] },
      { id: 3, name: 'West', states: ['CA', 'OR', 'WA'] },
    ];
    dispatch(setRegions(sampleRegions));
  }, []);

  const getCustomersByRegion = (regionStates) => {
    return customers?.filter(c => regionStates.includes(c.address.state)).length || 0;
  };

  const getCustomerRegion = (customerState) => {
    const region = regions.find(r => r.states.includes(customerState));
    return region ? region.name : 'Unknown';
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2563eb', '#0d9488']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Customer Manager</Text>
        <Text style={styles.subtitle}>Welcome Back!</Text>
      </LinearGradient>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{customers?.length || 0}</Text>
                <Text style={styles.statLabel}>Total Customers</Text>
              </View>
              {regions.map(region => (
                <View key={region.id} style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {getCustomersByRegion(region.states)}
                  </Text>
                  <Text style={styles.statLabel}>{region.name} Region</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.customersCard}>
            <Text style={styles.statsTitle}>Customer Details</Text>
            {customers?.map((customer) => (
              <View key={customer.id} style={styles.customerItem}>
                <View style={styles.customerHeader}>
                  <Text style={styles.customerName}>{customer.firstName} {customer.lastName}</Text>
                  <Text style={styles.customerRegion}>{getCustomerRegion(customer.address.state)}</Text>
                </View>
                <View style={styles.customerDetails}>
                  <Text style={styles.detailText}>Email: {customer.email}</Text>
                  <Text style={styles.detailText}>Phone: {customer.phone}</Text>
                  <Text style={styles.detailText}>Address: {customer.address.street}, {customer.address.city}, {customer.address.state} {customer.address.zip}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: isTablet ? 32 : 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: isTablet ? 40 : 32,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: isTablet ? 16 : 8,
  },
  subtitle: {
    fontSize: isTablet ? 22 : 18,
    color: '#ffffff',
    fontWeight: '500',
  },
  content: {
    padding: isTablet ? 32 : 16,
    maxWidth: isTablet ? 800 : '100%',
    alignSelf: 'center',
    width: '100%',
    flex: 1,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: isTablet ? 32 : 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  statsTitle: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: isTablet ? 24 : 16,
  },
  statsGrid: {
    flexDirection: isTablet ? 'row' : 'column',
    justifyContent: 'space-around',
    alignItems: isTablet ? 'center' : 'stretch',
    gap: 12,
  },
  statItem: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: isTablet ? 24 : 20,
    alignItems: 'center',
    flex: isTablet ? 1 : undefined,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  statNumber: {
    fontSize: isTablet ? 36 : 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: isTablet ? 8 : 4,
  },
  statLabel: {
    fontSize: isTablet ? 16 : 14,
    color: '#2563eb',
    textAlign: 'center',
  },
  customersCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: isTablet ? 32 : 16,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  customerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 16,
  },
  customerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: '600',
    color: '#2563eb',
  },
  customerRegion: {
    fontSize: isTablet ? 16 : 14,
    color: '#0d9488',
    fontWeight: '500',
  },
  customerDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: isTablet ? 16 : 14,
    color: '#4b5563',
    lineHeight: 20,
  },
});