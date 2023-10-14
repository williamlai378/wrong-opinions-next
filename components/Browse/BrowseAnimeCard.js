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
import '../../components/HomeComponents/styles.css'



const BrowseAnimeCard = ({ anime }) => {
    const session = useSession();
    const score = anime?.averageScore ? anime.averageScore : 'TBD'
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
            className="group item-card md:min-w-[175px] aspect-10/14 md:aspect-9/12 hover:origin-center relative">
            <div
                style={{
                    backgroundImage: `url(${anime.coverImage.large})`,
                    backgroundSize: 'cover'
                }}
                className="h-full w-full rounded-lg shadow-md relative">
                <div
                    className="overlay flex flex-col group absolute text-white font-extrabold w-full h-full p-3 rounded-lg text-center">
                    <p
                        title={anime.title.romaji}
                        className="card-title opacity-0 group-hover:opacity-100">
                        {anime.title.romaji}
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
                                if(session.status === 'authenticated') {
                                    setModalToggle(true)
                                }else {
                                    toast.error("Please sign in to add")
                                }
                            }}
                            className={`border-none p-0 `}>
                            <IoMdAddCircle size={30} color="white" />
                        </button>
                        <div className="bg-purple-400 flex justify-center items-center p-1 md:p-2 rounded-lg">
                            <Link
                                className="text-sm"
                                href={`anime/${anime.id}`}
                                shallow>
                                Go to Page
                            </Link>
                        </div>
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

export default BrowseAnimeCard;