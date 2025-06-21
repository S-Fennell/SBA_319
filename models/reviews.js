import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
    {
        item:{
            type: String,
            default: "Shaker"
        },
        reviews:[
            {
                username:{
                    type: String
                },
                age:{
                    type: Number,
                    requird: false
                },
                comment:{
                    type: String
                },
            }
        ]
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Review", reviewsSchema, "reviews");