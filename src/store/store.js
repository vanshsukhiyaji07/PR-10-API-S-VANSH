import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../fetures/Wether"
import DogReducer from "../fetures/Dog"
import movieReducer from "../fetures/Movie";

export const store = configureStore({
    reducer: {
        weather : weatherReducer,
        dogs : DogReducer,
        movie: movieReducer, 
    }
})