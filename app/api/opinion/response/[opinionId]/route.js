import { NextResponse } from "next/server";
import db from '../../../../../prisma/client'


export async function POST(req, context) {
    const body = await req.json();
    console.log('body response', body);
    console.log('context', context)
    console.log('opinionId', context.params.opinionId)

    const opinionRes = await db.OpinionResponse.create({
        data: {
            opinionId: Number(context.params.opinionId),
            userId: body.responseUserId,
            response: body.response === 'like' ? true : false
        }

    })

    if (!opinionRes) {
        return NextResponse.error({
            message: 'Something went wrong please try again'
        })
    }

    return NextResponse.json({
        status: 'success'
    })
}

export async function PUT(req, context) {
    console.log('updating response')
    const body = await req.json();
    console.log(body)

    const opinionRes = await db.OpinionResponse.update({
        where: {
            specificUser: {
                opinionId: Number(context.params.opinionId),
                userId: body.responseUserId
            }
        },
        data: {
            response: body.response
        }

    })
    console.log(opinionRes)

    if (!opinionRes) {
        return NextResponse.error({
            message: 'Something went wrong please try again'
        })
    }

    return NextResponse.json({
        status: 'success'
    })
}

