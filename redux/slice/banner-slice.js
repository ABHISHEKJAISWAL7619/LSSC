"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://lssc-api.devloperhemant.com/";


export const createbanner = createAsyncThunk(
  "banner/create",
  async (formData, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}api/admin/banner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("banner Created:", data);
      return data;
    } catch (error) {
      const errRes = error.response?.data || { message: error.message };
      console.error("banner Create Error:", errRes);
      return rejectWithValue(errRes);
    }
  }
);
export const getallbanner = createAsyncThunk(
  "banner/getall",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.get(
        `${API_BASE_URL}api/admin/banner`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("banner fetched:", data);
      return data;
    } catch (error) {
      const errRes = error.response?.data || { message: error.message };
      console.error("banner fetched Error:", errRes);
      return rejectWithValue(errRes);
    }
  }
);


const initialState = {
  newsletters: [],
  loading: false,
  error: null,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Newsletter
      .addCase(createbanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createbanner.fulfilled, (state, action) => {
        state.loading = false;
        state.newsletters.push(action.payload);
      })
      .addCase(createbanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create createbanner";
      });
  },
});

export default bannerSlice.reducer;
