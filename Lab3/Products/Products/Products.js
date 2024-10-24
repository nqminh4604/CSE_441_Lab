import { useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet, FlatList, Image, SafeAreaView, ScrollView, Button } from "react-native";

export default function Products() {

    const [data, setData] = useState([]);
    const filePath = "https://dummyjson.com/products/";
    useEffect(() => {
        //Alert.alert(filePath);
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((d) => {
                setData(d.products);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });

    const styles = StyleSheet.create({
        title: {
            fontSize: 25,
            fontWeight: "bold",
            margin: 15,
        },

        card: {
            flex: 2,
            flexDirection: "row",
            margin: 20,
            backgroundColor: "#f9f9f9",
        },

        image: {
            width: "25%",
            height: 100,
            marginRight: 10,
        },

        detail: {
            width: "75%",
        },
    });

    return (
        <View>
            <Text style={styles.title}>Product list</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.thumbnail }}
                            />
                            <View style={styles.detail}>
                                <Text>Title: {item.title}</Text>
                                <Text>Description: {item.description}</Text>
                                <Text>Price: {item.price}</Text>
                                <Text>DiscountPercentage: {item.discountPercentage}</Text>
                                <Text>Rating: {item.rating}</Text>
                                <Text>Stock: {item.stock}</Text>
                                <Text>Brand: {item.brand}</Text>
                                <Text>Category: {item.category}</Text>
                            </View>
                            <View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );


}