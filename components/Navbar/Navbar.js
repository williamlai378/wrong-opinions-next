"use client"

import Link from "next/link"
import HamburgerIcon from "./HamburgerIcon"
import { useState } from "react"
import SideNavBar from "./SideNavBar"
import { signOut, useSession } from "next-auth/react"
import { BsSearch } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import { GoGraph } from 'react-icons/go'
import { AiOutlineSetting } from 'react-icons/ai'
import { AnimatePresence, motion } from "framer-motion"
import { BiLogOut } from 'react-icons/bi'
import Image from "next/image"
import { toast } from "react-hot-toast"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {

    const [toggle, setToggle] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);
    const router = useRouter();
    let session = useSession();
    const pathname = usePathname(); // use to redirect back to previous page if user navigates to login page

    const handleClose = () => {
        setToggle(false);
    }

    const createProfileIcon = () => {
        if (session?.data?.user?.image) {
            return (
                <div
                    className="cursor-pointer"
                    onClick={() => { setProfileToggle(!profileToggle) }}>
                    <CgProfile size={25} color='black' className="mx-2" />
                </div>
            )
        }

        
    }

    return (
        <div className="relative">
            <nav className="w-full bg-purple-400 h-20 flex flex-row flex-nowrap justify-between z-50">
                <HamburgerIcon toggle={toggle} setToggle={setToggle} />
                <div className="flex flex-row flex-nowrap items-center mr-2">
                    <button>
                        <BsSearch size={25} color='white' className="mx-2" />
                    </button>
                    {session.status === 'authenticated' && (
                        createProfileIcon(session?.data?.user.image)
                    )}
                    {session.status === 'unauthenticated' &&
                        (<button className="p-2 bg-white text-purple-400 rounded-md">
                            <Link href={`/login/?redirect=${pathname.toString()}`}>Login</Link>
                        </button>)}
                    <AnimatePresence>
                        {profileToggle && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onMouseLeave={() => setProfileToggle(false)}
                                className="dropdown-menu absolute min-h-[150px] bg-white top-[70%] right-[20px] w-fit z-50 rounded-xl shadow-xl flex flex-col">
                                <div className="flex flex-nowrap items-center p-2 hover:bg-purple-400">
                                    {!session?.data?.user?.image && (<CgProfile size={30} color="black" />)}
                                    <Link
                                        href={`/profile/${session?.data?.user?.username}`}
                                        replace
                                        className="text-lg">
                                        {`@${session?.data?.user.username}`}
                                    </Link>
                                </div>
                                <ul className="list-none">
                                    <li
                                        className="my-1 cursor-pointer hover:bg-purple-400 w-full">
                                        <div className="px-2 flex items-center flex-nowrap">
                                            <GoGraph size={25} color="black" className="mr-1" />
                                            <Link href={`profile/${session?.data?.user?.id}`}>
                                                Profile
                                            </Link>
                                        </div>
                                    </li>
                                    <li
                                        className="my-1 cursor-pointer hover:bg-purple-400 w-full">
                                        <div className="px-2 flex items-center flex-nowrap">
                                            <AiOutlineSetting size={25} color="black" className="mr-1" />
                                            <Link href={`/settings/${session?.data?.user?.id}`} replace={true}>
                                                Settings
                                            </Link>
                                        </div>
                                    </li>
                                    <li
                                        onClick={
                                            () => {
                                                try {
                                                    signOut()
                                                    setProfileToggle(false)
                                                    toast.success('Logged out successfully')
                                                } catch (e) {
                                                    toast.error(`Something went wrong: ${e.message}`)

                                                }

                                            }}
                                        className="my-1 cursor-pointer hover:bg-purple-400 w-full">
                                        <div className="px-2 flex items-center flex-nowrap">
                                            <BiLogOut size={25} color="black" className="mr-1" />
                                            <p>Logout</p>
                                        </div>

                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </nav>

            <SideNavBar
                toggle={toggle}
                setToggle={setToggle}
                session={session}
                handleClose={handleClose}
            />
        </div>
    )
}


