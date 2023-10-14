import { NextResponse } from 'next/server';
import db from '../../../../prisma/client'

export async function POST(request) {
    const body = await request.json()

    console.log(body);

    const results = await db.Opinion.create({
        data: {
            text: body.text,
            userId: body.userId,
            animeId: body.animeId,
        }
    })


    if(!results) {
        NextResponse.json({status: 'failure'})
    }



    return NextResponse.json({status: 'success'})
}