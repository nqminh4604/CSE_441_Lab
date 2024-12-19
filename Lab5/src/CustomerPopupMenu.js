import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import axios from 'axios';
import { getUser } from './store';

export default CustomerPopupMenu = ({ route, navigation }) => {
    const { id } = route.params;
    const [customer, setCustomer] = useState(null);

    console.log("id ", id);


    useEffect(() => {
        const loadScreen = navigation.addListener("focus", async () => {
            try {
                const response = await axios.get(
                    `https://kami-backend-5rs0.onrender.com/Customers/${id}`
                );
                setCustomer(response.data);
            } catch (error) {
                console.error("Fetching Error", error);
            }
        });
        return () => loadScreen();
    }, [navigation]);


    const deleteCustomer = async () => {
        const { token } = await getUser();
        
        const handleDelete = async () => {
            try {
                await axios.delete(`https://kami-backend-5rs0.onrender.com/Customers/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    },
                );
                Alert.alert('Success', 'Customer deleted successfully!');
                navigation.popToTop();
            } catch (error) {
                Alert.alert('Error', 'Failed to delete the customer.');
                console.error('Delete failed:', error);
            }
        };

        Alert.alert("Warning", "Are you sure to delete this this customer, it cannot be returned!",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => handleDelete()
                },
            ]
        )
    };

    return (
        <TouchableOpacity>
            <Menu>
                <MenuTrigger>
                    <IconButton icon="dots-vertical" iconColor="#FFF" size={30} />
                </MenuTrigger>
                <MenuOptions
                    customStyles={{
                        optionsContainer: {
                            marginTop: 60,
                            marginLeft: 20,
                            backgroundColor: '#fff',
                        },
                        optionWrapper: {
                            padding: 10,
                        },
                    }}
                >
                    <MenuOption
                        onSelect={() => navigation.navigate('Edit Customer', { customer })}
                        text="Edit"
                    />
                    <MenuOption
                        onSelect={deleteCustomer}
                        text="Delete"
                    />
                </MenuOptions>
            </Menu>
        </TouchableOpacity>
    );
};
