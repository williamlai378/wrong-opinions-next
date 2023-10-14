import { NextResponse } from 'next/server';
import db from '../../../../prisma/client'

export async function POST(request) {

    const body = await request.json();
    const {animeId, userId} = body;
    console.log("animeId", animeId, "useriD", userId)
    if(!animeId || !userId) {
        return NextResponse.json({
            status: 'failure',
            error: 'Invalid Request',
            listed: false
        })
    }

    const list = await db.List.findFirst({
        where: {
            ownerId: userId
        }
    })

    if(!list?.id) {
        return NextResponse.json({
            status: 'failure',
            error: 'list does not exist',
            listed: false
        })
    }

    const results = await db.ListItem.findUnique({
        where: {
            animeId_listId: {
                animeId: animeId,
                listId: list.id
            }
        }
    })

    console.log('checklisted results', results)

    return NextResponse.json({
        status: 'success',
        listed: results ? true : false,
        data: results ? results : undefined
    })
}