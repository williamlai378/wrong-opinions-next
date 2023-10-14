
'use client'

import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';



const YearRangeSlider = ({ browseFilters, setBrowseFilters, enabled}) => {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());

    const handleChange = (e, newValue) => {
        console.log(newValue)

        setBrowseFilters({...browseFilters, year: newValue})
    }

    useEffect(() => {
        if(enabled) {
            setBrowseFilters({...browseFilters, year: browseFilters.year ? browseFilters.year : 2000})
        }
    }, [browseFilters, enabled])

    return (
        <div
            className='w-full flex flex-col items-center'>
            <Slider
                disabled={enabled ? false : true}
                sx={{
                    color: '#c084fc',
                    width: '92.5%'
                }}
                getAriaLabel={() => 'Year Range Slider'}
                value={browseFilters.year ? browseFilters.year : 2000}
                min={1970}
                step={1}
                max={Number(today.getFullYear())}
                onChange={handleChange}
                valueLabelDisplay='auto'
            />
        </div>

    )
}

export default YearRangeSlider;