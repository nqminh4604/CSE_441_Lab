import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppTheme, getListOfCustomer } from "./store";
import { IconButton } from "react-native-paper";

const Customer = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);

    const loadScreen = async () => {
        try {
            const listOfCus = await getListOfCustomer();
            setCustomers(listOfCus);
        } catch (error) {
            console.error("Fetching error: ", error);
        }
    };

    useEffect(() => {
        const loadList = navigation.addListener('focus', () => loadScreen());
        return loadList;
    }, [navigation]);

    const renderItem = ({ item: customer }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate("Detail Customer", { id: customer._id }) }}>
                <View style={styles.left}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        <Text style={styles.label}>Customer: </Text>
                        {customer.name}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        <Text style={styles.label}>Phone: </Text>
                        {customer.phone}
                    </Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        <Text style={styles.label}>Total money: </Text>
                        {customer.totalSpent}
                    </Text>
                </View>
                <View style={styles.right}>
                    <IconButton
                        icon={'crown'}
                        iconColor={AppTheme.colors.primary}
                        size={30}
                        style={styles.icon}
                    />
                    <Text style={styles.rank}>Guest</Text>
                </View>
            </TouchableOpacity >);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={customers}
                renderItem={renderItem}
                keyExtractor={({ id }) => id}
            ></FlatList>
            <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("Add Customer")}>
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
        width: "60%",
    },
    right: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        color: "#808080",
        fontWeight: "bold"
    },
    icon: {
        marginBottom: -15,
    },
    rank: {
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
});

export default Customer;