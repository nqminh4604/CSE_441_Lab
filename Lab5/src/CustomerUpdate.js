import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AppTheme, getUser } from "./store";
import { useEffect, useState } from "react";
import axios from "axios";

const CustomerUpdateScreen = ({ route, navigation }) => {

    const Styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 8,
        },
        title: {
            fontWeight: "bold",
        },
        input: {
            borderColor: AppTheme.colors.border,
            borderWidth: 1,
            width: "100%",
            marginBottom: 12,
            borderRadius: 10,
            paddingLeft: 12,
        },
        button: {
            backgroundColor: AppTheme.colors.primary,
            borderRadius: 10,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 12,
            marginTop: 16,
        },
        buttonText: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#FFF",
        },
        buttonDisabled: {
            backgroundColor: "#CCC"
        },
    });

    const { customer } = route.params;
    const [name, setName] = useState(customer.name);
    const [phone, setPhone] = useState(customer.phone);
    const [loading, setLoading] = useState(false);

    const updateService = async (id, name, phone) => {
        setLoading(true);
        const { token } = await getUser();
        console.log("Get user successfully: " + token);

        try {
            await axios.put(`https://kami-backend-5rs0.onrender.com/Customers/${id}`,
                {
                    name: name,
                    phone: phone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                },
            );
            Alert.alert("Successful", "Updated successfully!")
            navigation.popToTop();
        } catch (error) {
            Alert.alert('Error', 'Failed to update the customer. Phone already exited');
            console.error('Update failed:', error._response || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Customer name *</Text>
            <TextInput
                style={Styles.input}
                placeholder="Input a customer name"
                value={name}
                onChangeText={setName}
            />
            <Text style={Styles.title}>Phone *</Text>
            <TextInput
                style={Styles.input}
                placeholder="Input phone number"
                value={phone}
                onChangeText={setPhone}
            />
            <TouchableOpacity style={[Styles.button, loading && Styles.buttonDisabled]}
                onPress={() => updateService(customer._id, name, phone)} disabled={loading}>
                <Text style={Styles.buttonText}>{loading ? "Updating..." : "Update"}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CustomerUpdateScreen;