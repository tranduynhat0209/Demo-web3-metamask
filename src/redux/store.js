import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./account-slice";
export default configureStore({
    reducer: {
      account: accountSlice
    }
  })