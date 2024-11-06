import { StyleSheet, View } from "react-native";
import ContactThum from "./ContactThum";


const ProfileContact = ({route}) => {
    const { contact } = route.params;
    const { id, avatar, name, email, phone, cell, favorite } = contact;

    return (
        <View style={styles.container}>
            <View style={styles.avatarSection}>
                <ContactThum avatar></ContactThum>
            </View>
        </View>
    );

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
} 

export default ProfileContact;