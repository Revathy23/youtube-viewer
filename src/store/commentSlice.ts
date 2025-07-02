import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';
import { AppDispatch } from "../store";

interface CommentState {
  list: Comment[];
  loading: boolean;
  error: string | null;
  nextPageToken: string | null;
  hasMore: boolean;
  selectedVideoId: string | null;
}

const initialState: CommentState = {
  list: [],
  loading: false,
  error: null,
  nextPageToken: null,
  hasMore: false,
  selectedVideoId: null,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { items, nextPageToken, videoId } = action.payload;
      state.list = items;
      state.nextPageToken = nextPageToken || null;
      state.hasMore = !!nextPageToken;
      state.selectedVideoId = videoId;
      state.error = null;
    },
    appendComments: (state, action) => {
      const { items, nextPageToken } = action.payload;
      state.list.push(...items);
      state.nextPageToken = nextPageToken || null;
      state.hasMore = !!nextPageToken;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setComments, appendComments, setLoading, setError } = commentSlice.actions;
export default commentSlice.reducer;

export const fetchComments = (videoId: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(null));
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  if (!apiKey) {
    dispatch(setError("Missing API key"));
    dispatch(setLoading(false));
    return;
  }
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=10`
    );
    const data = await res.json();
    if (res.ok && data.items) {
      dispatch(setComments({items: data.items, nextPageToken: data.nextPageToken, videoId}));
    } else {
      dispatch(setComments({ items: [], nextPageToken: null, videoId }));
      dispatch(setError(data.error?.message || "Unknown error fetching comments"));
    }
  } catch (err: any) {
    console.error("Comment fetch failed:", err);
    dispatch(setComments([]));
    dispatch(setError(err.message || "Something went wrong"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const loadMoreComments = () => async (dispatch: AppDispatch, getState: () => any) => {
  const state = getState().comments;
  const videoId = state.selectedVideoId;
  const pageToken = state.nextPageToken;
  if (!videoId || !pageToken) return;
  dispatch(setLoading(true));
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${apiKey}&maxResults=10&pageToken=${pageToken}`
    );
    const data = await res.json();

    if (res.ok && data.items) {
      dispatch(appendComments({
        items: data.items,
        nextPageToken: data.nextPageToken
      }));
    }
  } catch (err: any) {
    console.error("Load more failed:", err);
  } finally {
    dispatch(setLoading(false));
  }
};
