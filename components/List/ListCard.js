
'use client'
import Image from "next/image"
import { averageRatingColor } from "@/lib/textColor"
import Link from "next/link"
import { useState } from "react"
import { EditModal } from "../Modal/EditModal"
import { AnimatePresence } from "framer-motion"
export default function ListCard({ anime, session, username, router }) {
    const [toggle, setToggle] = useState(false)
    //console.log(session)
    return (
        <div className="grid grid-cols-listCard my-1 border-b-2 border-gray-200 py-2 w-full">
            <div className="flex flex-row flex-nowrap items-center h-full">
                <div
                    className="group w-1/3 md:w-1/5 relative shadow-md aspect-9/12 overflow-hidden rounded-xl mr-3">
                    <Image
                        fill
                        priority
                        src={anime.animeImage}
                        alt={anime.animeTitle}
                        className="object-cover z-0"
                        sizes='(min-width: 480px) 500px, 50px'
                    />
                    {session?.status === 'authenticated' && session?.data?.user?.username === username[0] && (
                        <>
                            <div
                                className="w-full h-full opacity-0 group-hover:opacity-50 bg-black absolute transition-opacity z-30">
                            </div>
                            <button
                                style={{
                                    transform: 'translate(-50%, -50%)'
                                }}
                                onClick={() => setToggle(true)}
                                className="absolute top-[50%] left-[50%] px-2 py-1 rounded-md bg-purple-400 text-white opacity-0 group-hover:opacity-100 z-50 transition-opacity text-md">
                                EDIT
                            </button>
                            <AnimatePresence>
                                {toggle && <EditModal
                                    isOpen={toggle}
                                    session={session}
                                    username={username}
                                    router={router}
                                    handleClose={() => setToggle(false)} listItem={anime} />}
                            </AnimatePresence>
                        </>)
                    }
                </div>
                <div className="flex flex-col justify-between overflow-x-hidden h-full w-full">
                    <Link
                        title={anime.animeTitle}
                        className="whitespace-nowrap text-ellipsis overflow-x-hidden relative text-lg w-full group"
                        href={`/anime/${anime.animeId}`} replace>
                        <p className="group-hover:text-purple-400">{anime.animeTitle}</p>
                    </Link>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-light text-gray-400 ">
                            Ep. Progress: {anime.episodeProgress}/{anime.totalEpisodes}
                        </p>
                        <p className="text-sm font-light text-gray-400">
                            Status: {anime.viewStatus}
                        </p>
                    </div>

                </div>
            </div>

            <div
                className="w-full text-center flex items-center justify-center text-4xl">
                <div
                    style={{
                        backgroundColor: averageRatingColor(anime.rating),
                    }}
                    className="w-2/3 aspect-square flex justify-center items-center text-white rounded-xl shadow-lg">
                    {anime.rating}
                </div>
            </div>

        </div>
    )
}