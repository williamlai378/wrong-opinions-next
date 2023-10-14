'use client'

import { useEffect, useState } from "react"
import BrowseAnimeCard from "./BrowseAnimeCard"
import { set } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"

export default function BrowseDisplay({
    browseFilters,
    setBrowseFilters,
    dataLoading,
    setDataLoading,
    isLast,
    setIsLast,
    searchRef,
    paginationLoading,
    setPaginationLoading }) {


    const [displayList, setDisplayList] = useState([])
    const [tagCollection, setTagCollection] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:3000/api/browse', {
                method: 'POST',
                body: JSON.stringify(browseFilters)
            }).then(async (response) => {
                return await response.json();
            })

            if (res.status === 'success' && res.data) {
                if (!(res?.data?.pageInfo?.hasNextPage)) {
                    setIsLast(true)
                }
                // cases where the user changes the filters/search parameters
                if (browseFilters.pageNumber === 1) {
                    console.log('res.data:', res.data)
                    if (res?.data?.pageInfo?.hasNextPage && isLast) {
                        setIsLast(false)
                    }
                    setDisplayList(res.data.media)
                } else { //where the user has clicked load more and adds on to the current data list of the current search parameters
                    setDisplayList([...displayList, ...res.data.media])
                }
            }

            if (paginationLoading) {
                setPaginationLoading(false)
            }
            if (dataLoading) {
                setDataLoading(false)
            }

        }

        const fetchTags = () => {
            let tempTags = []
            Object.keys(browseFilters).forEach((key) => {
                if (browseFilters[key]) {
                    // if the tag is an array type (genreIn, genreNotIn, tagIn, tagNotIn)
                    if (Array.isArray(browseFilters[key])) {
                        if (key === 'genreIn' || key === 'tagIn') {
                            browseFilters[key].map((tag) => {
                                tempTags.push({ key: key, tagType: key === 'genreIn' ? 'Genre' : 'Tag', value: tag, color: 'bg-purple-400' })
                            })
                        }
                        else if (key === 'genreNotIn' || key === 'tagNotIn') {
                            browseFilters[key].map((tag) => {
                                tempTags.push({ key: key, tagType: key === 'genreNotIn' ? 'Genre' : 'Tag', value: tag, color: 'bg-red-400' })
                            })
                        }
                    }
                    else if (key === 'sort') {
                        switch (browseFilters[key]) {
                            case 'SCORE': {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Score', color: 'bg-green-400', desc: 'non_desc' });
                                break;
                            }
                            case 'SCORE_DESC': {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Score', color: 'bg-green-400', desc: 'desc' });
                                break;
                            }
                            case 'POPULARITY': {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Popularity', color: 'bg-green-400', desc: 'non_desc' });
                                break;
                            }
                            case 'POPULARITY_DESC': {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Popularity', color: 'bg-green-400', desc: 'desc' });
                                break;
                            }
                            case 'TRENDING': {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Trending', color: 'bg-green-400', desc: 'non_desc' });
                                break;
                            }
                            case 'TRENDING_DESC': {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Trending', color: 'bg-green-400', desc: 'desc' });
                                break;
                            }
                            case 'EPISODE': {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Episode', color: 'bg-green-400', desc: 'non_desc' });
                                break;
                            }
                            case 'EPISODE_DESC': {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Episode', color: 'bg-green-400', desc: 'desc' });
                                break;
                            }
                            case "UPDATED_AT_DESC": {
                                tempTags.push({ key: key, tagType: 'Sort', value: 'Last Updated', color: 'bg-green-400' });
                                break;
                            }
                        }
                    }
                    else {
                        switch (key) {
                            case 'search': {
                                tempTags.push({ key: key, tagType: 'Search', value: browseFilters[key], color: 'bg-blue-300' })
                                break;
                            }
                            case 'format': {
                                tempTags.push({ key: key, tagType: 'Format', value: browseFilters[key].charAt(0).toUpperCase() + browseFilters[key].slice(1).toLowerCase(), color: 'bg-yellow-300' });
                                break;
                            }
                            case 'airingStatus': {
                                tempTags.push({ key: key, tagType: 'Airing Status', value: browseFilters[key].charAt(0).toUpperCase() + browseFilters[key].slice(1).toLowerCase(), color: 'bg-orange-300' });
                                break;
                            }
                            case 'season': {
                                tempTags.push({ key: key, tagType: 'Season', value: browseFilters[key].charAt(0).toUpperCase() + browseFilters[key].slice(1).toLowerCase(), color: 'bg-pink-300' });
                                break;
                            }
                            case 'year': {
                                tempTags.push({ key: key, tagType: 'Year', value: browseFilters[key].toString().charAt(0).toUpperCase() + browseFilters[key].toString().slice(1).toLowerCase(), color: 'bg-green-300' });
                                break;
                            }
                            case 'sort': {
                                tempTags.push({ key: key, tagType: 'Sort', value: browseFilters[key].charAt(0).toUpperCase() + browseFilters[key].slice(1).toLowerCase(), color: 'bg-indigo-300' });
                                break;
                            }
                        }
                    }
                }
            })
            setTagCollection(tempTags)
        }

        fetchData();
        fetchTags();
    }, [browseFilters])




    return (
        <div className="w-full h-full flex flex-col flex-nowrap justify-between items-center max-w-[1200px] 2xl:max-w-[1700px]">
            <div
                className="flex w-full px-5">
                <AnimatePresence className='flex items-center flex-wrap w-full'>
                    {tagCollection.length > 0 && <p className="text-md font-semibold mr-2">Filters: </p>}
                    {tagCollection.map((tag, index) => {
                        return (
                            <motion.div
                                key={`${tag.value}-${tag.tagType}-${index}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                className={`group flex items-center mr-2 mb-2`}>

                                <div
                                    className={`rounded-full ${tag.color} px-2 py-1 text-black`}>
                                    {!tag?.desc && <p className="text-xs">{`${tag.tagType}: ${tag.value}`}</p>}

                                    {tag?.desc === 'desc' && (<p className="text-xs">
                                        {`${tag.tagType}: ${tag.value}`}
                                        <span>&#8595;</span>
                                    </p>)}

                                    {tag?.desc === 'non_desc' && (<p className="text-xs">
                                        {`${tag.tagType}: ${tag.value}`}
                                        <span>&#8593;</span>
                                    </p>)}
                                </div>
                                <button
                                    className="bg-transparent opacity-0 group-hover:opacity-100 mr-1 text-center text-gray-500"
                                    onClick={() => {
                                        switch (true) {
                                            case (tag.key === 'genreIn' || tag.key === 'genreNotIn' || tag.key === 'tagIn' || tag.key === 'tagNotIn'): {
                                                let temp = browseFilters[tag.key].filter((item) => item !== tag.value)
                                                setBrowseFilters({ ...browseFilters, [tag.key]: temp })
                                                break;
                                            }
                                            case (tag.key === 'search'): {
                                                setBrowseFilters({ ...browseFilters, search: '' })
                                                searchRef.current.value = '';
                                                break;
                                            }
                                            default: {
                                                setBrowseFilters({ ...browseFilters, [tag.key]: null })
                                                break;
                                            }
                                        }
                                    }}>
                                    x
                                </button>
                            </motion.div>
                        )

                    })}
                </AnimatePresence>
            </div>
            <div 
                className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-3 px-5 xl:px-10 mt-3">
                {displayList?.length > 0 && displayList.map((anime) => {
                    return (
                        <BrowseAnimeCard anime={anime} key={anime.id} />)

                })}
                {displayList?.length <= 0 && <p className="text-center w-full">No results found</p>}
            </div>
            {dataLoading && (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-purple-400 mr-2">
                    </div>
                    <p>Loading...</p>
                </div>
            )}
            {!isLast && displayList?.length > 0 && (
                <button
                    onClick={() => {
                        setPaginationLoading(true)
                        setBrowseFilters({ ...browseFilters, pageNumber: browseFilters.pageNumber + 1 })
                    }}
                    className="bg-purple-400 rounded-full px-3 py-1 my-4">
                    {paginationLoading ? 'Loading...' : 'Load More'}
                </button>
            )}
        </div>
    )
}