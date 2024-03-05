import { NextResponse } from "next/server";
import Forum from '@/app/(models)/Forum';
import Thread from '@/app/(models)/Thread';
import Post from '@/app/(models)/Post';



export async function POST(req: any) {
    try {
        const body = await req.json()
        const formData = body.form
        const forumLabel = body.thread.forumLabel
        const threadId = body.thread.id
        // console.log(postData)

        if (!formData) {
            return NextResponse.json({ message: "Mangler informasjon" }, { status: 400 })

        }

        // const existingForum = await Thread.findOne({ id: postData.threadId }).lean().exec();

        // if (existingForum) {
        //     return NextResponse.json({ message: "Forum finnes allerede" }, { status: 409 })
        // }
        
        await Thread.findOneAndUpdate({ id: formData.id }, { headline: formData.headline, content: formData.content })

        return NextResponse.json({ message: "Tråd opdatert" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}