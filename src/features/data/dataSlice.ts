import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { act } from "react-dom/test-utils";
import { Point } from "./Convert";
import { Convert } from "./Convert";


export interface dataState {
  points: Point[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}

const initialState: dataState = {
  points: [],
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
      const parsedData: Point[] = Convert.toPoint(JSON.parse(e.data));
      // console.log(parsedData);
      dispatch(setPoints(parsedData));
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
