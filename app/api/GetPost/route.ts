import { NextResponse } from "next/server";
import Thread from '@/app/(models)/Thread';
import Post from "@/app/(models)/Post";

export async function POST(req: any) {
    try {
        const body = await req.json()
        const postId = body.postId
        
        console.log(postId)
        if (!postId) {
            return NextResponse.json({ message: "Mangler Post" }, { status: 400 })
        }

        const existingPost = await Post.findOne({ postId: postId }).lean().exec();
        console.log("post runner")
        console.log(existingPost)
        // if (!existingForum) {
        //     return NextResponse.json({ message: "Forum finnes ikke" }, { status: 404 })
        // }

        // await Forum.create(forumData)
        return NextResponse.json({ data: existingPost }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}