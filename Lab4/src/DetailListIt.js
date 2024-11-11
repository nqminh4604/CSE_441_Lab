import { StyleSheet, Text, View } from "react-native";


export default DetailListIt = ({ icon, title, subtitle }) => {

    const styles = StyleSheet.create({
        container: {
            flex: 2,
            flexDirection: "row",
            paddingBottom: 10,
            paddingTop: 10,
            borderBottomColor: "black",
            borderBottomWidth: 2,
        },

        icon: {
            width: "20%",
            justifyContent: "center",
            alignContent: "center"
        },

        detail: {
            width: "80%",
            alignContent: "center"
        },

        title: {
            fontWeight: "bold",
            fontSize: 15,
        },

        subtitle: {
            color: "blue"
        }

    })

    return (
        <View style={styles.container}>
            <View style={styles.avatar}>{icon}</View>
            <View style={styles.detail}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
}