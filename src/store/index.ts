import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
  } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import videoReducer from './videoSlice';
import commentReducer from './commentSlice';

export const store = configureStore({
  reducer: {
    videos: videoReducer,
    comments: commentReducer,
  },
});

export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
export default store;
