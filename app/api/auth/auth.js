
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./[...nextauth]/route";


export async function GET(request) {
    const session = await getServerSession(authOptions);

    if(!session) {
        return new NextResponse(JSON.stringify({error: 'unauthorized'}), {
            status: 401
        })
    }


    return NextResponse.json({authenticated: !!session})
}