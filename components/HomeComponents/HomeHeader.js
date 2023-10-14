'use client'

import MobileSlide from "./AnimeSlider/MobileSlide"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { useTitlePreferenceStore } from "@/context/titlePreferenceContext"
import React, { useEffect, useState } from "react"
import './styles.css'

export default function HomeHeader({ data, session}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const titleStyle = useTitlePreferenceStore((state) => state.titlePreference)
    const getTitlePreference = useTitlePreferenceStore((state) => state.getUserTitlePreference)
    const animeData = data.filter((anime) => (anime.bannerImage !== null && anime.trailer !== null && anime.startDate?.year !== null));

    const updateIndex = (direction) => {
        switch (direction) {
            case 'left': {
                if (activeIndex <= 0) {
                    setActiveIndex(animeData.length - 1);
                } else {
                    setActiveIndex(activeIndex - 1);
                }
                break;
            }
            case 'right': {
                if (activeIndex >= animeData.length - 1) {
                    setActiveIndex(0);
                } else {
                    setActiveIndex(activeIndex + 1);
                }
                break;
            }
        }
    }

    useEffect(() => {
        if(session?.user?.id) {
            getTitlePreference(session.user.id);
        }
    }, [])

    return (
        <div className="w-full overflow-x-hidden flex flex-col">
            <div className="overflow-x-hidden box-border w-full h-full">
                <div
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                    className="whitespace-nowrap w-full box-border inner-container">
                    {animeData.map((anime, index) => {
                        if (index <= 10) {
                            return (
                                <div
                                    key={index}
                                    className="w-full h-[50vh] inline-block overflow-x-hidden  overflow-y-hidden">
                                    <MobileSlide index={index} data={anime} titlePreference={titleStyle} />
                                </div>
                            )
                        }

                    })}
                </div>
            </div>

            <div className="flex justify-center items-center h-fit mt-3">
                <div
                    onClick={() => { updateIndex('left') }}
                    className="bg-transparent border-none cursor-pointer">
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                </div>
                <div className="flex items-center">
                    {animeData.map((anime, index) => {
                        if(index <= 10) {
                            return (
                            <div
                                key={index}
                                onClick={() => { setActiveIndex(index) }}
                                className={`h-2 w-2 rounded-full cursor-pointer mx-2 ${index === activeIndex ? 'bg-purple-500' : 'bg-gray-500'}`}>
                            </div>
                        )
                        }
                    })}
                </div>
                <div
                    onClick={() => { updateIndex('right') }}
                    className="bg-transparent border-none cursor-pointer">
                    <FontAwesomeIcon icon={faChevronRight} size="lg" />
                </div>
            </div>
        </div>
    )
}