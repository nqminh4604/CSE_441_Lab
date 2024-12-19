
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { AppTheme, saveUser } from "./store";

const LoginScreen = ({ navigation }) => {


    const [phone, setPhone] = useState("0373007856");
    const [password, setPassword] = useState("123");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!phone || !password) {
            Alert.alert("Validation Error", "Please fill in both fields.");
            return;
        }

        try {
            setLoading(true);
            const user = await axios.post("https://kami-backend-5rs0.onrender.com/auth"
                , { phone, password }
                , { timeout: 5000 });
            console.log("this is user response: ", user.data);
            saveUser(user.data);
            setLoading(false)
            navigation.navigate("Main");
        } catch (error) {
            console.error("Error fetching: ", error);
            setLoading(false);
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} disabled={loading}
                onPress={() => handleLogin()}>
                <Text style={styles.buttonText}>{loading ? "Loading..." : "Log in"}</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 50,
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: AppTheme.colors.primary,
        marginBottom: 24,
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
