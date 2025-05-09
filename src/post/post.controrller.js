import Post from "./post.model.js";

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        const date = new Date(post.createdAt);

        post.createdAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            post
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting post",
            error: err.message
        });
    }
}

export const getPosts = async (req, res) => {
    try {
        const { course } = req.query;
        const filter = {
            status: true,
            ...(course && { course })
        };

        const posts = await Post.find(filter).sort({ createdAt: -1 });

        const formattedPosts = posts.map(post => {
            const date = new Date(post.createdAt);
            post.createdAt = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
            return post;
        });

        res.status(200).json({
            success: true,
            formattedPosts
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting posts",
            error: err.message
        });
    }
};

export const updatePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, course } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, course },
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            updatedPost
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating post",
            error: err.message
        });
    }
};


export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        return res.status(200).json({
            success: true,
            deletedPost
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting post",
            error: err.message
        });
    }
}