import React, { useState, useEffect } from 'react';
import Button from "@material-ui/core/Button";
import ApiService from '../api/ApiService';
import { UserCommentEntity } from '../types/UserCommentEntity';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from '@material-ui/core/TextField';
import Comment from './Comment';

type CommentSectionProps = {
  contentId: string;
};

const CommentSection: React.FC<CommentSectionProps> = ({ contentId }) => {
  const [isCommentsVisible, setIsCommentsVisible] = useState(false as boolean);
  const [comments, setComments] = useState([] as UserCommentEntity[]);
  const [dialogOpen, setDialogOpen] = useState(false as boolean);
  const [commentor, setCommentor] = useState("" as string);
  const [comment, setComment] = useState("" as string);
  const [isEdit, setIsEdit] = useState(false as boolean);
  const [currentCommentId, setCurrentCommentId] = useState("" as string);

  const { data: commentsList, refetch } = ApiService.useRetrieveComments(contentId);
  const { mutate: addCommentMutation } = ApiService.useAddComment();
  const { mutate: deleteCommentMutation } = ApiService.useDeleteComment();
  const { mutate: editCommentMutation } = ApiService.useEditComment();
    
  useEffect(() => {
    if (isCommentsVisible) {
      setComments(commentsList || []);
    }
  }, [isCommentsVisible, commentsList]);

  const deleteComment = async (commentId: string) => {
    try {
      await deleteCommentMutation({ contentId, commentId }, {
        onSuccess: () => {
          refetch();
        }
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
    
  const editComment = async (commentId: string) => {
    setIsEdit(true);
    setDialogOpen(!dialogOpen);
  
    const editedComment = comments.find(comment => comment.id === commentId);
  
    if (editedComment) {
      setCommentor(editedComment.commentor);
      setComment(editedComment.comment);
    }
    setCurrentCommentId(commentId)
  };
    
    const updateComment = async () => {
        try {
            await editCommentMutation({ contentId, commentId: currentCommentId, comment, commentor }, {
                onSuccess: () => {
                  refetch();
                }
              });
            setDialogOpen(false);
            setComment("")
            setCommentor("")
            setIsEdit(false);
        } catch (error) {
          console.error("Error updating comment:", error);
        }
    }
  

  const saveComment = async () => {
    try {
        await addCommentMutation({ contentId, commentor, comment }, {
          onSuccess: () => {
            refetch();
          },
        });
        setDialogOpen(false);
        setComment("")
        setCommentor("")
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="my-4">
      <Button variant="outlined" color="primary" onClick={() => setIsCommentsVisible(!isCommentsVisible)}>
        {isCommentsVisible ? "Hide Comments" : "View Comments"}
      </Button>
      {isCommentsVisible && (
        <div className="mt-4 space-y-4">
          {comments.map(comment => (
            <Comment key={comment.contentId} comment={comment} onDelete={() => deleteComment(comment.id)} onEdit={() => editComment(comment.id)} />
          ))}
          <Button variant="outlined" color="primary" onClick={() => setDialogOpen(true)}>
            Add Comment
          </Button>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{isEdit ? "Edit Comment" : "Add Comment"}</DialogTitle>
            <DialogContent className="space-y-4">
              <TextField
                autoFocus
                margin="dense"
                id="commentor"
                name="commentor"
                label="Your Name"
                type="text"
                fullWidth
                value={commentor}
                onChange={(e) => setCommentor(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="comment"
                name="comment"
                label="Your Comment"
                type="text"
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={!isEdit ? saveComment : updateComment} color="primary">
                {isEdit ? "Save Comment" : "Add Comment"}
              </Button>
                          <Button onClick={() => {
                              setDialogOpen(false)
                              setComment("")
                            setCommentor("")
                          }} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CommentSection;