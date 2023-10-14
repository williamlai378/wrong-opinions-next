'use client'
import { useState } from "react"
import moment from "moment"
export const DatesContainer = (props) => {
    

    return (
            <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-2 p-1">
                {props.schedule.map((date, index) => {
                    
                    return (
                        <div 
                            key={index}
                            onClick={() => props.setSelectedDate(date)}
                            className={`h-full flex flex-col items-center justify-center p-3 cursor-pointer text-center border-solid border-2 border-[#Ceaef5] rounded-md ${moment(date).unix() === moment(props.selectedDate).unix() ? 'bg-purple-400 text-white': 'bg-white text-black'}`}>
                            <h3 className={`text-lg`}>
                                {moment(date).format('ddd')}
                            </h3>
                            <p className="text-sm">{moment(date).format('MMM DD')}</p>
                        </div>
                    )
                })}
            </div>
    )
}