'use client'
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
export default function SideNavBar({toggle, setToggle, session, handleClose}) {
    

    
    
    return (
        <nav 
            style={{zIndex: 1000}}
            className="side-navbar">
            <ul 
                className={`absolute top-20 ${toggle ? 'w-1/2 right-1/2 lg:w-1/5 lg:right-80%': 'w-0  right-200'} h-screen bg-purple-100 overflow-hidden transition-all z-50 p-8`}>
                <li 
                    
                    className="border-b-2 nav-link">
                    <Link 
                        className="w-full h-full"
                        href={"/home"} 
                        shallow
                        onClick={() => setToggle(false)}>Home</Link>
                </li>
                <li 
                    
                    className="border-b-2 nav-link">
                    <Link 
                        className="w-full"
                        href={"/browse"}
                        onClick={() => setToggle(false)}>Browse</Link>
                </li>
                <li
                    
                    className="border-b-2 nav-link">
                    <Link 
                        className="w-full"
                        href={"/"} 
                        onClick={() => setToggle(false)}>Trending</Link>
                </li>
                <li 
                    
                    className="border-b-2 nav-link">
                    <Link href={"/"} onClick={() => setToggle(false)}>Most Popular</Link>
                </li>

                {session.status !== 'authenticated' && <li 
                    className="border-b-2 nav-link">
                    <Link href={"/"} onClick={() => setToggle(false)}>Login / Sign Up</Link>
                </li>}
                {session.status === 'authenticated' && <li 
                    className="border-b-2 nav-link">
                    <div>
                        <button onClick={() => signOut()}>Log Out</button>
                    </div>
                </li>}

            </ul>
        </nav>
    )
}


/**
 * ${toggle ? 'left-full' : ''} 
 */