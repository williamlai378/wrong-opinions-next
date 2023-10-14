import { NextResponse } from 'next/server'
import db from '../../../../../prisma/client'

export async function GET(request, context) {

    const animeId = Number(context.params.animeId)

    const results = await db.Opinion.findMany({
        where: {
            animeId: animeId
        },
        include: {
            user: true,
            responses: true
        },
    })

    console.log(results);

    return NextResponse.json({status: "success", opinions: results});
}