import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise

type Post = {
    postId: String,
    userName: String,
    postDate: String,
    content: String,
}


const postSchema = new Schema({
    postId: String,
    parentId: String,
    reply: String,
    userName: String,
    
},
    {
        timestamps: true,
    }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

export default Post;