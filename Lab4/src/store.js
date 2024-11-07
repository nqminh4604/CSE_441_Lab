import { configureStore, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid} from "uuid";


export const mapContact = () => {
    const { name, picture, phone, cell, email } =  contact;
    return {
        id: uuid(),
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
        contacts: [],
    },
    reducers: {
        fetchContactSuccess: (state, action) => {
            state.contacts = action.payload;
        },
    },
});

export const { fetchContactSuccess } = contactSlice.actions;
const Store = configureStore({
    reducer: contactSlice.reducer,
});

export default Store;