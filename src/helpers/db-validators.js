import Post from '../post/post.model.js';

export const postExists = async (postId) => {
    try {
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error("Error verifying post ID");
        }
        return true;
    } catch (err) {
        throw new Error("Error verifying post ID");
    }
};