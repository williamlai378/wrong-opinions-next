'use client'

import { useState, useEffect, useRef } from "react"
import { AiOutlineFilter } from 'react-icons/ai'
import { FaSort } from 'react-icons/fa'
import { BsSortAlphaDown, BsSortAlphaDownAlt, BsArrowDown } from 'react-icons/bs'
import BrowseDisplay from "@/components/Browse/BrowseDisplay";
import { FilterModal } from "@/components/Modal/Filters/FilterModal";
import { AnimatePresence, motion } from "framer-motion";
export default function BrowsePage({ }) {
    const [dataLoading, setDataLoading] = useState(false);
    const [filterToggle, setFilterToggle] = useState(false);
    const [sortToggle, setSortToggle] = useState(false);
    const [browseFilters, setBrowseFilters] = useState(
        {
            search: '',
            genreIn: [],
            genreNotIn: [],
            tagIn: [],
            tagNotIn: [],
            year: null,
            season: null,
            format: null,
            airingStatus: null,
            sort: null,
            pageNumber: 1
        })

    let timeout = 0;
    const searchRef = useRef(null);
    // pagination states
    const [isLast, setIsLast] = useState(false); // a flag to know last list
    const [paginationLoading, setPaginationLoading] = useState(false);


    //query helper functions
    const handleSearchQuery = (query) => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            setDataLoading(true)
            setBrowseFilters({ ...browseFilters, search: query, pageNumber: 1 })
        }, 1550);
    }

    const handleSortQuery = (sortType) => {
        setDataLoading(true)
        switch (sortType) {
            case 'title': {

            }
            case 'title_desc': {

            }
            case 'score': {
                setBrowseFilters({ ...browseFilters, sort: 'SCORE', pageNumber: 1 })
                break;
            }
            case 'score_desc': {
                setBrowseFilters({ ...browseFilters, sort: 'SCORE_DESC', pageNumber: 1 })
                break;
            }
            case 'popularity': {
                setBrowseFilters({ ...browseFilters, sort: 'POPULARITY', pageNumber: 1 })
                break;
            }
            case 'popularity_desc': {
                setBrowseFilters({ ...browseFilters, sort: 'POPULARITY_DESC', pageNumber: 1 })
                break;
            }
            case 'last_updated': {
                setBrowseFilters({ ...browseFilters, sort: 'UPDATED_AT_DESC', pageNumber: 1 })
                break;
            }
            case 'episodes': {
                setBrowseFilters({ ...browseFilters, sort: 'EPISODES', pageNumber: 1 })
                break;
            }
            case 'episodes_desc': {
                setBrowseFilters({ ...browseFilters, sort: 'EPISODES_DESC', pageNumber: 1 })
                break;
            }
            case 'trending': {
                setBrowseFilters({ ...browseFilters, sort: 'TRENDING', pageNumber: 1 })
                break;
            }
            case 'trending_desc': {
                setBrowseFilters({ ...browseFilters, sort: 'TRENDING_DESC', pageNumber: 1 })
                break;
            }

        }
        return;
    }



    return (
        <div className="w-full min-h-[60vh] flex flex-col items-center">
            <div className="flex flex-nowrap w-full items-center relative max-w-[1200px] 2xl:max-w-[1700px] px-5">
                <button
                    onClick={() => setFilterToggle(!filterToggle)}
                    className={`
                        
                        aspect-square 
                        p-2
                        rounded-lg
                        mr-3 
                        ${filterToggle ? 'bg-purple-400 text-white ' : " border-purple-400 border bg-transparent text-purple-400 border-solid"} 
                        transition-colors
                        `}>
                    <AiOutlineFilter size={25} />
                </button>
                <AnimatePresence>
                    {filterToggle && (

                        <FilterModal
                            isOpen={filterToggle}
                            browseFilters={browseFilters}
                            setBrowseFilters={setBrowseFilters}
                            setDataLoading={setDataLoading}
                            handleClose={() => setFilterToggle(false)} />)}
                </AnimatePresence>

                <div className="relative w-full my-3 searchbar">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input
                        ref={searchRef}
                        type="search"
                        onChange={() => { handleSearchQuery(searchRef.current.value) }}
                        id="default-search"
                        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                </div>

                <button
                    onClick={() => setSortToggle(!sortToggle)}
                    className={`
                        h-full 
                        aspect-square 
                        p-4 
                        rounded-full
                        hover:bg-gray-200
                        ml-1
                        ${sortToggle ? 'text-purple-400' : " text-black"}
                        transition-colors
                        `}>
                    <FaSort size={20} />
                </button>
                <AnimatePresence>
                    {sortToggle && (
                        <motion.div
                            onMouseLeave={() => setSortToggle(false)}
                            initial={{
                                opacity: 0,
                                y: -10
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            exit={{
                                opacity: 0,
                                y: -10
                            }}
                            className="absolute min-h-[150px] bg-white top-[100%] right-[0px] w-fit z-50 rounded-md shadow-xl flex flex-col border">
                            <ul>
                                <li
                                    onClick={() => {
                                        handleSortQuery('score_desc');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5 flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Score</p>
                                    <BsArrowDown size={20} className="ml-2" />
                                </li>
                                <li
                                    onClick={() => {
                                        handleSortQuery('score');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5  flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Score</p>
                                    <BsArrowDown size={20} className="ml-2" style={{ transform: 'rotate(180deg)' }} />
                                </li>
                                <li
                                    onClick={() => {

                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5  flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Title</p>
                                    <BsSortAlphaDownAlt size={20} className="ml-2" />
                                </li>
                                <li className="py-2 px-5  flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Title</p>
                                    <BsSortAlphaDown size={20} className="ml-2" />
                                </li>
                                <li
                                    onClick={() => {
                                        handleSortQuery('popularity_desc');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5 flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Popularity</p>
                                    <BsArrowDown size={20} className="ml-2" />
                                </li>
                                <li
                                    onClick={() => {
                                        handleSortQuery('popularity');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5 flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Popularity</p>
                                    <BsArrowDown size={20} className="ml-2" style={{ transform: 'rotate(180deg)' }} />
                                </li>
                                <li
                                    onClick={() => {
                                        handleSortQuery('last_updated');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5 flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Last Updated</p>
                                </li>
                                <li
                                    onClick={() => {
                                        handleSortQuery('episodes_desc');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5 flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Episodes</p>
                                    <BsArrowDown size={20} className="ml-2" />
                                </li>
                                <li
                                    onClick={() => {
                                        handleSortQuery('episodes');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5 flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Episodes</p>
                                    <BsArrowDown size={20} className="ml-2" style={{ transform: 'rotate(180deg)' }} />
                                </li>
                                <li
                                    onClick={() => {
                                        handleSortQuery('trending');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5 flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Trending</p>
                                    <BsArrowDown size={20} className="ml-2" />
                                </li>
                                <li
                                    onClick={() => {
                                        handleSortQuery('trending_desc');
                                        setSortToggle(false);
                                    }}
                                    className="py-2 px-5 flex flex-nowrap items-center cursor-pointer hover:bg-slate-300">
                                    <p>Trending</p>
                                    <BsArrowDown size={20} className="ml-2" style={{ transform: 'rotate(180deg)' }} />
                                </li>

                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <BrowseDisplay
                dataLoading={dataLoading}
                setDataLoading={setDataLoading}
                paginationLoading={paginationLoading}
                setPaginationLoading={setPaginationLoading}
                isLast={isLast}
                searchRef={searchRef}
                setIsLast={setIsLast}
                browseFilters={browseFilters}
                setBrowseFilters={setBrowseFilters}
            />
        </div>
    )
}