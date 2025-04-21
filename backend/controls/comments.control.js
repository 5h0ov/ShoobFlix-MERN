import { Comment } from "../models/modelComments.js";

export async function getComments(req, res) {
    try {
        const { mediaType, mediaId } = req.params;
        
        const comments = await Comment.find({
            mediaType,
            mediaId,
            isVisible: true
        })
        .populate('user', 'username avatar') // converting the user id field to an object containing id, username and avatar
        .sort({ createdAt: -1 });
        
        // map to add additional properties like number of likes and reports and if the current authenticated user has liked the comment
        const formattedComments = comments.map(comment => ({
            ...comment._doc,
            likesCount: comment.likes.length,
            reportsCount: comment.reports.length,
            isLiked: comment.likes.includes(req.user._id)
        }));
        
        res.status(200).json({ success: true, comments: formattedComments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function addComment(req, res) {
    try {
        const { content, mediaId, mediaType, replyToId, replyToUsername } = req.body;
        
        const newComment = new Comment({
            content,
            mediaId,
            mediaType,
            user: req.user._id,
            replyToId,
            replyToUsername
        });
        
        await newComment.save();
        
        // similarly as done before populate the user data
        const populatedComment = await Comment.findById(newComment._id)
            .populate('user', 'username avatar');
            
        res.status(201).json({ 
            success: true, 
            comment: {
                ...populatedComment._doc,
                likesCount: 0,
                reportsCount: 0,
                isLiked: false
            } 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function replyToComment(req, res) {
    try {
        const { commentId } = req.params;
        const { content, mediaId, mediaType } = req.body;
        
        // check if parent comment exists
        const parentComment = await Comment.findById(commentId);
        
        if (!parentComment) {
            return res.status(404).json({ message: "Parent comment not found" });
        }
        
        const newReply = new Comment({
            content,
            mediaId,
            mediaType,
            user: req.user._id,
            parentId: commentId
        });
        
        await newReply.save();
        
        const populatedReply = await Comment.findById(newReply._id)
            .populate('user', 'username avatar');
            
        res.status(201).json({ 
            success: true, 
            reply: {
                ...populatedReply._doc,
                likesCount: 0,
                reportsCount: 0,
                isLiked: false
            } 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateComment(req, res) {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        // check if user is the author of the comment
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only update your own comments" });
        }
        
        comment.content = content;
        await comment.save();
        
        res.status(200).json({ success: true, comment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteComment(req, res) {
    try {
        const { commentId } = req.params;

        console.log("commentId: ",commentId);
        
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        // check if user is the author of the comment
        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }

        const createdAt = new Date(comment.createdAt);
        const now = new Date();
        const differenceInMs = now - createdAt;
        
        if (differenceInMs > 3 * 60 * 1000) { // 3 minutes in milliseconds
            return res.status(403).json({ 
                message: "Comments can only be deleted within 5 minutes of posting"
            });
        }


        // check if the comment has replies
        const hasReplies = await Comment.findOne({ parentId: comment._id });
        
        if (hasReplies) 
            await Comment.deleteMany({ parentId: comment._id });
        
        await comment.deleteOne();


        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function likeComment(req, res) {
    try {
        const { commentId } = req.params;
        
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        // check if user has already liked the comment
        if (comment.likes.includes(req.user._id)) {
            return res.status(400).json({ message: "You have already liked this comment" });
        }
        
        comment.likes.push(req.user._id);
        await comment.save();
        
        res.status(200).json({ success: true, likesCount: comment.likes.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function unlikeComment(req, res) {
    try {
        const { commentId } = req.params;
        
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        // filter out the user id from the likes array of the comment
        comment.likes = comment.likes.filter(
            userId => userId.toString() !== req.user._id.toString()
        );
        
        await comment.save();
        
        res.status(200).json({ success: true, likesCount: comment.likes.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function reportComment(req, res) {
    try {
        const { commentId } = req.params;
        const { reason } = req.body;
        
        const comment = await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        // check if user has already reported this comment
        const alreadyReported = comment.reports.some(
            report => report.user.toString() === req.user._id.toString()
        );
        
        if (alreadyReported) {
            return res.status(400).json({ message: "You have already reported this comment" });
        }
        
        comment.reports.push({ user: req.user._id, reason });
        
        // if a comment has 5 or more reports, return the isVisible property as false
        if (comment.reports.length >= 5) {
            comment.isVisible = false;
        }
        
        await comment.save();
        
        res.status(200).json({ 
            success: true, 
            reportsCount: comment.reports.length,
            isVisible: comment.isVisible 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}