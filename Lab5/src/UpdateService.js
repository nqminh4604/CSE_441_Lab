import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AppTheme, getUser } from "./store";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateScreen = ({ route, navigation }) => {

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

    const { service } = route.params;
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const updateService = async (id, name, price) => {
        setLoading(true);
        const { token } = await getUser();
        console.log("Get user successfully: " + token);
        console.log("Get id service successfully: " + id);

        try {
            await axios.put(`https://kami-backend-5rs0.onrender.com/services/${id}`,
                {
                    id: id,
                    name: name,
                    price: price,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                },
            );
            Alert.alert("Successful", "Updated successfully!")
            navigation.reset(
                {
                    index: 0,
                    routes: [{ name: "Home" }],
                });
        } catch (error) {
            Alert.alert('Error', 'Failed to update the service.');
            console.error('Update failed:', error.response || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>Service name *</Text>
            <TextInput
                style={Styles.input}
                placeholder="Input a service name"
                value={name}
                onChangeText={setName}
            />
            <Text style={Styles.title}>Price *</Text>
            <TextInput
                style={Styles.input}
                placeholder="0"
                value={price}
                onChangeText={setPrice}
            />
            <TouchableOpacity style={[Styles.button, loading && Styles.buttonDisabled]}
                onPress={() => updateService(service._id, name, price)} disabled={loading}>
                <Text style={Styles.buttonText}>{loading ? "Updating..." : "Update"}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default UpdateScreen;