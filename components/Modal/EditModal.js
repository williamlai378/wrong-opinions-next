'use client'
import { useEffect, useState } from "react"
import ReactPortal from "./ReactPortal";
import { motion, AnimatePresence } from "framer-motion";
import { BiArrowBack } from 'react-icons/bi'
import Select from 'react-select'
import { toast } from "react-hot-toast";
import Image from "next/image";
import { hexToRgba } from "@/lib/textColor";



const viewStatusOptions = [
    { value: 'WATCHING', label: "Watching" },
    { value: 'PLANNING', label: 'Planning' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'PAUSED', label: 'Paused' },
    { value: 'DROPPED', label: 'Dropped' },
]

const ratingOptions = [
    { label: '1 (Trash)', value: 1 },
    { label: '2 (Horrible)', value: 2 },
    { label: '3 (Very Bad)', value: 3 },
    { label: '4 (Bad)', value: 4 },
    { label: '5 (Average)', value: 5 },
    { label: '6 (Fine)', value: 6 },
    { label: '7 (Good)', value: 7 },
    { label: '8 (Very Good)', value: 8 },
    { label: '9 (Great)', value: 9 },
    { label: '10 (Masterpiece)', value: 10 }
];


export const EditModal = ({ isOpen, handleClose, listItem, session, router, username /**username params */ }) => {

    //inputs
    const [viewingStatus, setViewingStatus] = useState(listItem.viewStatus ? listItem.viewStatus : "WATCHING");
    const [episodeProgress, setEpisodeProgress] = useState(listItem.episodeProgress);
    const [rating, setRating] = useState(listItem.rating ? listItem.rating: 0);

    console.log(listItem)

    //other useful variables
    const [loading, setLoading] = useState(false);
    const [listed, setListed] = useState(false);

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen])

    if (!isOpen || !session) return null;

    const createEpisodeProgressOptions = (maxEpisodes) => {
        let tempArray = [];

        for (let i = 1; i <= maxEpisodes; i++) {
            tempArray.push(
                {
                    label: `${i}`,
                    value: i
                }
            )
        }
        return tempArray
    }

    let episodeProgressOptions = createEpisodeProgressOptions(listItem.totalEpisodes)

    const handleSubmit = async () => {
        setLoading(true);
        const tempItem = {
            ...listItem,
            viewStatus: viewingStatus,
            episodeProgress: episodeProgress,
            rating: rating
        }

        if (session?.status === 'authenticated' && session?.data.user.username.toString() === username.toString()) {

            const response = await fetch(`/api/list/edit/`, {
                method: 'PUT',
                body: JSON.stringify({
                    listItem: tempItem,
                })
            }).catch((error) => {
                console.log(error);
                toast.error('Something went wrong! Please try again later')
                handleClose();
            })

            console.log(response)
            setLoading(false);
            toast.success(`${listItem.animeTitle} has been updated!`)
            router.refresh();
            handleClose();
        }
        else {
            toast.error("Not Authorized")
            handleClose();
        }
    }

    const handleDelete = async () => {
        setLoading(true);
        const response = await fetch(`/api/list/delete/`, {
            method: 'DELETE',
            body: JSON.stringify({
                listItem: listItem,

            })
        }).catch((error) => {
            console.log(error);
            toast.error('Something went wrong! Please try again later')
            handleClose();
        })
    }


    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-60"></div>
            <motion.div
                initial={{
                    scale: 0,
                    opacity: 0,
                    filter: 'blur(5px)'
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)'
                }}
                exit={{
                    scale: 0,
                    opacity: 0,
                    filter: 'blur(5px)'
                }}
                className="fixed inset-0 w-screen h-screen bg-transparent flex flex-col justify-center items-center overflow-hidden z-50">

                <div className="flex flex-col relative items-center w-3/4 h-2/3 md:h-4/5 bg-white rounded-md">
                    <div className="w-full flex">
                        <button
                            onClick={() => handleClose()}
                            className="text-black">
                            <BiArrowBack size={30} className={`text-black hover:text-purple-400`} />
                        </button>
                    </div>

                    <div
                        className="h-[200px] md:h-[300px] w-full mt-2 flex justify-center items-center relative p-2 text-center">
                        <Image
                            src={listItem.animeBannerImage}
                            alt={listItem.animeTitle}
                            fill
                            className="object-cover object-center z-0"
                            sizes={'(min-width: 480px) 600px'}
                        />
                        <div
                            style={{
                                backgroundColor: hexToRgba(listItem.animeColor, 0.85),
                            }}
                            className={`z-10 bg-opacity-0 p-2 rounded-lg font-bold text-xl text-white`}>
                            {listItem.animeTitle}
                        </div>
                    </div>
                    <div
                        className="grid grid-cols-1 gap-1 w-full h-full px-4">
                        <div>
                            <label htmlFor="viewStatus" className="mb-1 text-sm font-medium text-gray-900 dark:text-white">View Status</label>
                            <Select
                                id="viewStatus"
                                options={viewStatusOptions}
                                defaultValue={listItem ? viewStatusOptions.find(status => listItem.viewStatus === status.value) : viewStatusOptions[0]}
                                onChange={(e) => { setViewingStatus(e.value) }}
                            />
                        </div>
                        <div>
                            <label htmlFor="rating" className="mb-1 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                            <Select
                                id="rating"
                                options={ratingOptions}
                                defaultValue={listItem ? ratingOptions.find(rating => Number(listItem.rating) === Number(rating.value)) : ratingOptions[0]}
                                onChange={(e) => { setRating(e.value) }}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="episodeProgress"
                                className="mb-1 text-sm font-medium text-gray-900 dark:text-white">Episode Progress</label>
                            <Select
                                id="episodeProgress"
                                options={episodeProgressOptions}
                                placeholder="Episode"
                                defaultValue={listItem ? episodeProgressOptions.find(episode => listItem.episodeProgress === episode.value) : episodeProgress[0]}
                                onChange={(e) => { setEpisodeProgress(e.value) }}
                            />
                        </div>
                        <div className="flex justify-between items-center self-end mb-4">
                            <button
                                onClick={() => {
                                    setLoading(true);
                                    handleDelete();
                                }}
                                disabled={loading}
                                className={`${loading ? 'bg-red-300' : 'bg-red-500'} p-2 text-lg rounded-md w-[100px] text-white font-semibold`}>
                                {loading ? (
                                    <>
                                        <div
                                            class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status">
                                        </div>
                                    </>

                                ) : 'Remove'}
                            </button>
                            <button
                                disabled={loading}
                                onClick={handleSubmit}
                                className={`${loading ? 'bg-purple-200' : 'bg-purple-400'} p-2 text-lg rounded-md w-[100px] text-white font-semibold`}>
                                {loading ? (
                                    <div
                                        class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        role="status">
                                    </div>

                                ) : 'Save'}
                            </button>

                        </div>

                    </div>
                </div>
            </motion.div>
        </ReactPortal>
    )
}
