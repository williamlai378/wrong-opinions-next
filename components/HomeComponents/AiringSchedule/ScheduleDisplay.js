'use client'
import { getAiringSchedule } from "@/lib/anilistGraphQL";
import { AiringItem } from "./AiringItem";
import moment from "moment";
import axios from "axios";

import { useEffect, useState } from "react"
export const ScheduleDisplay = ({selectedDate}) => {
    const [scheduleData, setScheduleData] = useState(null);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true)

        const fetchData = async () => {
            const response = await getAiringSchedule(moment(selectedDate).startOf('day').unix(), moment(selectedDate).endOf('day').unix())
            setScheduleData(response)
        }

        if(selectedDate) {
            setLoading(true);
            fetchData()
        }

        setLoading(false);
    }, [selectedDate])
    if(loading) {
        return (
            <div>
                Loading Circle here
            </div>
        )
    }
    else if(scheduleData) {
        return (
            <div className="w-full grid grid-cols-1 h-full p-1">
                <h3 className="text-2xl font-semibold text-center md:text-left">
                    Airing Schedule (GMT-5)
                </h3>
                {scheduleData.map((anime, index) => {
                    return (
                        <AiringItem key={`${anime.media.id}-${index}`}animeData={anime}/>
                    )
                })}
            </div>
        )
    }
}