'use client'

import styled, {keyframes} from 'styled-components'
import { IntToMonth } from '@/lib/IntToMonth'
import parser from 'html-react-parser'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv, faFilm, faGifts} from '@fortawesome/free-solid-svg-icons'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { TrailerModal } from '@/components/Modal/TrailerModal'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

const MovingImageAnimation = keyframes`
    from {
        background-position: 20% 0%;
    }
    to {
        background-position: 90% 0%;
    }
`

const SlideContainer = styled.div`
    
    background-image: radial-gradient(circle, rgba(0,0,0,.2), rgba(0,0,0,.8)), url("${props => props.imgsrc}");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem 1rem;
    height: 100%;
    width: 100%;
    animation: ${MovingImageAnimation} 15s linear infinite alternate;
`

const MobileSlide = ({data, index, titlePreference = 'userPreferred'}) => {

    const [modalToggle, setModalToggle] = useState(false)

    const title = data.title[titlePreference] ? data.title[titlePreference] : (data.title?.english ? data.title.english : data.title.romaji)
    const description = data?.description ? parser(data.description) : ''
    const session = useSession();
   
    const releaseDate = (anime) => {
        let officialDate = anime.startDate.year ? anime.startDate : 'To be determined...'
        if(officialDate === 'To be determined...') return officialDate;

        if(officialDate.month) {
            if(officialDate.day) {
                return(
                    `${IntToMonth(officialDate.month)} ${officialDate.day}, ${officialDate.year}`
                    )
            }else {
                return(
                    `${IntToMonth(officialDate.month)} ${officialDate.year}`
                )
            }
        }else {
            if(anime.season) {
                return(
                    `${anime.season} ${officialDate.year}`
                )
            }

            return officialDate.year
        }
    }

    const mediaType = (media) => {
        switch(media) {
            case('TV') : {
                return (
                    <div className='flex items-center justify-between'>
                        <FontAwesomeIcon icon={faTv} style={{color: "#a78bfa",}} />
                        <p>TV</p>
                    </div>
                )
            }
            case('TV_SHORT') : {
                return (
                    <div className='flex items-center justify-between'>
                        <FontAwesomeIcon icon={faTv} style={{color: "#a78bfa",}} />
                        <p>TV Short</p>
                    </div>
                )
            }
            case('MOVIE') : {
                return (
                    <div className='flex items-center justify-between'>
                        <FontAwesomeIcon icon={faFilm} style={{color: "#a78bfa",}} />
                        <p>Movie</p>
                    </div>
                )
            }
            case('SPECIAL') : {
                return (
                    <div className='flex items-center justify-between'>
                        <FontAwesomeIcon icon={faGifts}/>
                        <p>Special</p>
                    </div>
                )
            }
            case('OVA') : {
                return (
                    <div className='flex items-center justify-between'>
                    <FontAwesomeIcon icon={faSparkles} />
                        <p>TV</p>
                    </div>
                )
            }
        }
    }

    return (
        <SlideContainer
            imgsrc={data.bannerImage}>
            <div className={`w-full sm:w-4/5 flex flex-col tabletVertical:w-3/5`}>
                <p className='text-purple-400 mb-2'>{`Upcoming Spotlight #${index + 1}`}</p>
                <div className='flex flex-row mb-2'>
                    <Image
                        className='object-cover mr-2 hidden md:block'
                        width={80}
                        height={80}
                        src={data.coverImage.large}
                        alt={data.title.romaji}/>
                    
                    <h1 className="text-3xl tabletVertical:text-4xl whitespace-normal font-bold">
                        {title}
                    </h1>
                </div>
                
                <div className="slide-subheading mb-3">
                    <p className="text-lg italic">Release Date: {releaseDate(data)}</p>    
                    <div className='hidden tabletVertical:flex flex-nowrap'>
                        {mediaType(data.format)}
                    </div>
                </div>
                <div 
                    className="flex flex-row items-center mb-4">
                    <p 
                        className='slide-anime-description text-sm tabletVertical:text-md'>
                    {description}
                    </p>
                </div>
                <div className='flex flex-nowrap'>
                    <button className='bg-purple-400 p-2 rounded-xl mr-4'>
                        <Link href={`/anime/${data.id}`}>Go To Page</Link>
                    </button>

                    <button
                        disabled={session.status === 'authenticated' ? false : true} 
                        className={`p-2 rounded-xl mr-4 ${session.status ==='authenticated' ? 'bg-purple-400' :'bg-slate-400 cursor-default'}`}>
                        Add to List
                    </button>

                    <button 
                        onClick={() => setModalToggle(true)}
                        className={`p-2 rounded-xl bg-green-300 text-black`}>
                        Play Trailer
                    </button>
                    <AnimatePresence>
                        {modalToggle && (
                        <TrailerModal 
                            title={data.title.romaji}
                            trailerId={data.trailer.id}
                            handleClose={() => setModalToggle(false)} 
                            isOpen={modalToggle}/>)}
                    </AnimatePresence>
                </div>
            </div>
        </SlideContainer>
    )
}

export default MobileSlide;