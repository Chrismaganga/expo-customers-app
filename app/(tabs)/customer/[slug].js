import { StyleSheet, Text, View } from 'react-native';

import React from 'react';
import { useRoute } from '@react-navigation/native';

const CustomerDetail = () => {
    const route = useRoute();
    const { slug } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Customer Detail</Text>
            <Text style={styles.slug}>Slug: {slug}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    slug: {
        fontSize: 18,
    },
});

export default CustomerDetail;