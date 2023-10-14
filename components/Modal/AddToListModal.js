'use client'
import { useEffect, useState } from "react"
import ReactPortal from "./ReactPortal";
import { motion, AnimatePresence } from "framer-motion";
import { BiArrowBack } from 'react-icons/bi'
import Select from 'react-select'
import { toast } from "react-hot-toast";
import { AddToList } from "@/app/api/list/add/[user]/AddToList";
import { UpdateListItem } from "@/app/api/list/edit/UpdateListItem";
import { useTitlePreferenceStore } from "@/context/titlePreferenceContext";
import axios from "axios";

const viewStatusOptions = [
    { value: 'WATCHING', label: "Watching" },
    { value: 'PLANNING', label: 'Planning' },
    { value: 'COMPLETED', label: 'Completed' },
    { value: 'PAUSED', label: 'Paused' },
    { value: 'DROPPED', label: 'Dropped' },
];

const unreleasedStatusOptions = [
    {status: 'PLANNING', label: 'Planning'}
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


export const AddToListModal = ({isOpen, handleClose, animeData, session, listItem = undefined, setListItem}) => {
    //inputs
    const [viewingStatus, setViewingStatus] = useState(listItem?.viewStatus ? listItem.viewStatus : 'WATCHING');
    const [episodeProgress, setEpisodeProgress] = useState(listItem?.episodeProgress ? listItem.episodeProgress : 0);
    const [rating, setRating] = useState(listItem?.rating ? listItem.rating : 1);


    const [listedVal, setListedVal] = useState(false);
    const [loading, setLoading] = useState(false);

    const titlePreference = useTitlePreferenceStore((state) => state.titlePreference)

    console.log(session)
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
    }, [isOpen]);
    

    useEffect(() => {
        //check if the anime is in the user's list
        const checkInList = async () => {
            console.log('checking in list')
            const results = await axios({
                method: "POST",
                url: `http://localhost:3000/api/list/checkListed`,
                data: {
                    animeId: animeData.id,
                    userId: session?.data ? session.data.user.id : session.user.id
                }
            })

            console.log(results)

            if (results.data.status === 'success') {
                console.log('results checklisted', results.data);
                setListedVal(results.data.listed)
                if (results?.data) {
                    console.log('there is data')
                    setListItem(results.data.data)
                }
            }
        }
        checkInList();
    }, [])

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (listedVal) {
            const newUpdatedItem = {...listItem, viewStatus: viewingStatus, episodeProgress: episodeProgress, rating: rating}
            const response = await UpdateListItem(newUpdatedItem)
            console.log('after making new list item', response)
            
            if (response?.status === 'success') {
                toast.success(`${animeData.animeTitle} succesfully updated`)
                handleClose()
                setLoading(false);
            }
            else {
                toast.error('Something went wrong! Please try again.')
                setLoading(false);
            }
        } else {
            const response = await AddToList(session?.data ? session.data.user.id : session.user.id, {
                'animeFormat': animeData.format,
                'animeImage': animeData.coverImage.large,
                'animeBannerImage': animeData.bannerImage,
                'animeStatus': animeData.status,
                'animeTitle': animeData.title[titlePreference],
                'episodeProgress': episodeProgress,
                'rating': rating,
                'totalEpisodes': animeData.episodes,
                'viewStatus': viewingStatus,
                'animeId': animeData.id,
                'animeColor': animeData.coverImage.color,
                'animePopularity': animeData.popularity
            })

            
            if (response?.data.status === 'success') {
                console.log('after adding to list', response?.data?.data)
                if (response?.data) { setListItem(response.data.data) }
                setLoading(false);
                toast.success(`${animeData.animeTitle} succesfully added to list`)
                handleClose()
            }
            else {
                toast.error('Something went wrong! Please try again.')
                setLoading(false)
            }
        }




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

                <div className="flex flex-col relative items-center w-3/4 h-2/3 bg-white p-4 rounded-md">
                    <button
                        onClick={() => handleClose()}
                        className="text-black absolute left-0 top-0 ml-3 mt-3">
                        <BiArrowBack size={30} className={`text-black hover:text-purple-400`} />
                    </button>
                    <div
                        style={{
                            backgroundImage: `url(${animeData.bannerImage})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}
                        className="h-[150px] w-full mt-10 addModalBanner flex justify-center items-center">
                        {listItem?.viewStatus &&
                            <p className="bg-white p-3 rounded-md opacity-60 font-semibold text-lg">
                                {`Listed ${listItem?.viewStatus ? `(${listItem?.viewStatus})` : ''}`}
                            </p>}
                    </div>
                    <div
                        className="grid grid-cols-1 gap-2 w-full">
                        <div>
                            <label htmlFor="viewStatus" className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">View Status</label>
                            <Select
                                id="viewStatus"
                                options={viewStatusOptions}
                                defaultValue={listItem ? viewStatusOptions.find(status => listItem.viewStatus === status.value) : viewStatusOptions[0]}
                                onChange={(e) => { setViewingStatus(e.value) }}
                            />
                        </div>
                        <div>
                            <label htmlFor="rating" className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Rating</label>
                            <Select
                                id="rating"
                                options={ratingOptions}
                                defaultValue={listItem ? ratingOptions.find(rating => listItem.rating === rating.value) : ratingOptions[0]}
                                onChange={(e) => { setRating(e.value) }}
                            />
                        </div>
                        <div>
                            <label htmlFor="episodeProgress" className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Episode Progress</label>
                            <Select
                                id="episodeProgress"
                                options={createEpisodeProgressOptions(animeData.totalEpisodes)}
                                placeholder="Episode"
                                defaultValue={listItem?.episodeProgress ? listItem.episodeProgress : ''}
                                onChange={(e) => { setEpisodeProgress(e.value) }}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-purple-200 text-lg rounded-lg mt-6">
                            {loading ? 'Loading' : (listItem ? "Update": "Add To List")}</button>
                    </div>
                </div>

            </motion.div>

        </ReactPortal>
    )
}