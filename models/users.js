import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        },
        address:{
            type: String,
            required: false
        },
    },
    {
        timestamps: true
    }
);
userSchema.index({name: String});
export default mongoose.model("User", userSchema, "users");