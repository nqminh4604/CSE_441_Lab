import { Alert, StyleSheet, View } from "react-native";
import ContactThum from "./ContactThum";
import DetailListIt from "./DetailListIt";
import { IconButton } from "react-native-paper";
import { useState } from "react";


const ProfileContact = ({ route }) => {
    const { contact } = route.params;
    const { id, avatar, name, email, phone, cell, favorite } = contact;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        avatarSection: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue"
        },
        detailSection: {
            flex: 1,
            backgroundColor: "white",
        },
    });

    // Local state for favorite status
    const [isFavorite, setIsFavorite] = useState(contact.favorite);

    // Toggle favorite status
    const handleFavoritePress = () => {
        setIsFavorite((prevState) => !prevState);
        // Additional logic for persisting the favorite status can be added here.
        Alert.alert(`${name} has been ${isFavorite ? "removed from" : "added to"} favorites.`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThum avatar={avatar} name={name} phone={phone} ></ContactThum>
            </View>
            <View style={styles.detailSection}>
                <DetailListIt icon="mail" title="Email" subtitle={email}></DetailListIt>
                <DetailListIt icon="phone" title="Work" subtitle={phone}></DetailListIt>
                <DetailListIt icon="smartphone" title="Personal" subtitle={cell}></DetailListIt>
                <View style={{ alignItems: "center" }}>
                    <IconButton
                        icon={favorite == true ? "star-check" : "star-check-outline"}
                        iconColor="#663399"
                        size={20}
                        onPress={handleFavoritePress}
                    />
                </View>
            </View>
        </View>
    );

}

export default ProfileContact;