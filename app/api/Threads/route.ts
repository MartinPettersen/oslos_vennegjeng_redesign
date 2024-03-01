import { NextResponse } from "next/server";
import Forum from '@/app/(models)/Forum';

export async function POST(req: any) {
    try {
        const body = await req.json()
        const formData = body.form
        const forumLabel = body.forumLabel


        if (!forumLabel) {
            return NextResponse.json({ message: "Mangler forum navn" }, { status: 400 })

        }

        const existingForum = await Forum.findOne({ label: forumLabel }).lean().exec();

        // if (existingForum) {
        //     return NextResponse.json({ message: "Forum finnes allerede" }, { status: 409 })
        // }
        
        await Forum.findOneAndUpdate({ label: forumLabel }, { threads: [ formData, ...existingForum!.threads] })
        return NextResponse.json({ message: "Innlegg opprettet" }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}