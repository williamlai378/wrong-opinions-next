
import { NextResponse } from 'next/server';
import db from '../../../../../prisma/client'

export async function DELETE(req, context) {
    console.log(context)
    const deletedOpinion = await db.Opinion.delete({
        where: {
            opinionId: Number(context.params.opinionId)
        }
    })
    
    console.log(deletedOpinion);

    return NextResponse.json({
        status: 'success'
    })

}