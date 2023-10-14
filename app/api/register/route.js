import bcrypt from 'bcrypt'
import client from '../../../prisma/client'
import { NextResponse } from 'next/server'


export async function POST(request) {
    const body = await request.json();
    const {name, username, email, password, userId} = body;

    if(!name || !username || !email || !password) {
        console.log('Missing Fields')
        return new NextResponse("Missing Fields", {status: 400})
    }


    const exist = await client.User.findUnique({
        where: {
            email
        }
    })

    if(exist) {
        throw new Error("Email already registered")
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await client.User.create({
        data: {
            name, 
            username, 
            email, 
            password: hashPassword,
            lists: {
                create: [
                    {
                        name: 'Primary',
                    }
                ]
            }
        }
    })
    console.log('newUser', newUser)

   /* const newList = await client.List.create({
        data: {
            name: 'Primary',
            ownerId: newUser.id,
        }
        
    })
    */



    return NextResponse.json({
        error: false,
        message: "You have successfully registered"
    })

}
