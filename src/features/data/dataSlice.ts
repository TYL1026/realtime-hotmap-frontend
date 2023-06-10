import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface dataState {
  GeoJson: JSON | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}

const initialState: dataState = {
  GeoJson: null,
  status: "idle",
  error: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setGeoJson: (state, action: PayloadAction<JSON>) => {
      state.GeoJson = JSON.parse(JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setGeoJson } = dataSlice.actions;

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (_, { dispatch }) => {
    const ws = new WebSocket(
      "wss://realtime-hotmap-backend-dqij5lkaea-uc.a.run.app"
    );

    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (e) => {
      const currData = JSON.parse(e.data);
      dispatch(setGeoJson(currData));
      console.log(e.data);
    };

    ws.onerror = (e) => {
      throw new Error("WebSocket error");
    };

    ws.onclose = (e) => {
      console.log("WebSocket connection closed");
    };
  }
);

export default dataSlice.reducer;
