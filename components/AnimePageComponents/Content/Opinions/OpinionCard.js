'use client'
import { useState, useEffect } from 'react'
import { BsPersonCircle } from 'react-icons/bs'

import { FaRegTrashAlt, FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'


//opinion data: opinion, username, user rating, user


const OpinionCard = ({ opinionData, handleDelete}) => {
    const { user } = opinionData;
    const [currResponse, setCurrResponse] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0)
    const session = useSession();

    useEffect(() => {
        let likeCount = 0;
        let dislikeCount = 0;
        opinionData.responses.map((response) => {
            if (session?.data?.user?.id === response.userId) {
                setCurrResponse(response.response ? 'like' : 'dislike');
            }
            switch (response.response) {
                case (false): {
                    dislikeCount++;
                    break;
                }
                case (true): {
                    likeCount++;
                    break;
                }
            }
        })

        setLikes(likeCount);
        setDislikes(dislikeCount);
    }, [])

    useEffect(() => {

    }, [likes, dislikes])

    const handleResponseClick = async (prevResponse, newResponse) => {

        if (session.status !== 'authenticated') {
            toast.error('You are not authenticated')
            return
        }
        // if the user clicked on a response with no prior interaction with this opinion
        if (!prevResponse) {
            // add new opinion response
            const res = await fetch(`http://localhost:3000/api/opinion/response/${opinionData.opinionId}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        responseUserId: session.data.user.id,
                        response: newResponse
                    }),
                }).then(async (response) => await response.json()).catch((e) => {
                    console.log(e)
                    toast.error(e)
                })

            //add to the corresponding response
            if (res.status === 'success') {
                switch (newResponse) {
                    case ('like'): {
                        setLikes(likes + 1);
                        break;
                    }
                    case ('dislike'): {
                        setDislikes(dislikes + 1);
                        break;
                    }

                }
                setCurrResponse(newResponse)
            }



            return
        }
        // if user clicked on the same response as they have clicked before
        if (prevResponse === newResponse) {
            //delete the response
            const res = await fetch(`http://localhost:3000/api/opinion/response/delete/${opinionData.opinionId}`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        responseUserId: session?.data?.user?.id
                    })
                }).then(async (response) => await response.json()).catch((e) => {
                    console.log(e);
                    toast.error(e)
                })

            if (res.status === 'success') {
                //subtract the reaction count
                switch (newResponse) {
                    case ('like'): {
                        setLikes(likes - 1);
                        break;
                    }
                    case ('dislike'): {
                        setDislikes(dislikes - 1);
                        break;
                    }
                }
                setCurrResponse(newResponse);
            }
            setCurrResponse('')
        }

        //if user clicks on a response that is different than their previous response (assuming there is a response)
        if (prevResponse !== newResponse && prevResponse !== '') {
            console.log('updateing response')
            // update the response data in the database
            const res = await fetch(`http://localhost:3000/api/opinion/response/${opinionData.opinionId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    responseUserId: session?.data?.user.id,
                    response: newResponse === 'like' ? true : false
                })
            }).then(async (response) => await response.json()).catch((e) => {
                toast.error(e)
            })

            //update the counts
            if (res.status === 'success') {
                switch (prevResponse) {
                    case ('like'): {
                        setLikes(likes - 1);
                        setDislikes(dislikes + 1);
                        break;
                    }
                    case ('dislike'): {
                        setDislikes(dislikes - 1);
                        setLikes(likes + 1);
                        break;
                    }
                }
                setCurrResponse(newResponse)
            }

        }
    }


    return (
        <div className='flex flex-col'>
            <div className='flex flex-nowrap items-start'>
                <div className='profile mr-3'>
                    {user?.image && (
                        <div
                            style={{
                                backgroundImage: user.image
                            }}
                            className='inline-block w-full rounded-full aspect-square bg-cover bg-center bg-no-repeat'>

                        </div>
                    )}
                    {!user?.image && (
                        <div className='flex flex-row items-center'>
                            <BsPersonCircle size={20} />
                            <p className='mr-5'>{opinionData.user.username}</p>
                        </div>
                    )}
                </div>
                <div className='flex flex-nowrap'>
                    <p className='mr-5'>Score: 10</p>
                    <p>Status: Completed</p>
                </div>
            </div>
            <div className="w-full bg-slate-300 shadow-lg p-3 rounded-md">
                <p>{opinionData.text}</p>
            </div>
            <div className='flex flex-nowrap w-full justify-between mt-1'>
                <div className='flex flex-nowrap'>
                    <button
                        
                        disabled={session.status !== 'authenticated' ? true : false}
                        onClick={() => {
                            handleResponseClick(currResponse, 'dislike')
                        }}
                        className='mr-4 flex items-center'>
                        <FaRegTrashAlt size={30} color={`${currResponse === 'dislike' ? 'purple' : ''}`} />
                        <p className='ml-2'>{dislikes}</p>
                    </button>
                    <button
                        className='flex items-center'
                        disabled={session.status !== 'authenticated' ? true : false}
                        onClick={() => {
                            handleResponseClick(currResponse, 'like')
                        }}>
                        {currResponse === 'like' && <FaHeart size={30} color='red' />}
                        {currResponse !== 'like' && <FaRegHeart size={30} color="red" />}
                        <p className='ml-2'>{likes}</p>
                    </button>
                </div>

                {session?.data?.user.id === opinionData.userId && (
                    <button
                        onClick={() => handleDelete(opinionData.id)}
                        className='bg-red-400 p-2 justify-end rounded-lg'>
                        Delete
                    </button>
                )}
            </div>
        </div>

    )
}

export default OpinionCard