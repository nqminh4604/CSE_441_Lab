import { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from "react-native";

const Products = () => {

    const [data, setData] = useState([]);
    const filePath = "https://dummyjson.com/products/";
    useEffect(() => {
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
        container: {
            backgroundColor: "#FFF",
            marginBottom: 73
        },
        title: {
            fontSize: 25,
            fontWeight: "bold",
            margin: 15,
        },

        card: {
            flex: 2,
            flexDirection: "row",
            margin: 20,
            backgroundColor: "#F9F9F9",
        },

        image: {
            width: "25%",
            height: 100,
        },

        detail: {
            width: "75%",
            padding: 8,
        },

        productName: {
            fontSize: 15,
            fontWeight: "bold",
        },

        productDiscount: {
            color: "green",
        },

        buttonView: {
            flex: 3,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
        },

        detailButton: {
            width: 25,
        },

        addButton: {
            width: 10,
        },

        deleteButton: {
            width: 15,            
        },
    });

    return (
        <View style={styles.container}>
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
                                <Text style={styles.productName}>Title: {item.title}</Text>
                                <Text>Description: {item.description}</Text>
                                <Text>Price: {item.price}</Text>
                                <Text style={styles.productDiscount}>Discount: {item.discountPercentage} off</Text>
                                <Text>Rating: {item.rating}</Text>
                                <Text>Stock: {item.stock}</Text>
                                <Text>Brand: {item.brand}</Text>
                                <Text>Category: {item.category}</Text>
                                <View style={styles.buttonView}>
                                    <Button title="DETAIL" style={styles.detailButton}></Button>
                                    <Button title="ADD" style={styles.addButton}></Button>
                                    <Button title="DELETE" style={styles.deleteButton}></Button>
                                </View>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );


}

export default Products;