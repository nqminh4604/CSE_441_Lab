import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppTheme, getListOfTransaction } from "./store";
import { IconButton } from "react-native-paper";

const Transaction = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);
    const loadScreen = async () => {
        try {
            const listOfTrans = await getListOfTransaction();
            setTransactions(listOfTrans);
        } catch (error) {
            console.error("Fetching failed", error);
        }
    }
    useEffect(() => {
        const loadList = navigation.addListener("focus", () => loadScreen());
        return loadList
    }, [navigation])

    const renderItem = ({ item: transaction }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Transaction Detail", { transaction })}>
                <View style={styles.left}>
                    <Text style={styles.title}>{transaction.id} - {transaction.createdAt} <Text style={styles.status}>{transaction.status == "cancelled" ? "- Cancelled" : ""}</Text></Text>
                    <FlatList
                        data={transaction.services}
                        renderItem={renderServices}
                        keyExtractor={({ _id }) => _id}
                    ></FlatList>
                    <Text style={styles.label}>Customer: {transaction.customer.name}</Text>
                </View>

                <View style={styles.right}>
                    <Text style={styles.totalPrice}>{transaction.price} đ</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderServices = ({ item: service }) => {
        return (
            <Text
                numberOfLines={1}
                ellipsizeMode="tail"
            >- {service.name}</Text>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={({ id }) => id}
            ></FlatList>
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("Add Transaction")}>
                <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    item: {
        borderWidth: 2,
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
    label: {
        color: "#808080",
        fontWeight: "bold"
    },
    totalPrice: {
        color: AppTheme.colors.primary,
        fontWeight: "bold",
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: AppTheme.colors.primary,
        width: 50,
        height: 50,
        borderRadius: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    floatingButtonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    title: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },

});
export default Transaction;