import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

const Product_Detail = () => {

    const styles = StyleSheet.create({
        title: {
            fontSize: 20,
            padding: 5,
            marginBottom: 10,
        },
    })

    const [data, setData] = React.useState([]);
    const filePath = 'https://dummyjson.com/products/2';

    React.useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((d) => {
                setData(d);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
    })

    return (
        < View >
            <Text style={styles.title}>Product Detail</Text>
            <Card>
                <Card.Cover source={{ uri: data.thumbnail }} />
                <Card.Content>
                    <Text variant="titleLarge">Title: {data.title}</Text>
                    <Text variant="bodySmall">Description: {data.description}</Text>
                    <Text variant="bodySmall">Price: ${data.price}</Text>
                    <Text variant="bodySmall">Discount: {data.discountPercentage}%</Text>
                    <Text variant="bodySmall">Rating: {data.rating}</Text>
                    <Text variant="bodySmall">Stock: {data.stock}</Text>
                    <Text variant="bodySmall">Brand: {data.brand}</Text>
                    <Text variant="bodySmall">Category: {data.category}</Text>
                </Card.Content>
                <Card.Actions>
                    <Button mode='contained' >Cancel</Button>
                    <Button>Delete</Button>
                </Card.Actions>
            </Card>
        </View >
    );
}

export default Product_Detail;