import db from '../../../../../../prisma/client'
import { NextResponse } from 'next/server';
export async function POST(req, context) {
    console.log('deleting opinion response');
    const body = await req.json();
    const { opinionId } = context.params


    const opinionRes = await db.OpinionResponse.delete({
        where: {
            specificUser: {
                opinionId: Number(opinionId),
                userId: body.responseUserId
            }

        }
    })

    console.log(opinionRes);
    if(!opinionRes) {
        return NextResponse.error({
            status: 'failure'
        })
    }

    return NextResponse.json({
        status: 'success'
    })
}