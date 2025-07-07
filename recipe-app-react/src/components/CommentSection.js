import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './CommentSection.css';

const CommentSection = ({ recipeId, initialComments = [] }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!user) {
      alert('댓글을 작성하려면 로그인이 필요합니다.');
      navigate('/login', { state: { from: location } });
      return;
    }

    const commentToAdd = {
      id: Date.now(), // 데모용 고유 ID
      author: user.name,
      text: newComment,
    };

    // 실제 앱에서는 서버로 댓글 데이터를 전송합니다.
    setComments([...comments, commentToAdd]);
    setNewComment('');
  };

  const handleDelete = (commentId) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      // 실제 앱에서는 서버에 삭제 요청을 보냅니다.
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const handleEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingText.trim()) return;

    // 실제 앱에서는 서버에 수정 요청을 보냅니다.
    setComments(
      comments.map(comment =>
        comment.id === editingCommentId ? { ...comment, text: editingText } : comment
      )
    );

    // 수정 모드 종료
    setEditingCommentId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  return (
    <div className="comment-section">
      <h3>댓글 ({comments.length})</h3>
      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              {editingCommentId === comment.id ? (
                <form onSubmit={handleUpdate} className="comment-edit-form">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    rows="2"
                    autoFocus
                  />
                  <div className="comment-edit-actions">
                    <button type="submit">저장</button>
                    <button type="button" onClick={handleCancelEdit}>취소</button>
                  </div>
                </form>
              ) : (
                <>
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-text">{comment.text}</p>
                  {user && user.name === comment.author && (
                    <div className="comment-actions">
                      <button onClick={() => handleEdit(comment)}>수정</button>
                      <button onClick={() => handleDelete(comment.id)} className="btn-delete">삭제</button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p className="no-comments">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user ? `${user.name}님, 댓글을 남겨보세요...` : '로그인 후 댓글을 남길 수 있습니다.'}
          rows="3"
          disabled={!user}
        />
        <button type="submit" disabled={!user || !newComment.trim()}>
          댓글 등록
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
