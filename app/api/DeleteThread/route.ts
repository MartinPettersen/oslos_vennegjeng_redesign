import { NextResponse } from "next/server";
import Thread from '@/app/(models)/Thread';
import Post from "@/app/(models)/Post";
import Forum from '@/app/(models)/Forum';
import { ThreadT } from "@/types/Thread";

type ForumT = {
    label: String,
    status: String,
    threads: ThreadT[],
}

export async function POST(req: any) {
    try {
        console.log("did i get called? ")
        const body = await req.json()
        const thread = body.thread


        if (!thread) {
            return NextResponse.json({ message: "Mangler Tråd informasjon" }, { status: 400 })
        }

        thread.replies.map(async(post: string) => {

            await Post.findOneAndDelete({ postId: post }).lean().exec();
        })
        // if (!existingForum) {
        //     return NextResponse.json({ message: "Forum finnes ikke" }, { status: 404 })
        // }

        const existingThread = await Thread.findOneAndDelete({ id: thread.id }).lean().exec();


        // await Forum.create(forumData)
        const existingForum = await Forum.findOne({ label: thread.forumLabel }).lean().exec() as any as ForumT;
        // const existingThread = await Thread.findOne({ id: threadId }).lean().exec();

        const index = existingForum!.threads.indexOf(thread.id);
        if (index > -1) {
            existingForum!.threads.splice(index, 1);
        }


        await Forum.findOneAndUpdate({ label: thread.forumLabel }, { threads: existingForum!.threads })


        return NextResponse.json({ data: "deleted" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}