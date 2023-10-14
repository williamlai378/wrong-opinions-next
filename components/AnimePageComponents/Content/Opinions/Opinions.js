'use client'

import { CgProfile } from 'react-icons/cg'
import { useRef, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import OpinionCard from './OpinionCard'
import axios from 'axios'



const OpinionSection = ({ session, animeId, isListed = false, isReleased }) => {
    const inputRef = useRef(null);
    const [hasOpinion, setHasOpinion] = useState(false);
    const [animeOpinions, setAnimeOpinions] = useState([])
    const [loading, setLoading] = useState(false)
    const [postable, setPostable] = useState(false)


    const [focus, setFocus] = useState(false)


    const onFocus = () => setFocus(true);


    const handleSubmit = async () => {
        console.log('submitting opinion');

        setFocus(false);
        if (!inputRef.current.innerHTML) {
            return
        }

        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/api/opinion/submit',
            data: {
                userId: session.data.user.id,
                animeId: animeId,
                text: inputRef.current.innerHTML
            }
        })


        if (response?.data.status === 'success') {
            toast.success('Opinion successfully posted')
            const res = await axios({
                method: "GET",
                url: `http://localhost:3000/api/opinion/getOpinions/${animeId}`,
            })
            if (res.data.status === 'success' && res.data?.opinions) {
                inputRef.current.innerHTML = ''
                setAnimeOpinions(res.data.opinions);
            }
        }
    }

    const handleDeleteOpinion = async (opinionId) => {
        console.log('deleting opinion')
        if (session.status !== 'authenticated') {
            toast.error('You are not authenticated')
            return
        }

        const res = await fetch(`http://localhost:3000/api/opinion/delete/${opinionId}`,
            {
                method: 'DELETE'
            })
            .then(async (response) => await response.json())
            .catch((e) => {

                toast.error("Something went wrong. Please try again")
            })

        if (res.status === 'success') {
            const newOpinions = animeOpinions.filter((opinion) => opinion.id !== opinionId)

            setAnimeOpinions(newOpinions)
            toast.success('Opinion successfully removed')
        }
    }

    useEffect(() => {

        const fetchData = async () => {

            const response = await axios({
                method: "GET",
                url: `http://localhost:3000/api/opinion/getOpinions/${animeId}`,
            })

            if (response?.data.status === 'success') {
                setAnimeOpinions(response.data.opinions)
            }
        }

        fetchData();

    }, [])

    useEffect(() => {
        if (session?.user) {
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
                    console.log('results checklisted', results)

                }
            }

            getListed();
        }
    }, [])

    useEffect(() => {
        const element = document.querySelector('.opinion-input');
        if (element) {
            element.addEventListener('input', (e) => {
                if (e.currentTarget.innerHTML === '') {
                    setPostable(false)
                } else {
                    setPostable(true)
                }
            }, false)
        }
    }, [])


    return (
        <div className="w-full flex flex-col transition-all">
            <h3
                className="text-lg font-bold">
                Opinions
            </h3>
            {animeOpinions.length <= 0 && (
                <div className='w-full rounded-lg bg-neutral border-neutral-400 border-solid border-2 text-center p-2 my-4'>
                    <p className='text-xl'>No opinions yet...</p>
                </div>
            )}
            {session.status === 'authenticated' && isListed && isReleased &&
                (<div className='flex flex-col'>
                    <div className="opinion-input-container">
                        <CgProfile size={40} className='mr-2'/>
                        <div className="input-box w-full h-full overflow-hidden">
                            <span
                                className="auth-input block w-full h-full opinion-input"
                                role='textbox'
                                ref={inputRef}
                                onFocus={onFocus}
                                placeholder='Got an Opinion?'
                                onChange={() => { console.log(inputRef.current.innerHTML) }}
                                contentEditable />
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                    </div>
                    {(focus) && (
                        <div className='flex w-full justify-end'>
                            <button
                                onClick={() => {
                                    setFocus(false)
                                    inputRef.current.innerHTML = ''
                                }}
                                className='mr-4 px-2 rounded-full hover:bg-gray-300'>
                                Cancel
                            </button>
                            <button

                                onClick={handleSubmit}
                                className={`${postable ? 'bg-purple-400' : 'bg-slate-200'} px-4 rounded-full transition-all`}>
                                Submit
                            </button>
                        </div>)}
                </div>)}
            {!isReleased && (
                <div
                    data-tooltip={'You cannot post your opinion on unreleased anime'}
                    className="flex items-center invalid-opinion-input-container">
                    <CgProfile size={40} className='mr-2'/>
                    <div className="input-box w-full h-full overflow-hidden ">
                        <span
                            className="auth-input block w-full h-full opinion-input"
                            role='textbox'
                            ref={inputRef}
                            onFocus={onFocus}
                            placeholder='Got an Opinion?'
                        />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                </div>
            )}
            {session.status === 'unauthenticated' && isReleased && (
                <div
                    data-tooltip={'Sign in to post your opinion'}
                    className="flex items-center invalid-opinion-input-container">
                    <CgProfile size={40} className='mr-2'/>
                    <div className="input-box w-full h-full overflow-hidden ">
                        <span
                            className="auth-input block w-full h-full opinion-input"
                            role='textbox'
                            ref={inputRef}
                            onFocus={onFocus}
                            placeholder='Got an Opinion?'
                        />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                </div>
            )}
            {!isListed && session.status === 'authenticated' && isReleased && (
                <div
                    data-tooltip={'Add anime to your list before you make an opinion'}
                    className="flex items-center invalid-opinion-input-container">
                    <CgProfile size={40} className='mr-2'/>
                    <div className="input-box w-full h-full overflow-hidden">
                        <span
                            className="auth-input block w-full h-full opinion-input"
                            role='textbox'
                            ref={inputRef}
                            onFocus={onFocus}
                            placeholder='Got an Opinion?'
                        />
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                </div>
            )}


            <div className='w-full flex flex-col'>
                {animeOpinions?.length > 0 && animeOpinions.map((opinion) => {

                    return (
                        <OpinionCard

                            handleDelete={handleDeleteOpinion}
                            key={opinion.id}
                            opinionData={opinion} />
                    )
                })}
            </div>
        </div>
    )
}

export default OpinionSection
