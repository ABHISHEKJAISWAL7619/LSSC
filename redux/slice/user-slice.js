"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://lssc-api.devloperhemant.com/";


export const createuser = createAsyncThunk(
  "user/create",
  async (formData, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}api/admin/users`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("user Created:", data);
      return data;
    } catch (error) {
      console.error("user Create Error:", error);
      return rejectWithValue(errRes);
    }
  }
);

export const getalltrainers = createAsyncThunk(
  "trainer/getall",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.get(`${API_BASE_URL}api/admin/users?role=trainer`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("trainers:", data);
      return data; // assume data = { data: [...] }
    } catch (error) {
      const errRes = error.response?.data || { message: error.message };
      console.error("trainer Fetch Error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getallassessors = createAsyncThunk(
  "assessors/getall",
  async (_, { rejectWithValue }) => {
    const token = Cookies.get("token");
    if (!token) {
      return rejectWithValue({ message: "Unauthorized: No token found" });
    }

    try {
      const { data } = await axios.get(`${API_BASE_URL}api/admin/users?role=assessor`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("assesors:", data);
      return data; // assume data = { data: [...] }
    } catch (error) {
      const errRes = error.response?.data || { message: error.message };
      console.error("assessors Fetch Error:", error);
      return rejectWithValue(error);
    }
  }
);


const initialState = {
  course: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "createuser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Newsletter
      .addCase(createuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createuser.fulfilled, (state, action) => {
        state.loading = false;
        state.newsletters.push(action.payload);
      })
      .addCase(createuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create newsletter";
      });
  },
});

export default userSlice.reducer;
