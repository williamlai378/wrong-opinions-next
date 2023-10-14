import { NextResponse } from "next/server"
import prisma from "@/prisma/client"

export async function PUT(request) {
    const body = await request.json()
    console.log('body put',body);
    const results = await prisma.ListItem.update({
        where: {
            id: body.listItem.id,
        },
        data: body.listItem

    }).catch((e) => {
        console.log('error while updating', e);
        return NextResponse.json({
            'status': 'failure'
        })
    })


    if(!results) {
        return NextResponse.json({
            'status': 'failure',
            'message': 'list item not updated'
        })
    }
    
    return NextResponse.json({
        'status': 'success',
        'message': 'list item updated'
    })
}