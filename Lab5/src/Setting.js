import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppTheme } from "./store";

const Setting = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
                onPress={() => navigation.reset(
                    {
                        index: 0,
                        routes: [{ name: "Login" }],
                    })}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    button: {
        backgroundColor: AppTheme.colors.primary,
        borderRadius: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
});

export default Setting;