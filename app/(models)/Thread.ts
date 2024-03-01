import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise

type Post = {
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

const threadSchema = new Schema({
    id: String,
    headline: String,
    userName: String,
    content: String,
    forumLabel: String,
    replies: Array,
},
    {
        timestamps: true,
    }
);

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema)

export default Thread;