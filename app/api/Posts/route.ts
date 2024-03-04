import { NextResponse } from "next/server";
import Forum from '@/app/(models)/Forum';
import Thread from '@/app/(models)/Thread';
import Post from '@/app/(models)/Post';



export async function POST(req: any) {
    try {
        const body = await req.json()
        const postData = body.form

        console.log(postData)

        if (!postData) {
            return NextResponse.json({ message: "Mangler informasjon" }, { status: 400 })

        }

        const existingForum = await Thread.findOne({ id: postData.threadId }).lean().exec();

        // if (existingForum) {
        //     return NextResponse.json({ message: "Forum finnes allerede" }, { status: 409 })
        // }
        
        await Post.create(postData)
        console.log(postData)
        await Thread.findOneAndUpdate({ id: postData.threadId }, { replies: [ postData.threadId, ...existingForum!.replies] })
        console.log(postData)

        return NextResponse.json({ message: "Kommentar opprettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}