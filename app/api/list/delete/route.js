
import { NextResponse } from "next/server";
import db from '@/prisma/client';
export async function DELETE(req) {
    const {listItem} = req.body;
    console.log(listItem)
    const deletedListItem = await db.ListItem.delete({
        where: {
            listId: listItem.id,
        }
    }).catch((e) => {
        console.log(e);
        return NextResponse.error({
            status: 'failure',
            message: 'Something went wrong'
        })
    })

    return NextResponse.status(200).json({
        status: 'success',
        data: deletedListItem
    })

}