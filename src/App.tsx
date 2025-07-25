import { useEffect } from "react";
import _ from "lodash";
import { RootState, useAppDispatch, useAppSelector } from "./store";
import { setSelectedVideo, fetchVideos } from "./store/videoSlice";
import { fetchComments, loadMoreComments } from "./store/commentSlice";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import CommentList from "./components/comment_list";
import { Video } from "./types/Video";

const App = () => {
  const dispatch = useAppDispatch();

  const videos = useAppSelector((state: RootState) => state.videos.videos);
  const selectedVideo = useAppSelector((state: RootState) => state.videos.selectedVideo);
  const comments = useAppSelector((state: RootState) => state.comments.list);
  const loading = useAppSelector((state: RootState) => state.comments.loading);
  const hasMore = useAppSelector((state: RootState) => state.comments.hasMore);

  const videoSearch = _.debounce((term: string) => {
    const searchTerm = term.trim() || "liverpool"; //if the search bar is cleared, liverpool will be the search term
    dispatch(fetchVideos(searchTerm));
  }, 300);

  const handleVideoSelect = (video: Video) => {
    dispatch(setSelectedVideo(video));
    dispatch(fetchComments(video.id.videoId));
  };

  useEffect(() => {
    videoSearch("liverpool");
  }, []);

  return (
  <div>
    <SearchBar onSearchTermChange={videoSearch} />
    <div className="main-content">
      <div className="left-content">
        <VideoDetail video={selectedVideo} />
        <CommentList comments={comments} loading={loading} selectedVideo={selectedVideo} hasMore={hasMore} onLoadMore={() => dispatch(loadMoreComments())}/>
      </div>
      <VideoList onVideoSelect={handleVideoSelect} videos={videos} />
    </div>
  </div>
);

};

export default App;