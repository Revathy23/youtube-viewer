declare module "youtube-api-search" {
  interface VideoSnippet {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  }

  interface Video {
    etag: string;
    id: {
      videoId: string;
    };
    snippet: VideoSnippet;
  }

  interface SearchOptions {
    key: string;
    term: string;
  }

  type Callback = (videos: Video[]) => void;

  function YTSearch(options: SearchOptions, callback: Callback): void;

  export default YTSearch;
}
