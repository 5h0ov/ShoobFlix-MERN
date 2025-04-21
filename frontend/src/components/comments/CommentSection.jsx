import React, { useEffect } from 'react';
import { useCommentsStore } from '../../store/commentsStore';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentSection = ({ mediaId, mediaType }) => {
    const { comments, loading, fetchComments } = useCommentsStore();

    useEffect(() => {
        fetchComments(mediaType, mediaId);
    }, [mediaType, mediaId, fetchComments]);

    // handle hash fragment
    useEffect(() => {
        if (loading) return;

        // check if URL has a comment hash
        const hash = window.location.hash;
        if (hash && hash.startsWith('#comment-')) {
            // small delay to ensure comments are rendered
            setTimeout(() => {
                const commentElement = document.getElementById(hash.substring(1));
                if (commentElement) {
                    commentElement.scrollIntoView();
                    
                    commentElement.classList.add('highlight-comment');
                    
                    setTimeout(() => {
                        commentElement.classList.remove('highlight-comment');
                    }, 2000);
                }
            }, 500);
        }
    }, [loading, comments]);


    return (
        <div className="w-full bg-black">
            <div className="max-w-6xl mx-auto mt-10 text-white px-4">
                <h2 className="text-4xl font-bold mb-6 flex items-center">
                    Comments <span className="text-xl ml-2 text-gray-400">({comments.length})</span>
                </h2>
                
                <CommentForm mediaId={mediaId} mediaType={mediaType} />
                
                {loading ? (
                    <div className="flex justify-center my-8">
                        <div className="animate-pulse bg-gray-700 rounded-md w-full h-32 shimmer"></div>
                    </div>
                ) : (
                    <div className="pb-8">
                        <CommentList comments={comments} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;