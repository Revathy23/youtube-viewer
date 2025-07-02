import { Comment } from "../types/Comment";
import { Video } from "../types/Video";

interface CommentListProps {
  comments: Comment[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  selectedVideo?: Video | null;
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading, onLoadMore, hasMore, selectedVideo }) => {

    if (loading) {
        return <div className="loading-comments">Loading comments...</div>;
    }
    if (!comments.length && !loading && selectedVideo) {
        return (
            <div className="no-comments">
            No comments available.
            </div>
        );
    }
    if (!selectedVideo) {
        return null; 
    }
    
    return (
        <div className="comment-section">
            <h4>Comments</h4>
            <ul className="comment-list">
                {comments.map((comment) => {
                const snippet = comment.snippet.topLevelComment.snippet;
                return (
                    <li className="comment-item" key={comment.id}>
                        <div className="comment-content">
                            <img
                                src={snippet.authorProfileImageUrl}
                                alt={snippet.authorDisplayName}
                                className="user-avatar"
                            />
                            <div>
                                <strong>{snippet.authorDisplayName}</strong>
                                <p dangerouslySetInnerHTML={{ __html: snippet.textDisplay }} />
                                <small>{new Date(snippet.publishedAt).toLocaleString()}</small>
                            </div>
                        </div>
                    </li>
                );
                })}
            </ul>
        {hasMore && (
            <button onClick={onLoadMore} className="load-more-btn">
                Load more
            </button>
        )}
        </div>
    )
}

export default CommentList;