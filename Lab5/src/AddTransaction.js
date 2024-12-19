import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AppTheme } from "./store";
import { Icon } from "react-native-paper";

const AddTransaction = ({ navigation }) => {

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [summary, setSummary] = useState(0);


    const handleServiceToggle = (service) => {
        const newServices = { ...selectedServices };
        if (newServices[service.id]) {
            delete newServices[service.id];
        } else {
            newServices[service.id] = { ...service, quantity: 1 };
        }
        setSelectedServices(newServices);
        calculateSummary(newServices);
    };

    const handleQuantityChange = (id, amount) => {
        const newServices = { ...selectedServices };
        if (newServices[id]) {
            const newQuantity = newServices[id].quantity + amount;
            if (newQuantity > 0) {
                newServices[id].quantity = newQuantity;
            } else {
                delete newServices[id];
            }
        }
        setSelectedServices(newServices);
        calculateSummary(newServices);
    };

    const calculateSummary = (services) => {
        const total = Object.values(services).reduce(
            (sum, service) => sum + service.price * service.quantity,
            0
        );
        setSummary(total);
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.label}>Customer *</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedCustomer}
                        onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
                    >
                        <Picker.Item label="Select customer" style={styles.picker} value={null} />
                        {customers.map((customer) => (
                            <Picker.Item key={customer.id} label={customer.name} value={customer.id} />
                        ))}
                    </Picker>
                </View>

                <FlatList
                    data={services}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        console.log(item);

                        const isSelected = !!selectedServices[item.id];
                        return (
                            <View style={styles.serviceContainer}>
                                <View style={styles.row}>
                                    {!isSelected ? (
                                        <TouchableOpacity
                                            style={styles.checkbox}
                                            onPress={() => handleServiceToggle(item)}
                                        >
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={styles.checkedBox}
                                            onPress={() => handleServiceToggle(item)}
                                        >
                                            <Icon source={"check"} color="white" />
                                        </TouchableOpacity>)
                                    }
                                    <Text style={styles.serviceName}>{item.name}</Text>
                                </View>

                                {isSelected && (
                                    <View style={styles.controls}>
                                        <View style={styles.row} >
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => handleQuantityChange(item.id, -1)}
                                            >
                                                <Text style={{ textAlign: "center" }}>-</Text>
                                            </TouchableOpacity>
                                            <View style={styles.button}>
                                                <Text style={{ textAlign: "center" }}>{selectedServices[item.id].quantity}</Text>
                                            </View>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => handleQuantityChange(item.id, 1)}
                                            >
                                                <Text style={{ textAlign: "center" }}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedCustomer}
                                                onValueChange={(itemValue) => setSelectedCustomer(itemValue)}
                                            >
                                                <Picker.Item label="Select customer" style={styles.picker} value={null} />
                                                {customers.map((customer) => (
                                                    <Picker.Item key={customer.id} label={customer.name} value={customer.id} />
                                                ))}
                                            </Picker>
                                        </View>
                                    </View>
                                )}

                                {isSelected && (
                                    <Text style={styles.price}>
                                        Price: {(item.price).toLocaleString()} đ
                                    </Text>
                                )}
                            </View>
                        );
                    }}
                />
            </View>

            <TouchableOpacity style={styles.summaryButton}>
                <Text style={styles.summaryText}>See summary: ({summary.toLocaleString()} đ)</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    body: {
        margin: "2%"
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginHorizontal: 5,
        marginBottom: "5%",
    },
    picker: {
        fontSize: 14
    },
    serviceContainer: {
        marginBottom: 15,
    },
    row: {
        flexDirection: "row"
    },
    checkbox: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: "#FFF"
    },
    checkedBox: {
        borderWidth: 1,
        borderColor: 'orange',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        borderRadius: 25,
        backgroundColor: "orange",
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: '#ccc',
        height: 40,
        width: 40,
        textAlign: "center",
        justifyContent: "center",
    },
    price: {
        color: AppTheme.colors.primary,
        marginTop: 10,
    },
    summaryButton: {
        backgroundColor: AppTheme.colors.primary,
        padding: 15,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: "8%"
    },
    summaryText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AddTransaction;