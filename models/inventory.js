import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
    
    }
);

export default mongoose.model("Inventory", inventorySchema, "inventory");