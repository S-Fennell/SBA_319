import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        age:{
            type: Number
        },
        comments:{
            type: String
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Comment", commentSchema, "comments");