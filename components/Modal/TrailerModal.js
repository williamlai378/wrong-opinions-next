'use client'
import { useEffect, useState } from "react"
import ReactPortal from "./ReactPortal";
import { motion, AnimatePresence } from "framer-motion";
import {AiOutlineMinus, AiOutlineMinusSquare} from 'react-icons/ai'
import Youtube from 'react-youtube'
import YoutubeVideo from "../Youtube/YoutubeIFrame";

export const TrailerModal = ({isOpen, handleClose, trailerId, title }) => {

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
            <div className="fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-800 opacity-50"></div>
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
                className="fixed inset-0 bg-transparent flex flex-col items-center justify-center overflow-hidden z-50">
                <div className="flex w-4/5 flex-col justify-center items-start bg-slate-700 rounded-2xl p-6">
                    <button
                        className="left-0 relative mb-2"
                        onClick={handleClose}>
                        <AiOutlineMinusSquare size={40} color="purple"/>
                    </button>
                    <div className="modal-content w-full h-fit flex items-center justify-center border-purple-400 border-2 ">
                        
                        <YoutubeVideo
                            videoId={trailerId}
                            autoPlay={false}
                            title={title}>
                        </YoutubeVideo>
                    </div>
                </div>
            </motion.div>
        </ReactPortal>
    )
}