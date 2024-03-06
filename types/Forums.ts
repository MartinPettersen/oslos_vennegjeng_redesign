import { Post } from "./Post"
import { ThreadT } from "./Thread"

export type Forum = {
    label: String,
    status: String,
    threads: String[],
}

export type ForumT = {
    label: String,
    status: String,
    threads: ThreadT[],
}
