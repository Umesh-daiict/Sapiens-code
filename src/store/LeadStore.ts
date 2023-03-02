import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "../components/slices/leadsReducer";

const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
