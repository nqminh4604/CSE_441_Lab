import { useDispatch, useSelector } from "react-redux";
import { fetchContactSuccess, mapContact } from "./store";
import { useEffect } from "react";
import ContactListITem from "./ContactListITem";
import { FlatList, StyleSheet, View } from "react-native";

const keyExtractor = ({ phone }) => phone;

const fetchContacts = async () => {
    const data = await fetch("https://randomuser.me/api/?results=50");
    const ContactData = await data.json();
    return ContactData.results.map(mapContact);
};

const Contacts = ({ navigation }) => {
    const { contacts } = useSelector((state) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchContacts()
            .then(
                cont => {
                    dispatch(fetchContactSuccess(cont));
                }
            )
            .catch(
                e => {
                    console.error("Error ne", e);
                    
                }
            )
    }, [])

    const renderContacts = ({ item }) => {
        const { name, avatar, phone } = item;

        return (
            <ContactListITem name={name}
                avatar={avatar}
                phone={phone}
                onPress={() => navigation.navigate("ProfileContact", { contact: item })}
            ></ContactListITem>
        )
    };

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            flex: 1,
            paddingLeft: 10,
            paddingRight: 10,
        }
    })
    
    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={keyExtractor}
                renderItem={renderContacts}
            ></FlatList>
        </View>
    )

}

export default Contacts;