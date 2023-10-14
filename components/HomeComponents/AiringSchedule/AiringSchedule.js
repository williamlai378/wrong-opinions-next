'use client'

import moment from "moment";
import { DatesContainer } from "./DatesContainer";
import { list } from "postcss";
import { useState, useEffect } from "react";
import { ScheduleDisplay } from "./ScheduleDisplay";
export const AiringSchedule = (props) => {
    const [selectedDate, setSelectedDate] = useState();
    const [airingSchedule, setAiringSchedule] = useState([])

    useEffect(() => {
        let tempArr = [];
        for(let i = 0; i < 6; i++) {
            tempArr.push(
                moment(props.today.getTime()).add(i, 'days')
            )
        }
        setSelectedDate(tempArr[0])
        setAiringSchedule(tempArr)
    }, [])



    return (
        <div className="w-full md:w-4/5">
            <DatesContainer 
                today={props.today} 
                schedule={airingSchedule} 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate}/>
            <ScheduleDisplay selectedDate={selectedDate}/>
            
        </div>
    )
}