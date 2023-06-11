import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export type Point = {
  id: number;
  type: string;
  lat: number;
  lng: number;
  time: number;
  density: number;
}


export interface dataState {
  points: Point[] | null;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}

const initialState: dataState = {
  points: null,
  status: "idle",
  error: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setPoints: (state, action: PayloadAction<Point[]>) => {
      state.points = action.payload;
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

export const { setPoints } = dataSlice.actions;

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
      dispatch(setPoints(e.data));
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
