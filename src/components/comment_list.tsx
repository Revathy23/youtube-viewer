import { Comment } from "../types/Comment";

interface CommentListProps {
  comments: Comment[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ comments, loading, onLoadMore, hasMore }) => {

    if (loading) return <p>Loading comments...</p>;

    if(!comments.length) 
        return <div>No comments available.</div>
    
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