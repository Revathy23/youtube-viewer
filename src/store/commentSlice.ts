import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/Comment';

interface CommentState {
  list: Comment[];
  loading: boolean;
}

const initialState: CommentState = {
  list: [],
  loading: false,
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setComments, setLoading } = commentSlice.actions;
export default commentSlice.reducer;
