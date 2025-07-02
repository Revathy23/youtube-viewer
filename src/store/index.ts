import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./videoSlice";
import commentReducer from "./commentSlice";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

const store = configureStore({
  reducer: {
    videos: videoReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useReduxDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export default store;
