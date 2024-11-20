import React from 'react';
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

export const PopupMenu = ({ route, navigation }) => {
  const { service } = route.params;

  const deleteService = async () => {
    const { _id } = service;
    const { token } = await getUser();

    const handleDelete = async () => {
      try {
        await axios.delete(`https://kami-backend-5rs0.onrender.com/services/${_id}`,
          { _id: _id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          },
        );
        Alert.alert('Success', 'Service deleted successfully!');
        navigation.navigate("Home"); // Navigate back after deletion
      } catch (error) {
        Alert.alert('Error', 'Failed to delete the service.');
        console.error('Delete failed:', error.response || error.message);
      }
    };

    Alert.alert("Warning", "Are you sure to delete this this service, it cannot be returned!",
      [
        {
          text: 'Cancel', // Cancel button
          style: 'cancel',
        },
        {
          text: 'Delete', // Confirm button
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
            onSelect={() => navigation.navigate('Update', route.params)}
            text="Edit"
          />
          <MenuOption
            onSelect={deleteService}
            text="Delete"
          />
        </MenuOptions>
      </Menu>
    </TouchableOpacity>
  );
};
