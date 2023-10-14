import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function GET(req, {params}) {
    const {username} = params;

    const results = await prisma.User.findUnique({
        where: {
            username: username
        }
    })

    if(results) {
        return NextResponse.json({
            usernameAvailable: false
        })
    }else {
        return NextResponse.json({
            usernameAvailable: true
        })
    }
}