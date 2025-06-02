"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://lssc-api.devloperhemant.com/";


export const creategallery = createAsyncThunk(
  "gallery/create",
  async (formData, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}api/admin/gallery`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("course Created:", data);
      return data;
    } catch (error) {
      const errRes = error.response?.data || { message: error.message };
      console.error("course Create Error:", errRes);
      return rejectWithValue(errRes);
    }
  }
);
export const getallgallery = createAsyncThunk(
  "gallery/getall",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.get(`${API_BASE_URL}api/admin/gallery`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("gallery Fetched:", data);
      return data; // assume data = { data: [...] }
    } catch (error) {
      const errRes = error.response?.data || { message: error.message };
      console.error("gallery Fetch Error:", errRes);
      return rejectWithValue(errRes);
    }
  }
);


const initialState = {
  course: [],
  loading: false,
  error: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Newsletter
      .addCase(creategallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(creategallery.fulfilled, (state, action) => {
        state.loading = false;
        state.newsletters.push(action.payload);
      })
      .addCase(creategallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create newsletter";
      });
  },
});

export default gallerySlice.reducer;
