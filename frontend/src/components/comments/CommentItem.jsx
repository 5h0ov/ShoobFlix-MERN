import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useCommentsStore } from '../../store/commentsStore';
import { useStore } from "../../store/store";
import CommentForm from "./CommentForm";
import CommentActions from "./CommentActions";
import { FaExclamationTriangle, FaReply, FaEye, FaEyeSlash } from "react-icons/fa";

const CommentItem = ({ comment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showFlaggedContent, setShowFlaggedContent] = useState(false);
  const [remainingDeleteTime, setRemainingDeleteTime] = useState('');
  const { user } = useStore();
  const { deleteComment } = useCommentsStore();

  // check if this comment has been flagged
  const isFlagged = comment.reportsCount >= 1 || comment.isVisible === false;

  const canDeleteComment = () => {
    const createdAt = new Date(comment.createdAt);
    const now = new Date();
    const differenceInMs = now - createdAt;
    
    return differenceInMs <= 3 * 60 * 1000;  // 3 minutes in milliseconds
  };

  // update remaining delete timer functionality
  useEffect(() => {
    if (comment.user._id !== user._id) return;
    
    const updateRemainingTime = () => {
      const createdAt = new Date(comment.createdAt);
      const now = new Date();
      const differenceInMs = now - createdAt;
      const fiveMinutesInMs = 3 * 60 * 1000;
      
      if (differenceInMs <= fiveMinutesInMs) {
        const remainingMs = fiveMinutesInMs - differenceInMs;
        const remainingSecs = Math.ceil(remainingMs / 1000);
        const mins = Math.floor(remainingSecs / 60);
        const secs = remainingSecs % 60;
        setRemainingDeleteTime(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
      } else {
        setRemainingDeleteTime('');
      }
    };
    
    // initial call
    updateRemainingTime();
    
    const timer = setInterval(updateRemainingTime, 1000);
    
    return () => clearInterval(timer);
  }, [comment.createdAt, comment.user._id, user._id]);

  const handleDelete = async () => {
    if (!canDeleteComment()) {
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(comment._id);
      } catch (error) {
        console.error("Error deleting comment:", error);
      }
    }
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  
  return (
    <div id={`comment-${comment._id}`} className="mt-4">
      {/* Reply Indicator */}
      {comment.replyToUsername && (
        <div className="flex items-center gap-1 mb-1 text-gray-500 text-xs">
          <FaReply className="rotate-180" size={10} />
          <span>Reply to <span className="text-blue-400">{comment.replyToUsername}</span></span>
        </div>
      )}
      
      <div className="flex gap-2 sm:gap-3">
        <img
          src={comment.user.avatar || "/avatar1.png"}
          alt={comment.user.username}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className={`p-2 sm:p-4 rounded-lg ${isFlagged ? "bg-yellow-900/30 border border-yellow-700/50" : "bg-gray-800/50"}`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white">
                  {comment.user.username}
                </h4>
                <span className="text-gray-400 text-xs sm:text-sm">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              
              {comment.user._id === user._id && (
                <div className="text-right">
                  {canDeleteComment() ? (
                    <>
                      <button
                        onClick={handleDelete}
                        className="text-gray-400 hover:text-red-500 text-sm"
                      >
                        Delete
                      </button>
                      {remainingDeleteTime && (
                        <div className="text-xs text-gray-400">
                          {remainingDeleteTime} left
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-xs text-gray-400"></div>
                  )}
                </div>
              )}
            </div>
            
            {/* Flagged Comment */}
            {isFlagged && !showFlaggedContent ? (
              <div className="mt-2">
                <div className="flex items-center gap-2 text-yellow-500">
                  <FaExclamationTriangle />
                  <p className="font-medium text-sm sm:text-base">
                    This comment has been flagged as inappropriate
                  </p>
                </div>
                <button 
                  onClick={() => setShowFlaggedContent(true)}
                  className="mt-2 flex items-center gap-1 text-red-500 hover:text-red-400 text-xs sm:text-sm"
                >
                  <FaEye size={18} />
                  <span>Show flagged content</span>
                </button>
              </div>
            ) : (
              <div className="mt-2">
                <p className="text-white text-sm sm:text-base break-words">
                  {comment.content}
                </p>

                {/* Flagged Content Button */}
                {isFlagged && (
                  <button 
                    onClick={() => setShowFlaggedContent(false)}
                    className="mt-1 flex items-center gap-1 text-red-500 hover:text-red-400 text-xs sm:text-sm"
                  >
                    <FaEyeSlash size={18} />
                    <span>Hide flagged content</span>
                  </button>
                )}

              </div>
            )}
          </div>

          <CommentActions
            comment={comment}
            toggleReplyForm={toggleReplyForm}
          />

          {showReplyForm && (
            <div className="mt-4">
              <CommentForm
                mediaId={comment.mediaId}
                mediaType={comment.mediaType}
                replyToId={comment._id}
                replyToUsername={comment.user.username}
                onReplySubmit={() => setShowReplyForm(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;