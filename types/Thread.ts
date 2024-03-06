import { Post } from "./Post"

export type Thread = {
    id: String,
    headline: String,
    userName: String,
    content: String,
    forumLabel: String,
    replies: String[],
}

export type ThreadT = {
    id: String,
    headline: String,
    userName: String,
    content: String,
    forumLabel: String,
    replies: String[],
}