'use client'

import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion";
import { AnimeCard } from "./AnimeCard";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai'
import { useSession } from "next-auth/react";
import { useTitlePreferenceStore } from "@/context/titlePreferenceContext";



export const AnimeSlider = ({ data, sliderName }) => {
    const [slider, setSlider] = useState();
    const sliderRef = useRef(null);
    const titleStyle = useTitlePreferenceStore((state) => state.titlePreference)
   
    useEffect(() => {
        setSlider(document.getElementById(`slider-${sliderName}`))
    }, [slider])

    const slideSlider= (value) => {
        slider.scrollLeft += value;
    }


    return (

        <motion.div
            ref={sliderRef}
            className="slider-wrap w-full md:w-4/5 overflow-x-hidden flex items-center mb-4 relative">
            <motion.div
                id={`slider-${sliderName}`}
                className="inner-slider flex py-4 px-3 overflow-x-scroll hide-scrollbar">
                {data.map((anime, index) => {
                    return (
                        <AnimeCard key={index} anime={anime} titlePreference={titleStyle}/>
                    )
                })}
            </motion.div>
            <div className="absolute w-full flex justify-between item-center">
                <button
                    onClick={() => { slideSlider(-175) }}
                    className="bg-white rounded-full aspect-square opacity-25 hover:opacity-90 transition-all">
                    <AiOutlineLeftCircle size={55} color="purple" />
                </button>
                <button
                    onClick={() => { slideSlider(175) }}
                    className="bg-white rounded-full aspect-square opacity-25 hover:opacity-90 transition-all">
                    <AiOutlineRightCircle size={55} color="purple" />
                </button>
            </div>

        </motion.div>

    )
}