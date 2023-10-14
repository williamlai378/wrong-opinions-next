'use client'
import { useEffect, useRef, useState } from "react"
import ReactPortal from "../ReactPortal";
import { AnimatePresence, motion } from "framer-motion";
import {
    yearOptions,
    airingStatusOptions,
    seasonOptions,
    formatOptions,
    genresOptions,
    sortOptions,
    tagOptions
} from './filterOptions';
import { BiArrowBack } from 'react-icons/bi'
import Select from 'react-select'
import Image from "next/image";
import YearRangeSlider from "./YearSlider";
import GenreTagFilterOption from "./genreTagFilterOption";
import { IoMdArrowDropdown } from 'react-icons/io'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { toast } from "react-hot-toast";
import { set } from "react-hook-form";

export const FilterModal = ({ isOpen, handleClose, browseFilters, setBrowseFilters, setDataLoading}) => {
    const temp = {
        ...browseFilters,
        genreIn: [...browseFilters.genreIn],
        genreNotIn: [...browseFilters.genreNotIn],
        tagIn: [...browseFilters.tagIn],
        tagNotIn: [...browseFilters.tagNotIn],
        year: browseFilters.year
    }
    const [filterOptions, setFilterOptions] = useState(temp);
    const today = new Date();

    const [genreToggle, setGenreToggle] = useState(false);
    const [tagToggle, setTagToggle] = useState(false);
    const yearCheckboxRef = useRef(null);
    const [yearFilterEnabled, setYearFilterEnabled] = useState(filterOptions.year ? true : false);

    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    useEffect(() => {
        console.log('filterOptions', filterOptions);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };

    }, [isOpen])

    const createFilterSelectDropdown = (filterType) => {
        switch (filterType) {
            case ('Airing Status'): {
                return (
                    <Select
                        className="h-fit"
                        key="airing-status"
                        placeholder="Airing Status"
                        isClearable={true}
                        onChange={(e) => {
                            console.log(e)
                            if (!e) {
                                setFilterOptions({ ...filterOptions, airingStatus: null, pageNumber: 1 })
                            } else {
                                setFilterOptions({ ...filterOptions, airingStatus: e.value, pageNumber: 1 })
                            }
                        }}
                        options={airingStatusOptions} />
                )
            }
            case ('Season'): {
                return (
                    <Select
                        className="h-fit"
                        key="season-filter"
                        placeholder="Season"
                        isClearable={true}
                        onChange={(e) => {
                            if (!e) {
                                setFilterOptions({ ...filterOptions, season: null, pageNumber: 1 })
                            } else {
                                setFilterOptions({ ...filterOptions, season: e.value, pageNumber: 1 })
                            }
                        }}
                        options={seasonOptions} />
                )
            }
            case ('Format'): {
                return (
                    <Select
                        className="h-fit"
                        key="format-filter"
                        placeholder="Format"
                        isClearable={true}
                        onChange={(e) => {
                            if (!e) {
                                setfilterOptions({ ...filterOptions, format: null, pageNumber: 1 })
                            } else {
                                setFilterOptions({ ...filterOptions, format: e.value, pageNumber: 1 })
                            }
                        }}
                        options={formatOptions} />
                )
            }
        }
    }



    //next update: add selected tag/genre to the genre/tags title container

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

                <div className="flex flex-col justify-center relative items-center w-3/4 h-4/5 bg-white p-4 rounded-md overflow-scroll hide-scrollbar">
                    <button
                        onClick={() => handleClose()}
                        className="text-black absolute left-0 top-0 ml-3 mt-3">
                        <BiArrowBack size={30} className={`text-black hover:text-purple-400`} />
                    </button>
                    <div className="flex flex-col w-full h-full py-5">
                        <h2 className="text-xl text-center">Filters</h2>
                        <div className="flex flex-col w-full p-2 md:p-6">
                            <div className="grid grid-cols-3 gap-3">
                                {['Airing Status', 'Season', 'Format'].map((filterType) => {
                                    return (
                                        <div className="flex flex-col">
                                            {createFilterSelectDropdown(filterType)}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="w-full flex flex-col mt-4 justify-center">
                                <div className="flex justify-between">
                                    <h3>Year</h3>
                                    <input 
                                        ref={yearCheckboxRef}
                                        type="checkbox" 
                                        checked={yearFilterEnabled}
                                        onClick={() => {
                                            setYearFilterEnabled(yearCheckboxRef.current?.checked);
                                        }}
                                        id="year-filter-check" 
                                        name="year-filter"/>
                                </div>
                                
                                <YearRangeSlider
                                    enabled={yearFilterEnabled}
                                    browseFilters={filterOptions}
                                    setBrowseFilters={setFilterOptions} />
                            </div>
                            <div className="w-full flex flex-col mt-4 justify-center">
                                <div className="min-h-[50px] flex flex-nowrap justify-between items-center relative border-b-2 border-solid border-neutral-200">
                                    <h3 className="text-lg">Genre</h3>
                                    <motion.div
                                        className="absolute right-0 cursor-pointer"
                                        initial={{
                                            transform: 'rotate(180deg)',
                                            transformOrigin: 'center',
                                        }}
                                        animate={{
                                            transform: genreToggle ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transformOrigin: 'center',
                                        }}

                                    >
                                        <RiArrowDropDownLine size={30} className={`text-black hover:text-purple-400`} onClick={() => setGenreToggle(!genreToggle)} />
                                    </motion.div>

                                </div>
                                <AnimatePresence>
                                    {genreToggle && (
                                        <motion.div
                                            className="w-fit max-h-[200px] overflow-y-auto py-2 scroll-smooth"
                                            initial={{
                                                transform: 'scaleY(0)',
                                                transformOrigin: 'top',
                                            }}
                                            animate={{
                                                transform: 'scaleY(1)',
                                                transformOrigin: 'top',
                                            }}
                                            exit={{
                                                transform: 'scaleY(0)',
                                                transformOrigin: 'top',
                                            }}
                                        >
                                            <div className='flex flex-wrap'>
                                                {genresOptions.map((genre, index) => {

                                                        
                                                    return (
                                                        <GenreTagFilterOption
                                                            key={`${genre}-${index}`}
                                                            title={genre}
                                                            isGenre={true}
                                                            modalToggle={genreToggle}
                                                            filterOptions={filterOptions}
                                                            setFilterOptions={setFilterOptions} />
                                                    )
                                                })}
                                            </div>

                                        </motion.div>)}
                                </AnimatePresence>
                            </div>
                            <div className="w-full flex flex-col mt-4">
                                <div className="min-h-[50px] flex flex-nowrap justify-between items-center relative border-b-2 border-solid border-neutral-200">
                                    <h3 className="text-lg">Tags</h3>
                                    <motion.div
                                        className="absolute right-0 cursor-pointer"
                                        initial={{
                                            transform: 'rotate(180deg)',
                                            transformOrigin: 'center',
                                        }}
                                        animate={{
                                            transform: tagToggle ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transformOrigin: 'center',
                                        }}

                                    >
                                        <RiArrowDropDownLine size={30} className={`text-black hover:text-purple-400`} onClick={() => setTagToggle(!tagToggle)} />
                                    </motion.div>

                                </div>
                                <AnimatePresence>
                                    {tagToggle && (
                                        <motion.div
                                            className="w-fit max-h-[150px] overflow-y-scroll py-2"
                                            initial={{
                                                transform: 'scaleY(0)',
                                                transformOrigin: 'top',
                                            }}
                                            animate={{
                                                transform: 'scaleY(1)',
                                                transformOrigin: 'top',
                                            }}
                                            exit={{
                                                transform: 'scaleY(0)',
                                                transformOrigin: 'top',
                                            }}
                                        >
                                            <div className='flex flex-wrap'>
                                                {tagOptions.map((tag, index) => {
                                                    
                                                    return (
                                                        <GenreTagFilterOption
                                                            key={`${tag}-${index}`}
                                                            title={tag}
                                                            modalToggle={tagToggle}
                                                            isGenre={false}
                                                            filterOptions={filterOptions}
                                                            setFilterOptions={setFilterOptions} />
                                                    )
                                                })}
                                            </div>

                                        </motion.div>)}
                                </AnimatePresence>
                            </div>
                            <div className="w-full flex flex-row justify-between items-center my-2 self-end">
                                <button
                                    onClick={() => {
                                        setFilterOptions({...browseFilters})
                                        handleClose();
                                    }}
                                    className="cancel-button my-1"
                                    >
                                    Cancel
                                </button>
                                <button
                                    className="save-button my-1"
                                    onClick={() => {
                                        setDataLoading(true);
                                        if(!yearFilterEnabled) {
                                            setBrowseFilters({...filterOptions, year: null, pageNumber: 1})
                                        }else {
                                            setBrowseFilters({...filterOptions, pageNumber: 1})
                                        }
                                        toast.success('Filters Applied')
                                        handleClose();
                                    }}>
                                    Save and Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </ReactPortal >
    )
}
