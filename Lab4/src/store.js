import { configureStore, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";


export const mapContact = () => {
    const { name, picture, phone, cell, email } =  contact;
    return {
        id: v4(),
        name: name.first + " " + name.last,
        avatar: picture.large,
        phone,
        cell,
        email,
        favorite: Math.random() < 0.1 ? true : false
    };
};

const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contact: [],
    },
    reducer: {
        fetchContactSuccess: (state, action) => {
            state.contacts = action.payload;
        },
    },
});

export const { fetchContactSuccess } = contactSlice.action;
const Store = configureStore({
    reducer: contactSlice.reducer,
});

export default Store;