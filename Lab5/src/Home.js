import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { IconButton } from "react-native-paper";
import { AppTheme, getListOfService, getUser, setCurrentService } from "./store";


const Home = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "white",
        },

        topHeader: {
            width: "100%",
            backgroundColor: AppTheme.colors.primary,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 10,
            alignItems: "center",
        },

        username: {
            fontSize: 23,
            color: "#FFF",
            fontWeight: "bold",
        },

        logo: {
            width: "100%",
            height: 60,
        },

        body: {
            flex: 1,
            padding: 8,
        },

        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },

        title: {
            fontSize: 15,
            fontWeight: "bold",
            marginBottom: 10,
            marginTop: 10,
        },

        item: {
            borderColor: "#e0e0e0",
            borderWidth: 1,
            width: "100%",
            borderRadius: 8,
            padding: 16,
            marginBottom: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },

        itemContent: {
            fontSize: 17,
            fontWeight: "bold",
        },

        price: {

        }
    })

    const [services, setServices] = useState([]);
    const [user, setUser] = useState(null);

    const fetchUserAndServices = async () => {
        try {
            const userData = await getUser();
            setUser(userData);

            const services = await getListOfService();
            setServices(services);
        } catch (error) {
            console.error("Fetching error: ", error);
        }
    };

    useEffect(() => {
        // setCurrentService(null);
        fetchUserAndServices();
    }, []);


    const renderItem = ({ item: service }) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => {
                setCurrentService(service)
                navigation.navigate("Service Detail", { service })
                }}>
                <Text style={styles.itemContent}>{service.name}</Text>
                <Text style={styles.price}>{service.price} đ</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <Text style={styles.username}>{user ? user.name : "Loading..."}</Text>
                <IconButton
                    icon={"account-circle"}
                    iconColor={"#FFF"}
                    size={30}
                    onPress={() => { }}
                />
            </View>
            <View style={styles.body}>
                <Image
                    style={styles.logo}
                    source={require('./assets/image.png')}></Image>
                <View style={styles.header}>
                    <Text style={styles.title}>Danh sách dịch vụ</Text>
                    <IconButton
                        icon={"plus-circle"}
                        iconColor="#EF506B"
                        size={40}
                        onPress={() => { navigation.navigate("Service") }}
                    />
                </View>
                <FlatList
                    data={services}
                    renderItem={renderItem}
                    keyExtractor={({ id }) => id}
                >
                </FlatList>
            </View>
        </View>
    );

}

export default Home;