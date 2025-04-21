import React, { useState } from "react";
import { useCommentsStore } from '../../store/commentsStore';
import { useStore } from "../../store/store";

const CommentForm = ({
  mediaId,
  mediaType,
  replyToId = null,
  replyToUsername = null,
  onReplySubmit = null,
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addComment, replyToComment } = useCommentsStore();
  const { user } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      if (replyToId) { // replying to a specific comment id
        await replyToComment(replyToId, content, mediaId, mediaType, replyToUsername);
        if (onReplySubmit) onReplySubmit();
      } else {
        await addComment(content, mediaId, mediaType);
      }

      setContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-start gap-3">
        <img
          src={user.avatar || "/avatar1.png"}
          alt={user.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={replyToId ? `Reply to ${replyToUsername}...` : "Add a comment..."}
            className="w-full bg-gray-900/80 text-white p-3 rounded-md resize-none min-h-[80px]"
            required
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : replyToId ? "Reply" : "Comment"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;