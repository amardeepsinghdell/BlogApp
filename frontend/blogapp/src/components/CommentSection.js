import React, { useState, useEffect } from "react";
import { getCommentsforPost, createComment } from "../services/commentService";
import formatDate from "../helpers/formatDate";

const CommentSection = ({ selectedPost }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  //Fetch comments when a post is selected
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getCommentsforPost(selectedPost.id);
        setComments(data);
      } catch (err) {
        setError("Failed to fetch comments");
      } finally {
        setLoading(false);
      }
    };

    if (selectedPost) {
      fetchComments();
    } else {
      setComments([]); //Clear comments if no post is selected
    }
  }, [selectedPost]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      const commentData = {
        blogPostId: selectedPost.id,
        content: newComment.trim(),
        date: new Date().toISOString(),
      };

      const createdComment = await createComment(selectedPost.id,commentData);
      setComments((prev) => [...prev, createdComment]); //Add new comment to the list , useEffect will update the UI because of state change
      setNewComment(""); //Clear input field
    } catch (err) {
      setError("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedPost) {
    return (
      <div className="comment-section">
        <h3>Comments</h3>
        <p>Select a blog post to view comments</p>
      </div>
    );
  }

  return (
     <div className="comment-header">
      <h2>Comments for "{selectedPost.title}"</h2>
    <div className="comment-section">
      <div className="comments-list">
        {loading ? (
          <div className="loading">Loading comments...</div>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <p className="comment-content">{comment.content}</p>
              <small className="comment-date">
                {formatDate(comment.createdAt)}
              </small>
            </div>
          ))
        )}
      </div>
            </div>


      <form onSubmit={handleSubmitComment} className="comment-form">
        <div className="form-group">
          <label htmlFor="comment">Add a comment</label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder=".."
            rows="3"
            disabled={submitting}
          />
        </div>
        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={submitting || !newComment.trim()}>
          {submitting ? "Adding..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};
export default CommentSection;
