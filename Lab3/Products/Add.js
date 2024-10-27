import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default Add = () => {
    const styles = StyleSheet.create({

        title: {
            color: "blue",
            fontSize: 15,
            fontWeight: "bold",
        },

        label: {
            fontSize: 14,
            fontWeight: "bold",
            color: "grey",
        },

        input: {
            padding: 8,
        },


    });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [rating, setRating] = useState("");
    const [stock, setStock] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState("");

    const resetField = () => {
        setTitle("");
        setDescription("");
        setPrice ("");
        setDiscountPercentage("");
        setRating("");
        setStock("");
        setBrand("");
        setCategory("");
        setImages("");
    }

    const handleSubmit = () => {
        fetch("https://dummyjson.com/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                discountPercentage: discountPercentage,
                rating: rating,
                stock: stock,
                brand: brand,
                category: category,
                images: images,
            }),
        })
            .then((res) => res.json())
            .then(console.log);
        Alert.alert("Add sucessfull");
        resetField();
    };

    return (
        <View>
            <Text style={styles.title}>Add a Product</Text>
            <Text style={styles.label}>Title</Text>
            <TextInput placeholder="Enter title" onChangeText={(text) => setTitle(text)} value={title}></TextInput>

            <Text style={styles.label}>Description</Text>
            <TextInput placeholder="Enter description" onChangeText={(text) => setDescription(text)} value={description}></TextInput>

            <Text style={styles.label}>Price</Text>
            <TextInput placeholder="Enter price" onChangeText={(text) => setPrice(text)} value={price}></TextInput>

            <Text style={styles.label}>Discount Percentage</Text>
            <TextInput placeholder="Enter Discount Percentage" onChangeText={(text) => setDiscountPercentage(text)} value={discountPercentage}></TextInput>

            <Text style={styles.label}>Rating</Text>
            <TextInput placeholder="Enter Rating" onChangeText={(text) => setRating(text)} value={rating}></TextInput>

            <Text style={styles.label}>Stock</Text>
            <TextInput placeholder="Enter Stock" onChangeText={(text) => setStock(text)} value={stock}></TextInput>

            <Text style={styles.label}>Brand</Text>
            <TextInput placeholder="Enter Brand" onChangeText={(text) => setBrand(text)} value={brand}></TextInput>

            <Text style={styles.label}>Category</Text>
            <TextInput placeholder="Enter Category" onChangeText={(text) => setCategory(text)} value={category}></TextInput>

            <Text style={styles.label}>Images</Text>
            <TextInput placeholder="Enter Images URL(s)" onChangeText={(text) => setImages(text)} value={images}></TextInput>

            <Button title="SUBMIT" onPress={() => handleSubmit()}></Button>
        </View>
    );

}

