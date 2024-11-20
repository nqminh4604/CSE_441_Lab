
import axios from "axios";
import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AppTheme, saveUser } from "./store";

const LoginScreen = ({ navigation }) => {


    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        axios.post("https://kami-backend-5rs0.onrender.com/auth", { phone: phone, password: password })
            .then(response => {
                console.log("this is user response: ", response.data);
                saveUser(response.data);
                navigation.navigate("Home");
            })
            .catch(e => {
                Alert.alert("No user", "Invalid user, please try again!");
            }).finally(
                setLoading(false)
            )

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Styles.container}>
                <Text style={Styles.title}>Login</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone}
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={[Styles.button, loading && Styles.buttonDisabled]} disabled={loading}
                    onPress={handleLogin}>
                    <Text style={Styles.buttonText}>{loading ? "Loading..." : "Log in"}</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 48,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: AppTheme.colors.primary,
        marginBottom: 24,
        marginTop: 72,
    },
    input: {
        borderColor: AppTheme.colors.border,
        borderWidth: 1,
        width: "100%",
        marginTop: 12,
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
export default LoginScreen;
