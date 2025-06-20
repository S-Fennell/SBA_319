import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        brand:{
            type: String,
            required: false
        },
        weight:{
            type: String,
            required: false
        },
        qty:{
            type: Number,
            required: true
        },
        cost:{
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema, "users");