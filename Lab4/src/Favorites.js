import "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ContactThum from "./ContactThum";
import { FlatList, StyleSheet, View } from "react-native";


const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
    const { contacts } = useSelector((state) => state);
    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThum
                avatar={avatar}
                onPress={() => navigation.navigate("ProfileContact", { contact: item })}
            />
        );
    };
    const favorites = contacts.filter((contact) => contact.favorite);
    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={keyExtractor}
                numColumns={3}
                contentContainerStyle={styles.list}
                renderItem={renderFavoriteThumbnail}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "White",
        justifyContent: "center",
        flex: 1,
    },
    list: {
        alignItems: "center",
    },
});

export default Favorites;
