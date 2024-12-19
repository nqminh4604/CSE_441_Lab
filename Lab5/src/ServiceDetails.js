import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    label: {
        fontWeight: "bold",
        marginTop: 5,
    },
    menuOption: {
        bottom: 0,
    }
});

const DetailService = ({ route }) => {
    const { service } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Service name:</Text><Text>{service.name}</Text>
            <Text style={styles.label}>Price:</Text><Text>{service.price} đ</Text>
            <Text style={styles.label}>Creator:</Text><Text>{service.createdBy}</Text>
            <Text style={styles.label}>Time:</Text> <Text>{service.createdAt} </Text>
            <Text style={styles.label}>Final update:</Text> <Text>{service.updatedAt} </Text>
        </View >
    );
}

export default DetailService;