'use client'

import ListCard from "./ListCard";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { FaList } from 'react-icons/fa'
import { IoGrid } from 'react-icons/io5'
import { MdKeyboardArrowDown, MdArrowDownward } from 'react-icons/md'

import { AnimatePresence, motion } from "framer-motion";
import { list } from "postcss";
import GridCard from "./GridCard";

export default function List({ listData, session, username }) {
    const [listView, setListView] = useState("list-card")
    const [sortOption, setSortOption] = useState("title-desc")
    const [sortToggle, setSortToggle] = useState(false);
    const router = useRouter();

    const sortList = (list, sortOption) => {
        switch (sortOption) {
            case "title-desc": {
                return list.sort((a, b) => (a.animeTitle < b.animeTitle) ? 1 : ((b.animeTitle < a.animeTitle) ? -1 : 0));
                

            }
            case "title-asc": {
                return list.sort((a, b) => (a.animeTitle > b.animeTitle) ? 1 : ((b.animeTitle > a.animeTitle) ? -1 : 0));

            }
            case "score-desc": {
                return list.sort((a, b) => (a.rating < b.rating) ? 1 : ((b.rating < a.rating) ? -1 : 0));

            }
            case "score-asc": {
                return list.sort((a, b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));
            }
            default: {
                return list;
            }
        }
    }

    const sortDisplay = (sortOption) => {
        switch (sortOption) {
            case ('title-desc'): {
                return (
                    <div 
                        onClick={() => setSortToggle(!sortToggle)}
                        className="flex items-center flex-nowrap cursor-pointer z-50">
                        Title
                        <MdArrowDownward size={20} />
                        (Z-A)
                    </div>
                )
            }
            case ('title-asc'): {
                return (
                    <div 
                        onClick={() => setSortToggle(!sortToggle)}
                        className="flex items-center flex-nowrap cursor-pointer">
                        Title
                        <MdArrowDownward size={20} style={{ transform: 'rotate(180deg)' }} />
                        (A-Z)
                    </div>
                )
            }
            case ('popularity-desc'): {
                return (
                    <div 
                        onClick={() => setSortToggle(!sortToggle)}
                        className="flex items-center flex-nowrap cursor-pointer">
                        Popularity
                        <MdArrowDownward size={20} />
                    </div>
                )
            }
            case ('popularity-asc'): {
                return (
                    <div
                        onClick={() => setSortToggle(!sortToggle)}
                        className="flex items-center flex-nowrap cursor-pointer">
                        Popularity
                        <MdArrowDownward size={20} style={{ transform: 'rotate(180deg)' }} />
                    </div>
                )
            }
            case ('score-desc'): {
                return (
                    <div
                        onClick={() => setSortToggle(!sortToggle)}
                        className="flex items-center flex-nowrap cursor-pointer">
                        Score
                        <MdArrowDownward size={20} />
                    </div>
                )
            }
            case ('score-asc'): {
                return (
                    <div
                        onClick={() => setSortToggle(!sortToggle)}
                        className="flex items-center flex-nowrap cursor-pointer">
                        Score
                        <MdArrowDownward size={20} style={{ transform: 'rotate(180deg)' }} />
                    </div>
                )
            }
        }
    }

    if(listData.length <= 0) {
        return (
            <div 
                className="flex justify-center items-center min-h-[35vh]">
                No listed anime yet
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full max-w-[1200px]">
            <div className="flex justify-between items-center">
                <div></div>
                <div className="flex items-center">
                    <div className="mr-5 flex flex-nowrap items-center">
                        <p className="text-lg mr-2">Sort:</p>
                        <div
                            className="relative border-solid border-purple-300 border-2 px-1 rounded-md flex justify-between z-50">
                            {sortDisplay(sortOption)}
                            <motion.div
                                className="text-center flex justify-center items-center ml-2"
                                style={{
                                    transformOrigin: 'center',
                                }}
                                animate={{
                                    rotate: sortToggle ? 180 : 0

                                }}>
                                <MdKeyboardArrowDown size={20} onClick={() => setSortToggle(!sortToggle)} />
                            </motion.div>

                            <AnimatePresence>
                                {sortToggle && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -10
                                        }}
                                        animate={{
                                            opacity: sortToggle ? 1 : 0,
                                            y: sortToggle ? 28 : -10
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -10
                                        }}
                                        transition={{
                                            duration: 0.1
                                        }}
                                        style={{
                                            borderWidth: '2px'
                                        }}
                                        className="flex flex-col absolute top-0 right-0 bg-white z-40 border-purple-200 rounded-md py-1">
                                        <div
                                            onClick={() => {
                                                setSortToggle(false)
                                                setSortOption('title-asc')
                                            }}
                                            className="w-full cursor-pointer hover:bg-purple-300 transition-colors px-1 flex items-center">
                                            Title
                                            <MdArrowDownward size={20} style={{ transform: 'rotate(180deg)' }}/>
                                            (A-Z)
                                        </div>
                                        <div
                                            onClick={() => {
                                                setSortToggle(false)
                                                setSortOption('title-desc')
                                            }}
                                            className="w-full cursor-pointer hover:bg-purple-300 transition-colors px-1 flex items-center">
                                            Title
                                            <MdArrowDownward size={20}/>
                                            (Z-A)
                                        </div>
                                        <div
                                            onClick={() => 
                                            {
                                                setSortToggle(false)
                                                setSortOption('score-desc')
                                            }}
                                            className="w-full cursor-pointer hover:bg-purple-300 transition-colors px-1 flex items-center">
                                            Score
                                            <MdArrowDownward size={20} />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setSortToggle(false)
                                                setSortOption('score-asc')
                                            }}
                                            className="w-full cursor-pointer hover:bg-purple-300 transition-colors px-1 flex items-center">
                                            Score
                                            <MdArrowDownward size={20} style={{ transform: 'rotate(180deg)' }} />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setSortToggle(false)
                                                setSortOption('popularity-desc')
                                            }}
                                            className="w-full cursor-pointer hover:bg-purple-300 transition-colors px-1 flex items-center">
                                            Popularity
                                            <MdArrowDownward size={20} />
                                        </div>
                                        <div
                                            onClick={() => {
                                                setSortToggle(false)
                                                setSortOption('popularity-asc')
                                            }}
                                            className="w-full cursor-pointer hover:bg-purple-300 transition-colors px-1 flex items-center">
                                            Popularity
                                            <MdArrowDownward size={20} style={{ transform: 'rotate(180deg)' }} />
                                        </div>
                                    </motion.div>)}
                            </AnimatePresence>
                        </div>


                    </div>
                    <div className="flex items-center">
                        <button
                            onClick={() => setListView("list-card")}
                            className="py-1 px-2 rounded-md hover:bg-gray-200">
                            <FaList size={25} color={`${listView === 'list-card' ? '#b775ff' : 'black'}`} />
                        </button>
                        <button
                            onClick={() => setListView("grid")}
                            className="py-1 px-2 rounded-md hover:bg-gray-200">
                            <IoGrid size={25} color={`${listView === 'grid' ? '#b775ff' : 'black'}`} />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`grid ${listView === 'grid' ? 'grid-cols-4 gap-5' : 'grid-cols-1 gap-2'} px-4 w-full`}>
                <AnimatePresence>
                    {
                        sortList(listData, sortOption).map((anime, index) => {
                            if (listView === "list-card") {
                                return (
                                    <ListCard
                                        anime={anime}
                                        key={index}
                                        router={router}
                                        username={username}
                                        session={session}
                                        listItem={anime} />
                                )
                            }
                            else if (listView === "grid") {
                                return (
                                    <div key={index} className="flex flex-col overflow-x-hidden">
                                        <h1 className="text-lg whitespace-nowrap text-ellipsis">{anime.animeTitle}</h1>
                                        <GridCard
                                            anime={anime}
                                            router={router}
                                            username={username}
                                            session={session}
                                            listItem={anime}
                                        />
                                    </div>

                                )
                            }

                        })
                    }
                </AnimatePresence>
            </div>
        </div>

    )
}