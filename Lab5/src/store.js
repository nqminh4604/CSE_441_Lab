import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";

export const AppTheme = {
    colors: {
        primary: "#EF506B",
    },
};

export const saveUser = async (value) => {
    try {
        const user = JSON.stringify(value);
        await AsyncStorage.setItem("user", user);
    } catch (error) {
        console.error("Saving error", error);
    }
}

export const getUser = async () => {
    const userData = await AsyncStorage.getItem("user");
    return JSON.parse(userData);
};

export const saveListOfService = async (value) => {
    try {
        const services = JSON.stringify(value);
        await AsyncStorage.setItem("listOfService", services);
    } catch (error) {
        console.error("Saving error", error);
    }
}

export const getListOfService = async () => {
    const response = await axios.get("https://kami-backend-5rs0.onrender.com/services");
    return response.data;
};