import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AppTheme, getUser } from "./store";
import axios from "axios";
import { useState } from "react";


const AddCustomer = ({ navigation }) => {

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

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAdd = async (data, token) => {
        try {
            await axios.post(
                `https://kami-backend-5rs0.onrender.com/customers`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                },
            )
            Alert.alert("Success", "Customer added successfully!");
            navigation.pop();
        } catch (error) {
            Alert.alert('Error', 'Failed to add the customer');
            console.error('Add failed:', error.response || error.message);
        } finally {
            setLoading(false);
        }
    }

    const addCustomer = async () => {
        const { token } = await getUser();
        console.log("Get token successfully: " + token);

        const data = {
            name: name,
            phone: phone,
        };

        setLoading(true);

        await handleAdd(data, token);

    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Customer name *</Text>
            <TextInput
                style={Styles.input}
                placeholder="Input a service name"
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
            <TouchableOpacity style={[Styles.button, loading && Styles.buttonDisabled]} onPress={addCustomer} disabled={loading}>
                <Text style={Styles.buttonText}>{loading ? "Adding..." : "Add"}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddCustomer;