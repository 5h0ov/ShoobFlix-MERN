import express from 'express';
import { 
    getComments, 
    addComment, 
    replyToComment, 
    updateComment, 
    deleteComment, 
    likeComment, 
    unlikeComment, 
    reportComment 
} from '../controls/comments.control.js';

const router = express.Router();

router.get('/:mediaType/:mediaId', getComments);
router.post('/', addComment);
router.post('/:commentId/reply', replyToComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);
router.post('/:commentId/like', likeComment);
router.delete('/:commentId/like', unlikeComment);
router.post('/:commentId/report', reportComment);

export default router;