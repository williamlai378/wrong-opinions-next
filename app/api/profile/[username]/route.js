import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    const {params} = context;
    const {username} = params;
  

    const userData = await prisma.User.findUnique({
        where: {
            username: username
        }
    }).catch((err) => {
        console.log(err)
        return NextResponse.error({
            status: 'failure',
            message: 'User not found'
        })
    })


    console.log('userData', userData)
    if(!userData) {
        return NextResponse.error({
            status: 'failure',
            message: 'User not found'
        })
    }

    const {listId} = await prisma.List.findFirst({
        where:{
            ownerId: userData.id
        },
    }).catch((err) => {
        console.log(err)
        return NextResponse.error({
            status: 'failure',
            message: 'List not found'
        })
    })

    const listData = await prisma.ListItem.findMany({
        where: {
            listId: listId
        }
    }).catch((err) => {
        console.log(err)
        return NextResponse.error({
            status: 'failure',
            message: 'Data not found'
        })
    })

    const opinionData = await prisma.Opinion.findMany({
        where: {
            userId: userData.id,
        },
        include: {
            responses: true
        }
    }).catch((err) => {
        console.log(err)
        return NextResponse.error({
            status: 'failure',
            message: 'Data not found'
        })
    })

   

    return NextResponse.json({
        status: 'success, dude what the fuck is going on',
        data: {
            opinionData: opinionData,
            userData: userData,
            listData: listData,
            
        }
    })
}