import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
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
        },
    },
    {
        timestamps: true
    }
);

//itemSchema.in
export default mongoose.model("Item", itemSchema, "items");