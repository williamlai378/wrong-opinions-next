'use client'

import List from '@/components/List/List'
import ProfileStats from './ProfileStats'
import ProfileOpinions from './Opinions/Opinions'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function Content({ profileData, username }) {
    const [activeContent, setActiveContent] = useState("List")
    const session = useSession();
    let isUserProfile = session.data?.user.username === username[0];
    
    
    const displayContent = () => {
        switch (activeContent) {
            case "List": {
                return (
                    <List
                        username={username}
                        listData={profileData.listData}
                        session={session} />
                )
            }
            case "Stats": {
                return (
                    <ProfileStats profileData={profileData} />
                )
            }
            case "Opinions": {
                return (
                    <ProfileOpinions 
                        session={session}
                        isUserProfile={isUserProfile}
                        profileData={profileData} />
                )
            }
        }
    }

    if (profileData) {
        return (
            <div className="w-full flex flex-col py-6">
                <div className="profile-categories flex flex-nowrap overflow-x-hidden items-center relative">
                    <div className="flex justify-between w-full border-b-2 border-purple-100">
                        {
                            ["List", "Stats", "Opinions"].map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => setActiveContent(item)}
                                        className={`group text-center px-3 py-1 cursor-pointer ${item === activeContent ? 'text-purple-400' : 'text-black'}`}>
                                        <p
                                            className='group-hover:text-purple-200'>
                                            {item}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="content-display w-full flex justify-center bg-grey-300">
                    {displayContent()}
                </div>
            </div>
        )
    }
}