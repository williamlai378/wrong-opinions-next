'use client'

import {useState, useEffect} from 'react'
import Overview from './Overview/Overview';

import Categories from './Categories';
import TagSection from './Tags/TagSection';
import OpinionSection from './Opinions/Opinions';
import { useSession } from 'next-auth/react';
import PaginatedCharacterSection from './Characters/PaginatedCharacterSection';
import PaginatedStaffSection from './Staff/PaginatedStaffSection';
import StatsSection from './Stats/StatsSection';
import moment from 'moment';

const Content = ({animeData, isListed = false}) => {
    const [activeCategory, setActiveCategory] = useState('Overview');
    const [charToggle, setCharToggle] = useState(false);
    const session = useSession();

    const isReleased = (moment(new Date(animeData.startDate.month,animeData.startDate.day, animeData.startDate.year)).format('X') <= moment().format('X'))
    
    const handleCategoryChange = () => {
        switch(activeCategory) {
            case('Overview'): {
                return <Overview animeData={animeData} session={session} isListed={isListed}/>
            }
            case('Characters'): {
                return <PaginatedCharacterSection animeId={animeData.id}/>
            }
            case('Staff'): {
                return <PaginatedStaffSection animeId={animeData.id}/>
                break;
            }
            case('Stats'): {
                return <StatsSection animeData={animeData}/>
            }
            case('Tags'): {
                return <TagSection tagsData={animeData.tags}/>
            }
            case('Opinions'): {
                return <OpinionSection isReleased={isReleased} session={session} isListed={isListed} animeId={animeData.id}/>
            }
        }
    }


    return (
        <div className='w-full'>
            <Categories 
                selected={activeCategory} 
                setActiveCategory={setActiveCategory}/>
            <div
                className='h-full  bg-neutral-100 w-full p-3 md:p-6 flex justify-center'>
                {handleCategoryChange(activeCategory)}
            </div>
        </div>
    )
}

export default Content;