import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AppTheme } from './store';

const TransactionDetail = ({ route }) => {
    const { transaction } = route.params;
    console.log(transaction);

    const renderServices = ({ item: service }) => {
        return (
            <View style={styles.row}>
                <Text style={{fontSize: 12}}>{service.name}</Text>
                <Text style={styles.infoLabel}>x{service.quantity}</Text>
                <Text style={styles.infoValue}>{service.price * service.quantity} ₫</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>General information</Text>
                <View style={styles.row}>
                    <Text style={styles.infoLabel}>Transaction code</Text>
                    <Text style={styles.infoValue}>{transaction.id}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoLabel}>Customer</Text>
                    <Text style={styles.infoValue}>{transaction.customer.name} - {transaction.customer.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoLabel}>Creation time</Text>
                    <Text style={styles.infoValue}>{transaction.createdAt}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Services list</Text>
                <FlatList
                    data={transaction.services}
                    renderItem={renderServices}
                ></FlatList>
                <View style={styles.totalRow}>
                <Text style={styles.infoLabel}>Total</Text>
                <Text style={styles.totalValue}>{transaction.priceBeforePromotion} ₫</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Cost</Text>
                <View style={styles.row}>
                    <Text style={styles.infoLabel}>Amount of money</Text>
                    <Text style={styles.infoValue}>{transaction.priceBeforePromotion} ₫</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.infoLabel}>Discount</Text>
                    <Text style={styles.infoValue}>{transaction.priceBeforePromotion - transaction.price != 0 ? "-" + Math.round((transaction.priceBeforePromotion - transaction.price) * 100) / 100 : 0 } ₫</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total payment</Text>
                    <Text style={styles.finalAmount}>{transaction.price} ₫</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppTheme.colors.primary,
        marginBottom: 8,
        width: "100%"
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    left: {
        width: "60%",
    },
    infoLabel: {
        fontWeight: "bold",
        fontSize: 13,
        color: '#808080',
    },
    infoValue: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000',
    },
    right: {
        width: "40%"

    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        borderTopColor: "#ccc",
        borderTopWidth: 1,
        paddingTop: 8,
    },
    totalLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444',
    },
    totalValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    finalAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: AppTheme.colors.primary,
    },
});

export default TransactionDetail;
