import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req, context) {

    const body = await req.json();
    const {opinionId} = context.params;

    console.log('body', body)

    //check if the user is authenticated
    const opinionUser = await prisma.Opinion.findUnique({
        where: {
            opinionId: Number(opinionId)
        }
    })

    if(opinionUser?.userId !== body.reqUserId) {
        return NextResponse.forbidden('You are not authorized to edit this opinion')
    }

    //update the opinion
    const updatedOpinion = await prisma.Opinion.update({
        where: {
            opinionId: Number(opinionId)
        },
        data: {
            text: body.newOpinion
        }
    }).catch((error) => {
        console.log(error);
        return NextResponse.error('There was an error updating your opinion')
    })

    return NextResponse.json({
        status: 'success',
        data: updatedOpinion

    })
}