import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = 'dcb1bf5c512e3177716af5d17e1824cb';

export const FetchCityes = createAsyncThunk('weather/fetchCityes', async () => {
    const response = await axios.get('/cityes.json');
    return response.data;
}
);

export const FetchWeather = createAsyncThunk('weather/FetchWeather', async (city)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;;
});

// export const FetchCast = createAsyncThunk('weather/FetchCast', async (city)=>{
//     const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
//     const response = await axios.get(url);
//     return response.data;
// });

const Weather = createSlice({
    name:'weather',
    initialState:{
        cityes:[],
        todayweather:null,
        forecast:null,
        loading:false,
        error:null,
    },
   extraReducers:(builder)=>{
    builder.addCase(FetchCityes.pending,(state) =>{
        state.loading = true;
    })
    .addCase(FetchCityes.fulfilled, (state,action) => {
        state.loading = false ; 
        state.cityes = action.payload || [];
    })
    .addCase(FetchCityes.rejected,(state,action) => {
        state.loading = false ;
        state.error = action.error.message;
    })
    .addCase(FetchWeather.pending, (state)=>{
        state.loading = true ;
    })
    .addCase(FetchWeather.fulfilled,(state,action)=>{
        state.loading = false ;
        state.todayweather = action.payload || null ;
    })
    .addCase(FetchWeather.rejected,(state,action)=>{
        state.loading = false ;
        state.error = action.error.message ;
    })
   }
});

export default Weather.reducer;

