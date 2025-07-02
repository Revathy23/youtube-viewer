import { createSlice } from '@reduxjs/toolkit';
import { Video } from '../types/Video';
import { AppDispatch } from "../store";
import { fetchComments } from './commentSlice';

interface VideoState {
  videos: Video[];
  selectedVideo: Video | null;
  loading: boolean;
}

const initialState: VideoState = {
  videos: [],
  selectedVideo: null,
  loading: false,
};

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideos(state, action) {
      state.videos = action.payload;
    },
    setSelectedVideo(state, action) {
      state.selectedVideo = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setVideos, setSelectedVideo, setLoading } = videoSlice.actions;

export default videoSlice.reducer;

export const fetchVideos = (term: string) => async (dispatch: AppDispatch) => {
  dispatch(videoSlice.actions.setLoading(true));
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  if (!apiKey) {
    console.error("Missing API key");
    dispatch(videoSlice.actions.setLoading(false));
    return;
  }
  try {
    const YTSearch = require("youtube-api-search");
    YTSearch({ key: apiKey, term }, (videos: Video[]) => {
      if (videos.length > 0) {
        dispatch(videoSlice.actions.setVideos(videos));
        dispatch(videoSlice.actions.setSelectedVideo(videos[0]));
        dispatch(fetchComments(videos[0].id.videoId));
      } else {
        dispatch(videoSlice.actions.setVideos([]));
        dispatch(videoSlice.actions.setSelectedVideo(null));
      }
      dispatch(videoSlice.actions.setLoading(false));
    });
  } catch (error) {
    console.error("Video fetch error:", error);
    dispatch(videoSlice.actions.setVideos([]));
    dispatch(videoSlice.actions.setSelectedVideo(null));
    dispatch(videoSlice.actions.setLoading(false));
  }
};
