import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [100, "Title cannot exceed 100 characters"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        maxLength: [3000, "Content cannot exceed 3000 characters"]
    },
    course: {
        type: String,
        required: [true, "Course is required"],
        enum: ["INGLÉS", "BIOLOGÍA", "TECNOLOGÍA", "MATEMÁTICA", "SEMINARIO", "PSICOLOGÍA", "FÍSICA", "ÉTICA", "TALLER", "PRÁCTICA"],
    },
    status: {
        type: Boolean,
        default: true
    }
},{
    versionKey: false,
    timestamps: true
});

postSchema.methods.toJSON = function () {
    const { _id, ...post } = this.toObject();
    post.id = _id;
    return post;
};

export default model("Post", postSchema);
