import { NextResponse } from "next/server";
import Forum from '@/app/(models)/Forum';
import Thread from '@/app/(models)/Thread';
import Post from '@/app/(models)/Post';
import { ThreadT } from "@/types/Thread";



export async function POST(req: any) {
    try {
        const body = await req.json()
        const postData = body.form

        console.log(postData)

        if (!postData) {
            return NextResponse.json({ message: "Mangler informasjon" }, { status: 400 })

        }

        const existingThread = await Thread.findOne({ id: postData.threadId }).lean().exec() as any as ThreadT;

        // if (existingForum) {
        //     return NextResponse.json({ message: "Forum finnes allerede" }, { status: 409 })
        // }
        
        await Post.create(postData)
        console.log(postData)
        await Thread.findOneAndUpdate({ id: postData.threadId }, { replies: [ postData.postId, ...existingThread!.replies] })
        console.log(postData)

        return NextResponse.json({ message: "Kommentar opprettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}