import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '../types/Video';

interface VideoState {
  videos: Video[];
  selectedVideo: Video | null;
}

const initialState: VideoState = {
  videos: [],
  selectedVideo: null,
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
    },
    setSelectedVideo: (state, action: PayloadAction<Video>) => {
      state.selectedVideo = action.payload;
    },
  },
});

export const { setVideos, setSelectedVideo } = videoSlice.actions;
export default videoSlice.reducer;
