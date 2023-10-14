import { NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function POST(req, {params}) {

    const body = await req.json();
    const {userId} = params;

    console.log('body', body);

    const results = await prisma.User.update({
        where: {
            id: userId,
        },
        data: {
            [body.dataType]: body.newVal
        }
    }).catch((err) => {
        console.log(err);
        return null
    })


    if(results === null ) {
        return NextResponse.json({status: 'failure'})
    }

    return NextResponse.json({
        status: 'success',
    })
}