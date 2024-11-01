import { Image, StyleSheet, TouchableOpacity, View } from "react-native";


const ContactThum = ({ name, phone, textColor, onPress}) => {
    const colorStyle = {
        color: textColor
    };

    const ImageContact = onPress ? TouchableOpacity : View;

    return (
        <View style={styles.container}>
            <ImageContact onPress={onPress}>
                <Image source={{
                    uri: avatar
                }}
                    style={styles.avatar}
                ></Image>
            </ImageContact>

            { name !== "" && <Text style={[styles.name, colorStyle]}>{name}</Text>}

            { phone !== "" && (
                <View style={styles.phoneSection} >
                    
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        marginHorizontal: 15,
        alignItems: "center",
        justifyContent:"center",
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderColor: "white",
        borderWidth: 2,
    },
    name: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 2,
        fontWeight: "bold",
    },
    phoneSection: {
        flexDirection: "row",
        marginTop: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    phone: {
        marginLeft: 4,
        fontSize: 16,
        fontWeight: "bold",
    },
});