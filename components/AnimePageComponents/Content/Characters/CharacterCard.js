'use client'

import { AnimatePresence } from 'framer-motion'

import { VoiceActorModal } from '@/components/Modal/VoiceActorModal'
import Image from "next/image"
import { useState } from 'react'

const CharacterCard = ({ character }) => {

    const [modalToggle, setModalToggle] = useState(false)
    const handleClose = () => {
        setModalToggle(false)
    }
    return (
        <div className='flex flex-col shadow-purple-400 shadow-md'>
            <div className="group flex flex-col aspect-9/12 relative">
                <div
                    className="overlay-content absolute bg-black opacity-0 top-0 left-0 bottom-0 right-0 h-full z-20 w-full group-hover:opacity-70 transition-all"></div>
                <Image
                    fill
                    src={character.node.image.large}
                    sizes={`(min-width: 640px) 205px, 250px`}
                    alt={character.node.name.userPreferred}></Image>
                <div 
                    className="z-30 relative text-white overflow-hidden aspect-9/12 opacity-0 group-hover:opacity-100 flex flex-col text-center items-center pt-5 transition-all">
                    <h3 className="font-semibold">{character.node.name.userPreferred}</h3>
                    <a  
                        className='text-white'
                        target='_blank'
                        href={character.node.siteUrl}>
                        <p className=' text-white hover:text-blue-600'>
                            Go to Page
                        </p>
                    </a>
                    {character.voiceActorRoles.length > 0 && <button
                        onClick={() => setModalToggle(true)}
                        className="bg-purple-400 hover:text-green-300 p-2 rounded-md my-4">
                        Voice Actors
                    </button>}
                </div>
                {modalToggle && (
                    <AnimatePresence>
                        <VoiceActorModal
                            voiceActorRoles={character.voiceActorRoles}
                            characterName={character.node.name.userPreferred}
                            isOpen={modalToggle}
                            handleClose={handleClose} />
                    </AnimatePresence>

                )}
            </div>
            <div className='text-center bg-purple-400 p-2 text-white'>
               <p className="bg-purple-400 text-center text-white font-normal text-xl tracking-wider">
                {character.role}
                </p> 
            </div>
        </div>
    )
}

export default CharacterCard;