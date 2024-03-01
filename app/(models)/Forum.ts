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

const forumSchema = new Schema({
    label: String,
    status: String,
    threads: Array,
},
    {
        timestamps: true,
    }
);

const Forum = mongoose.models.Forum || mongoose.model("Forum", forumSchema)

export default Forum;