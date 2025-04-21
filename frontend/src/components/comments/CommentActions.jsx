import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaShare, FaFlag, FaReply } from "react-icons/fa";
import { useCommentsStore } from '../../store/commentsStore';
import { toast } from "react-toastify";

const CommentActions = ({ comment, toggleReplyForm }) => {
  const { toggleLike, reportComment } = useCommentsStore();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const handleLikeToggle = async () => {
        try {
            await toggleLike(comment._id);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

  const handleShare = () => {
    const commentUrl = `${window.location.href.split('#')[0]}#comment-${comment._id}`;
    
    navigator.clipboard.writeText(`Check out this comment: ${commentUrl}`);
    toast.success("Link copied to clipboard!");
  };

  const openReportModal = () => {
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
    setReportReason("");
  };

  const handleReport = async () => {
    if (!reportReason.trim()) return;

    try {
      await reportComment(comment._id, reportReason);
      closeReportModal();
    } catch (error) {
      console.error("Error reporting comment:", error);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <button
        onClick={handleLikeToggle}
        className={`flex items-center gap-1 ${
          comment.isLiked ? "text-red-500" : "text-gray-400"
        } hover:text-red-500`}
      >
        {comment.isLiked ? <FaHeart /> : <FaRegHeart />}
        <span>{comment.likesCount}</span>
      </button>

      <button
        onClick={toggleReplyForm}
        className="flex items-center gap-1 text-gray-400 hover:text-blue-400"
      >
        <FaReply />
        <span>Reply</span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1 text-gray-400 hover:text-green-400"
      >
        <FaShare />
        <span>Share</span>
      </button>

      <button
        onClick={openReportModal}
        className="flex items-center gap-1 text-gray-400 hover:text-yellow-500"
      >
        <FaFlag />
        <span>Report</span>
      </button>

      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Report Comment</h3>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Please explain why you're reporting this comment..."
              className="w-full bg-gray-800 text-white p-3 rounded-md resize-none min-h-[100px] mb-4"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeReportModal}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={!reportReason.trim()}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentActions;