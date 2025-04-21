import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

export const useCommentsStore = create((set, get) => ({
    comments: [],
    loading: false,
    
    // helper function to find a comment by ID 
    findCommentById: (commentId) => {
        const comments = get().comments;
        return comments.find(comment => comment._id === commentId);
    },
    
    // fetch comments for a specific media type and id
    fetchComments: async (mediaType, mediaId) => {
        set({ loading: true });

        try {
            const res = await axios.get(`/api/comments/${mediaType}/${mediaId}`);
            
            // store all comments in an array sorted by newest first by default
            const allComments = res.data.comments;
            allComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            
            set({ comments: allComments, loading: false });
        } catch (error) {
            console.error('Error fetching comments:', error);
            set({ loading: false });
        }
    },
    
    addComment: async (content, mediaId, mediaType, replyToId = null, replyToUsername = null) => {
        try {
            const res = await axios.post('/api/comments', {
                content,
                mediaId,
                mediaType,
                replyToId,
                replyToUsername
            });
            
            set(state => ({ 
                comments: [
                    {
                        ...res.data.comment,
                        isVisible: true,
                    },
                    ...state.comments
                ] 
            }));
            
            toast.success('Comment added successfully');
            return res.data.comment;
        } catch (error) {
            toast.error('Failed to add comment');
            throw error;
        }
    },
    
    // combined function that handles creation of both comments and replies
    replyToComment: async (commentId, content, mediaId, mediaType, replyToUsername) => {
        return get().addComment(content, mediaId, mediaType, commentId, replyToUsername);
    },
    
    toggleLike: async (commentId) => {
        try {
            const targetComment = get().findCommentById(commentId);
            
            if (!targetComment) 
                throw new Error('Comment not found');
            
            const isLiked = targetComment.isLiked;

            let res;
            if (isLiked) {
                res = await axios.delete(`/api/comments/${commentId}/like`);
            } else {
                res = await axios.post(`/api/comments/${commentId}/like`);
            }
        
            set(state => {
                const newComments = state.comments.map(comment => {
                    if (comment._id === commentId) {
                        return {
                            ...comment,
                            likesCount: res.data.likesCount,
                            isLiked: !isLiked
                        };
                    }
                    return comment;
                });
                
                return { comments: newComments };
            });
            
            return res.data;
        } catch (error) {
            toast.error('Failed to update like');
            throw error;
        }
    },
    
    reportComment: async (commentId, reason) => {
        try {
            const res = await axios.post(`/api/comments/${commentId}/report`, { reason });
            
            set(state => {
                const newComments = state.comments.map(comment => {
                    if (comment._id === commentId) {
                        return {
                            ...comment,
                            reportsCount: res.data.reportsCount,
                            isVisible: res.data.isVisible
                        };
                    }
                    return comment;
                });
                
                return { comments: newComments };
            });
            
            toast.success('Comment reported');
            return res.data;
        } catch (error) {
            toast.error('Failed to report comment');
            throw error;
        }
    },
    
    deleteComment: async (commentId) => {
        try {
            await axios.delete(`/api/comments/${commentId}`);
            
            // filter out the deleted comment
            set(state => ({
                comments: state.comments.filter(comment => comment._id !== commentId)
            }));
            
            toast.success('Comment deleted successfully');
        } catch (error) {
            toast.error('Failed to delete comment');
            throw error;
        }
    }
}));