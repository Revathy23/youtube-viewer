# YouTube Viewer App

A lightweight YouTube viewer built with **React**, **Redux**, and **TypeScript**,allowing users to search for videos, view video details, and browse top comments.

## Features

-  Debounced video search via YouTube Data API v3
-  Global state management using Redux Toolkit
-  Comment section with "Load More" support
-  Avatar and author details for each comment
-  Loading indicators
-  TypeScript support with strict typings
-  Responsive layout (video + comment + video list)

## Tech Stack

- React (with hooks)
- TypeScript
- Redux Toolkit
- Lodash (for debouncing)
- YouTube Data API v3

## Folder Structure
src/
├── components/ # UI components
│ ├── search_bar.tsx
│ ├── video_list.tsx
│ ├── video_detail.tsx
| ├── video_list_item.tsx
│ └── comment_list.tsx
├── store/ # Redux slices
│ ├── videoSlice.ts
│ ├── commentSlice.ts
│ └── index.ts
├── types/ # TypeScript types
│ ├── Video.ts
| ├── Comment.ts
│ └── youtube-api-search.d.ts
├── App.tsx # Main App logic
├── index.tsx # Entry point
public/
├── style/ 
│ ├── index.css # Global styles

## Getting Started

### 1. Clone the Repository
### 2. Install Dependencies
### 3. Set up Environment variables
### 4. Run the App

```bash
git clone https://github.com/your-username/youtube-viewer.git
cd youtube-viewer

npm install
# or
yarn install

REACT_APP_YOUTUBE_API_KEY=your_youtube_api_key_here

npm start
# or
yarn start
```

## 🚀 Future Improvements

- Add replies to comments
- Implement infinite scroll for comments instead of "Load More"
- Pagination support for video search
- Add dark mode toggle
- Improve responsiveness and styling for mobile devices


## Author

**Revathy V**
💻 Frontend Developer | React | TypeScript | Redux  
