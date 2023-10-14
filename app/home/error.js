'use client'
import Link from "next/link"

export default function ErrorPage({error, reset}) {
    console.log(error)


    return (
        <div 
            className="w-screen h-screen flex justify-center items-center flex-col">
            <div 
                className="w-1/2 h-1/2 flex justify-center items-center">
                Oops something went wrong!
            </div>
            <div className="flex flex-row">
                <button className='bg-green-300'>Try Again</button>
                <button className="bg-purple-400">
                    <Link href="/home">Return Home</Link>
                </button>
            </div>
        </div>
    )
}