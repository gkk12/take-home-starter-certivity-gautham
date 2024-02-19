import React from 'react';
import { UserCommentEntity } from '../types/UserCommentEntity';

type CommentProps = {
  comment: UserCommentEntity;
  onDelete: () => void;
  onEdit: () => void;
};

const Comment: React.FC<CommentProps> = ({ comment, onDelete, onEdit }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <div key={comment.contentId} className="mb-2">
        <div className="font-bold">{comment.commentor}</div>
        <div>{comment.comment}</div>
      </div>
      <button className="border border-slate-300 hover:border-slate-400 py-1 px-2 mr-2" onClick={onDelete}>
        Delete Comment
      </button>
      <button className="border border-slate-300 hover:border-slate-400 py-1 px-2" onClick={onEdit}>
        Edit Comment
      </button>
    </div>
  );
};

export default Comment;