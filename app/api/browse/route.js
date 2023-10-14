import { NextResponse } from "next/server";
import { getBrowseData } from "@/lib/anilistGraphQL";

export async function POST(req) {

    const body = await req.json();

    //convert empty arrays into null
    //if string key (key is named search) is empty string, convert to null
    Object.keys(body).forEach((key) => {
        if (Array.isArray(body[key]) && body[key].length <= 0) {
            body[key] = null
        }
        if(key === 'search' && body[key] === '') {
            body[key] = null
        }
    })

    const res = await getBrowseData(body).then(async (response) => {
        console.log('api res:', response.status)
        
        if (response.errors) {
            return NextResponse.error({
                message: 'Something went wrong please try again'
            })
        }
        return await response.json();
    }).catch((err) => {
        console.log('err', err)
        return NextResponse.error({
            message: 'Something went wrong please try again'
        })
    });

    return NextResponse.json({
        status: 'success',
        data: res.data
    })
}
