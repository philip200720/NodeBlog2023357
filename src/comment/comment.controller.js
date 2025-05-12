import Comment from "./comment.model.js";

export const createComment = async (req, res) => {
    try {
        const data = req.body;
        const comment = await Comment.create(data);

        return res.status(201).json({
            success: true,
            message: "Comment has been created",
            comment
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error creating comment",
            error: err.message
        });
    }
};



export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.query;

        const filter = {
            postId,
            status: true
        };

        const comments = await Comment.find(filter).sort({ createdAt: -1 });

        const formattedComments = comments.map(comment => {
            const date = new Date(comment.createdAt);
            const formattedComment = {
                ...comment.toObject(),
                createdAt: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
            };
            return formattedComment;
        });

        res.status(200).json({
            success: true,
            comments: formattedComments
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error getting comments",
            error: err.message
        });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        );

        if (!deletedComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            });
        }

        return res.status(200).json({
            success: true,
            deletedComment
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting comment",
            error: err.message
        });
    }
};