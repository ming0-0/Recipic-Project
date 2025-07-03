import React, { useState } from 'react';
import './CommentModal.css';

const CommentModal = ({ reel, comments, onClose, onAddComment, currentUser }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(reel.id, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="comment-modal-header">
          <h3>댓글 ({comments.length})</h3>
          <button onClick={onClose} className="close-modal-btn">&times;</button>
        </div>
        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p><strong>{comment.author}</strong> {comment.text}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">아직 아무도 댓글을 안 달았습니다! 댓글을 쓰고 소통하세요~</p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="comment-input-form">
          <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="댓글 추가..." />
          <button type="submit" disabled={!newComment.trim()}>게시</button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;

