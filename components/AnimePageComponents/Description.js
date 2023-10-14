'use client'
import { useState } from "react";

const Description = ({description}) => {
    const [isTruncated, setIsTruncated] = useState(true);
    const toggle = () => {
        setIsTruncated(!isTruncated);
    }
    return (
        <div className="w-full my-4">
            <p className={`${isTruncated ? 'anime-description-truncated' :  'anime-description'}`}>
                {description}
            </p>
            {description.toString().length >= 570 && (<span 
                className="cursor-pointer text-md italic hover:text-blue-700 rounded-full  hover:underline underline-offset-2"
                onClick={toggle}>
                    {(isTruncated) ? 'Show More' : 'Show Less'}
            </span>)}
        </div>
    )
}

export default Description;