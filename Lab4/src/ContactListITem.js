import { StyleSheet, TouchableHighlight, View, Image } from "react-native"
import { Text } from "react-native-paper"


const ContactListITem = ({ name, avatar, phone, onPress }) => {
    return (
        <TouchableHighlight underlayColor="grey"
        style={styles.container}
        onPress={onPress}>
            <View style={styles.contactInfo}>
                <Image source={{uri: avatar}} style={styles.avatar} />
                <View style={styles.details}>
                    <Text style={styles.title}>
                        {name}
                    </Text>
                    <Text style={styles.subTitle}>
                        {phone}
                    </Text>
                </View>
            </View>

        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 50,
        marginTop: 0,
        
    },
    contactInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 24,
        paddingBottom: 24,
        borderBlockColor: "grey",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    avatar: {
        borderRadius: 50,
        width: 50,
        height: 50,
    },
    details: {
        justifyContent: "center",
        flex: 1,
        marginLeft: 25,
    },
    title: {
        fontWeight: "bold",
        color: "black",
        fontSize: "16"
    },
    subTitle: {
        fontSize: 14,
        color: "blue",
        marginTop: 4,
    }
});

export default ContactListITem;