import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise

export type Post = {
    postId: String,
    parentId: String,
    reply: String,
    userName: String,
    createdAt: String,
    updatedAt: String,
    children: String[]
}


const postSchema = new Schema({
    postId: String,
    parentId: String,
    reply: String,
    userName: String,
    children: Array
},
    {
        timestamps: true,
    }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

export default Post;