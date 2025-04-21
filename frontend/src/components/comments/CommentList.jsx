import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => {
    return (
        <div className="space-y-6 mt-6">
            {comments.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    Be the first to comment!
                </div>
            ) : (
                comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} />
                ))
            )}
        </div>
    );
};

export default CommentList;