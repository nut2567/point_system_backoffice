import Mongoose, { Schema } from "mongoose";

const useSchema = new Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }, Image: String,
});

const post = mongoose.models.post || mongoose.model("post", useSchema);
export default post;