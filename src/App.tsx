import { useEffect, useState } from "react";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import { Video } from "./types/Video";
import { Comment } from "./types/Comment";
import CommentList from "./components/comment_list";
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store';
import { setVideos, setSelectedVideo } from './store/videoSlice';
import { setComments, setLoading } from './store/commentSlice';


const App = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);

  /**
   * Function that gets the search-term and returns a list of videos
   * @param {*} term
   */
  const videoSearch = (_.debounce((term: string) => {
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!apiKey) {
      throw new Error("Missing YouTube API Key");
    }
    YTSearch({ key: process.env.REACT_APP_YOUTUBE_API_KEY!, term }, (videos) => {
      console.log(videos)
      setVideos(videos);
      setSelectedVideo(videos[0]);
      fetchComments(videos[0].id.videoId);
    });
  }, 300));

  /**
   * Function that gets the video id and returns the list of comments under the video
   * @param {*} videoId
   */
  const fetchComments = async (videoId: string) => {
    setLoadingComments(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=10`
      );
      const data = await response.json();
      setComments(data.items || []);
      setNextPageToken(data.nextPageToken || null);
    } 
    catch (error) {
      console.error("Error fetching comments:", error);
      setComments([]);
    }
    finally {
      setLoadingComments(false);
    }
  }

  const handleLoadMore = async () => {
    if (!selectedVideo || !nextPageToken) return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${selectedVideo.id.videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=10&pageToken=${nextPageToken}`
      );
      const data = await response.json();
      setComments((prev) => [...prev, ...(data.items || [])]);
      setNextPageToken(data.nextPageToken || null);
    } catch (error) {
      console.error("Error loading more comments:", error);
    }
  };

  useEffect(() => {
    videoSearch("liverpool");
  },[])

  return (
    <div>
      <SearchBar onSearchTermChange={videoSearch} />
      <VideoDetail video={selectedVideo} />
      <VideoList
        onVideoSelect={setSelectedVideo}
        videos={videos}
      />
      {selectedVideo && <CommentList comments={comments} loading={loadingComments} onLoadMore={handleLoadMore} hasMore={!!nextPageToken}/>}
    </div>
  );
}

export default App;
