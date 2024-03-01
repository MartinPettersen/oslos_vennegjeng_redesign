import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise

type Post = {
    postId: String,
    userName: String,
    postDate: String,
    content: String,
}

type Thread = {
    headline: String,
    userName: String,
    content: String,
    replies: Post[],
}

const postSchema = new Schema({
    postId: String,
    userName: String,
    postDate: String,
    content: String,
},
    {
        timestamps: true,
    }
);

const Post = mongoose.models.Thread || mongoose.model("Post", postSchema)

export default Post;