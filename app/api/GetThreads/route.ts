import { NextResponse } from "next/server";
import Thread from '@/app/(models)/Thread';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const forumLabel = body.forumLabel
        

        if (!forumLabel) {
            return NextResponse.json({ message: "Mangler Tråd" }, { status: 400 })
        }

        const existingThread = await Thread.find({ forumLabel: forumLabel }).sort({ 'createdAt' : -1 }).lean().exec();
        // , { sort: { 'createdAt' : -1 } }
        console.log(existingThread)
        // if (!existingForum) {
        //     return NextResponse.json({ message: "Forum finnes ikke" }, { status: 404 })
        // }

        // await Forum.create(forumData)
        return NextResponse.json({ data: existingThread[0] }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}