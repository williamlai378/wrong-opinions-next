'use client'
import Image from "next/image"
import { AddToListModal } from "../Modal/AddToListModal"
import { useState, useEffect } from "react"
import { averageScoreColor } from "@/lib/textColor"


import toast from "react-hot-toast"
const Header = ({ isListed, animeData, session }) => {
    const [modalToggle, setModalToggle] = useState(false);
    const [listItem, setListItem] = useState(undefined);
    const [statusLoad, setStatusLoad] = useState(false);

    useEffect(() => {
        //grab the list item if the anime is in the user's list
        
        if (session?.user) {
            console.log('header user effect is running')
            const getListed = async () => {
                const results = await fetch('http://localhost:3000/api/list/checkListed',
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: JSON.stringify({
                            animeId: animeData.id,
                            userId: session.user.id
                        })
                    }).then(async (response) => { return await response.json() })

                if (results.status === 'success') {
                    if (results?.data) setListItem(results.data)

                }
            }

            getListed();
        }

    }, [modalToggle])

    return (
        <div className="grid grid-cols-1 md:gap-3 w-full mb-3">
            <div className="inner-header-wrap flex flex-col items-center md:grid md:grid-cols-animeHeader md:flex-row md:gap-2">
                <div
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
                    }}
                    className="mr-3 w-3/5 md:w-full relative rounded-lg aspect-9/12 mt-5 md:mt-[-50%]">
                    <Image
                        className="object-cover h-full"
                        src={animeData.coverImage.large}
                        fill />
                </div>

                <div className="w-full md:self-end flex flex-col mt-3 md:mt-0">
                    <div className="flex flex-row flex-nowrap w-full justify-between h-full">
                        <div className={`border-solid border-green-400 b-2 flex flex-col items-center`}>
                            <p className="font-bold">
                                Avg. Score
                            </p>
                            <p
                                style={{
                                    color: averageScoreColor(animeData.averageScore)
                                }}
                                className="font-bold text-xl">
                                {animeData.averageScore ? animeData.averageScore : 'TBD'}
                            </p>
                        </div>
                        <div className={`border-solid border-green-400 b-2 flex flex-col items-center`}>
                            <p className="font-bold">
                                Popularity
                            </p>
                            <p className="text-lg">
                                {animeData.popularity}
                            </p>
                        </div>
                    </div>
                    {!statusLoad &&
                        (<button
                            key="add-to-list-button"
                            onClick={() => {
                                if (session?.user) {
                                    setModalToggle(true)
                                } else {
                                    toast.error('You must be logged in to add to your list', {
                                        position: 'top-center',
                                        expires: 3000,

                                    })
                                }


                            }}
                            className="bg-purple-300 w-full text-white font-bold text-xl rounded-md">
                            {isListed && listItem?.viewStatus ? listItem.viewStatus : 'Add to List'}
                        </button>)}
                    {modalToggle && (
                        <AddToListModal
                            isOpen={modalToggle}
                            session={session}
                            handleClose={() => { setModalToggle(false) }}
                            listItem={listItem}
                            setListItem={setListItem}
                            animeData={animeData} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;