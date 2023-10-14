'use client'
import Link from "next/link"
export default function ErrorPage(error) {

    return (
        <div
            className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="mb-4">
                {error.error.message}
            </h1>
            {error.error.message === 'You are not authenticated' ? (
                <Link 
                    href="/login"
                    className="bg-purple-400 px-4 py-2 text-xl font-semibold text-white rounded-md">
                    Login
                </Link>
            ) : (<Link href="/home">Return Home</Link>)}
        </div>
    )
}