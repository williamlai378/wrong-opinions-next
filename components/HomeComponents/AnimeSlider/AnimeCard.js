'use client'
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { GiHumanTarget } from 'react-icons/gi'
import { averageScoreColor } from "@/lib/textColor"
import { useState, useEffect } from "react"
import { IoMdAddCircle } from 'react-icons/io'
import toast from "react-hot-toast"
import Link from "next/link"
import { AddToListModal } from "@/components/Modal/AddToListModal"



export const AnimeCard = ({ anime, titlePreference = 'userPreferred' }) => {
    const session = useSession();
    const score = anime?.averageScore ? anime.averageScore : 'TBD'
    const title = anime.title[titlePreference] ? anime.title[titlePreference] :
        (anime.title?.english ? anime.title.english : anime.title.romaji);
    const [airingCount, setAiringCount] = useState(anime?.nextAiringEpisode ? anime.nextAiringEpisode.timeUntilAiring : null);
    const [modalToggle, setModalToggle] = useState(false);

    let isAiring = anime.status === "RELEASING"
        || anime.status === "NOT_YET_RELEASED"

    const getReturnCountdown = () => {
        if (!anime.nextAiringEpisode) return ''
        let daysLeft = Math.floor(airingCount / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((airingCount % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((airingCount % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((airingCount % (1000 * 60)) / 1000);

        return `Ep.${anime.nextAiringEpisode.episode} in 
        ${daysLeft > 0 ? `${daysLeft}D:` : ''}
        ${hoursLeft > 0 ? `${hoursLeft}H:` : ''}
        ${minutesLeft > 0 ? `${minutesLeft}M:` : ''}
        ${secondsLeft >= 0 ? `${secondsLeft}s` : ''}`
    }

    useEffect(() => {

        const countDown = setInterval(() => {

            setAiringCount(airingCount - 1000)
        }, 1000)

        if (isAiring && airingCount) {
            return () => clearInterval(countDown)
        }
    }, [setAiringCount])



    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 280, damping: 10 }}
            className="group item-card min-w-[125px] sm:min-w-[155px] md:min-w-[175px] aspect-10/14 md:aspect-9/12 mr-5 hover:origin-center">
            <div
                style={{
                    backgroundImage: `url(${anime.coverImage.large})`,
                    backgroundSize: 'cover'
                }}
                className="h-full w-full rounded-lg shadow-md relative">
                <div
                    className="overlay flex flex-col group absolute text-white font-extrabold w-full h-full p-3 rounded-lg text-center">
                    <p
                        title={title}
                        className="card-title opacity-0 group-hover:opacity-100">
                        {title}
                    </p>
                    <div className="animeScore opacity-0 group-hover:opacity-100">
                        <p className="text-xl " style={{ color: averageScoreColor(anime.averageScore) }}>{score}%</p>
                    </div>
                    <div className="flex flew-nowrap items-center justify-center opacity-0 group-hover:opacity-100">
                        <GiHumanTarget size={30} className="mr-2" />
                        <p>{anime.popularity}</p>
                    </div>
                    {isAiring !== null && (
                        <div className="hidden md:flex w-full justify-center items-center opacity-0 group-hover:opacity-100">
                            <h6 className="text-bold text-sm md:text-lg">{getReturnCountdown()}</h6>
                        </div>)}
                    <div className="w-full flex flex-row justify-evenly flex-nowrap opacity-0 group-hover:opacity-100 absolute card-add-container">
                        <button
                            onClick={() => {
                                if (session.status === 'authenticated') {
                                    setModalToggle(true)
                                } else {
                                    toast.error("Please sign in to add")
                                }
                            }}
                            className={`border-none p-0 `}>
                            <IoMdAddCircle size={30} color="white" />
                        </button>

                        <Link
                            
                            href={`anime/${anime.id}`}
                            shallow>
                            <motion.div
                                initial={{
                                    scale: 1
                                }}
                                whileHover={{
                                    scale: 1.1
                                }}
                                className="text-sm bg-purple-400 rounded-md py-1 px-2">
                                Go to Page
                            </motion.div>

                        </Link>

                        {modalToggle && (
                            <AddToListModal
                                isOpen={modalToggle}
                                session={session}
                                handleClose={() => { setModalToggle(false) }}
                                animeData={{
                                    animeId: anime.id,
                                    bannerImage: anime.bannerImage,
                                    totalEpisodes: anime.episodes,
                                    animeStatus: anime.status,
                                    animeTitle: anime.title.romaji,
                                    animeImage: anime.coverImage.large,
                                    animeFormat: anime.format,
                                    animeColor: anime.coverImage.color,
                                }} />
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}