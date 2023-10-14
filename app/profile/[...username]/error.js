
'use client'
import Link from "next/link"
export default function ProfilePageError({error}) {
    console.log(error.message)
    return (
        <div 
            className="w-screen h-screen flex flex-col justify-center items-center">
           <h1 className="text-2xl mb-2">{error.message}</h1>
            <Link 
                className="bg-purple-400 px-4 py-2 rounded-md text-white"
                href="/">
                Return Home
            </Link>
        </div>
    )
}