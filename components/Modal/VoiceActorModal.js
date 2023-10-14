'use client'
import { useEffect, useState } from "react"
import ReactPortal from "./ReactPortal";
import { motion, AnimatePresence } from "framer-motion";
import {BiArrowBack} from 'react-icons/bi'
import Image from "next/image";

export const VoiceActorModal = ({ isOpen, handleClose, voiceActorRoles, characterName }) => {

    console.log(voiceActorRoles)
    useEffect(() => {
        const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen])

    if (!isOpen) return null;


    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-60"></div>
            <motion.div
                initial={{
                    scale: 0,
                    opacity: 0,
                    filter: 'blur(5px)'
                }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)'
                }}
                exit={{
                    scale: 0,
                    opacity: 0,
                    filter: 'blur(5px)'
                }}
                className="fixed inset-0 w-screen h-screen bg-transparent flex flex-col justify-center items-center overflow-hidden z-50">

                <div className="flex flex-col justify-center relative items-center w-3/4 h-2/3 bg-white p-4 rounded-md">
                    <button 
                        onClick={() => handleClose()}
                        className="text-black absolute left-0 top-0 ml-3 mt-3">
                        <BiArrowBack size={30} className={`text-black hover:text-purple-400`}/>
                    </button>
                    <h2 className="text-xl">Voice Actors of {characterName}</h2>
                    <div className="grid grid-cols-1 gap-3 p-2 w-full h-full  md:p-6 overflow-y-scroll">
                        {voiceActorRoles.map((va) => {
                            console.log(va)
                            return (
                                <div className="flex w-full items-center bg-slate-300 rounded-lg ">
                                    <div className={`relative w-[15%] aspect-9/12 mr-2`}>
                                        <Image
                                            fill
                                            className="object-cover"
                                            src={va.voiceActor.image.large} />

                                    </div>
                                    <div className={`flex flex-col h-full justify-around`}>
                                        <a 
                                            className="group"
                                            target={va.voiceActor.name.userPreferred}
                                            href={`${va.voiceActor.siteUrl}`}>
                                            <p className="text-black w-full overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-blue-400 text-lg font-bold">{va.voiceActor.name.userPreferred}</p>
                                        </a>
                                        <p className="text-md font-extralight">{va.voiceActor.languageV2}</p>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>

            </motion.div>

        </ReactPortal>
    )
}
