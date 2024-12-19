import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppTheme } from "./store";


const CustomerDetail = ({ navigation, route }) => {
    const { id } = route.params;
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const loadScreen = navigation.addListener("focus", async () => {
            try {
                const response = await axios.get(
                    `https://kami-backend-5rs0.onrender.com/Customers/${id}`
                );
                setCustomer(response.data);
            } catch (error) {
                console.error("Fetching Error", error);
            }
        });
        return () => loadScreen();
    }, [navigation]);

    const renderItem = ({ item: transaction }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Transaction Detail", { transaction })}>
                <View style={styles.left}>
                    <Text style={styles.title}>{transaction.id} - {transaction.createdAt} <Text style={styles.status}>{transaction.status == "cancelled" ? "- Cancelled" : ""}</Text></Text>
                    <FlatList
                        data={transaction.services}
                        renderItem={renderServices}
                        keyExtractor={({ _id }) => _id.toString()}
                    ></FlatList>
                </View>

                <View style={styles.right}>
                    <Text style={styles.totalPrice}>{transaction.price} đ</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderServices = ({ item: service }) => {
        return (
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
            >- {service.name}</Text>
        )
    }

    if (customer) {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>General information</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name: </Text>
                        <Text style={styles.text}>{customer.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone: </Text>
                        <Text style={styles.text}>{customer.phone}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Total spent: </Text>
                        <Text style={styles.totalSpent}>{customer.totalSpent} đ</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Time: </Text>
                        <Text style={styles.text}></Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Last Update: </Text>
                        <Text style={styles.text}></Text>
                    </View>
                </View>

                <View style={[styles.card, { flex: 1 }]}>
                    <Text style={styles.sectionTitle}>Transaction History</Text>
                    <FlatList
                        data={customer.transactions}
                        renderItem={renderItem}
                        keyExtractor={({ _id }) => _id.toString()}
                    ></FlatList>
                </View>
            </View>
        );
    }
}

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
    },
    label: {
        fontWeight: "bold",
        fontSize: 13,
        color: '#000',
    },
    text: {
        fontSize: 13,
        color: '#000',
    },
    totalSpent: {
        fontSize: 13,
        fontWeight: 'bold',
        color: AppTheme.colors.primary,
    },
    item: {
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 5,
        margin: 5,
        borderRadius: 8,
        flexDirection: "row",
        alignContent: "space-between",
    },
    left: {
        width: "75%",
        flex: 1
    },
    right: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold"
    },
    status: {
        color: "red",
        fontWeight: "bold",
    },
    totalPrice: {
        color: AppTheme.colors.primary,
        fontWeight: "bold",
    },
});

export default CustomerDetail;