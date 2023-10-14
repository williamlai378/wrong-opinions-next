
import { NextResponse } from "next/server"
import prisma from "@/prisma/client"

export async function GET(req, {params}) {
  
    const {userId} = params;

    const settingsData = await prisma.User.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            bio: true,
            image: true,
            bannerImage: true,
            titlePreference: true
        }
    }).catch((err) => {
        return NextResponse.error({
            data: err
        })
    })

    

    if(settingsData?.id) {
        return NextResponse.json({
            status: 'success',
            data: settingsData
        })
    }
    else {
        return NextResponse.json({
            status: 'failure'
        })
    }
}