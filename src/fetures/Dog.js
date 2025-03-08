import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch dog breeds
export const fetchBreeds = createAsyncThunk(
  "dogs/fetchBreeds",
  async () => {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    return Object.keys(data.message);
  }
);

export const fetchSubBreeds = createAsyncThunk('dog/fetchSubBreeds', async (breed) => {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
    return response.data.message;
});

// Fetch images for a selected breed
export const fetchBreedImages = createAsyncThunk(
  "dogs/fetchBreedImages",
  async (breed) => {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    return data.message;
  }
);

export const fetchSubBreedImage = createAsyncThunk('dog/fetchSubBreedImage', async ({ breed, subBreed }) => {
    const response = await axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`);
    return response.data.message;
});

const Dog = createSlice({
  name: "dogs",
  initialState: {
    breeds: [],
    subBreeds: [],
    breedImage:null,
    images: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreeds.fulfilled, (state, action) => {
        state.loading = false;
        state.breeds = Object.keys(action.payload);
      })
      .addCase(fetchBreeds.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch breeds";
      })
      .addCase(fetchBreedImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreedImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchBreedImages.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch images";
      });
  },
});

export default Dog.reducer;
