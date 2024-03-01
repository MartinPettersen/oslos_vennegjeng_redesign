import { Post } from "./Post"

export type Thread = {
    headline: String,
    userName: String,
    content: String,
    replies: Post[],
}