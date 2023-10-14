'use client'

import { useState, useEffect, useRef } from 'react';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';
import { checkUsernameAvailability } from '@/lib/checkUsernameAvailability';
import { motion } from 'framer-motion'

const AccountSettings = (props) => {
    const { settingsData } = props;
    const [name, setName] = useState(settingsData.name);
    const [nameInput, setNameInput] = useState(settingsData.name);
    const [nameEditToggle, setNameEditToggle] = useState(false);
    const nameRef = useRef(null);

    const [email, setEmail] = useState(settingsData.email);
    const [emailInput, setEmailInput] = useState(settingsData.email);
    const [emailEditToggle, setEmailEditToggle] = useState(false);
    const emailRef = useRef(null);

    const [username, setUsername] = useState(settingsData.username);
    const [usernameInput, setUsernameInput] = useState(settingsData.username);
    const [usernameEditToggle, setUsernameEditToggle] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);
    const [usernameTimeout, setUsernameTimeout] = useState(null);
    const [checkingUser, setCheckingUser] = useState(false)
    const usernameRef = useRef(null);

    const [titlePreference, setTitlePreference] = useState(settingsData.titlePreference ? settingsData.titlePreference : 'English')

    const [password, setPassword] = useState(settingsData.password);

    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        if (nameRef.current) {
            nameRef.current.value = name;
        }
    }, [usernameFocus])

    const handleUsernameInputChange = (inputVal) => {
        if (usernameTimeout) clearTimeout(usernameTimeout);
        setCheckingUser(true);

        const newTimer = setTimeout(async () => {
            let isAvailable = await checkUsernameAvailability(inputVal);
            setUsernameAvailable(isAvailable)
            setCheckingUser(false)
        }, 1500)

        setUsernameTimeout(newTimer);
    }


    const handleSubmit = async (dataType, oldVal, newVal) => {
        setLoading(true)
        if (oldVal === newVal) {
            setNameEditToggle(false);
            setEmailEditToggle(false);
            setUsernameEditToggle(false);
            return;
        }

        const bodyData = {
            dataType: dataType,
            oldVal: oldVal,
            newVal: newVal
        }
        switch (dataType) {
            case 'titlePreference': {
                const response = await fetch(`http://localhost:3000/api/settings/change/${settingsData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }).then(async (res) => await res.json())

                console.log(response)
                if (response.status === 'success') {
                    toast.success(`Title preference has been successfully updated`)
                } else {
                    toast.error(`Something went wrong. Update failed.`)
                }
                return;
            }
            default: {
                const response = await fetch(`http://localhost:3000/api/settings/change/${settingsData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyData)
                }).then(async (res) => await res.json())

                if (response.status === 'success') {
                    toast.success(`${bodyData.dataType.charAt(0).toUpperCase() + bodyData.dataType.slice(1)} has been successfully updated`)
                } else {
                    toast.error(`Something went wrong. Update failed.`)
                }
            }
        }

        if (loading) setLoading(false);
    }
    return (
        <div className='flex flex-col w-full box-border mb-4'>
            <h2 className='text-3xl font-semibold'>Account Settings</h2>
            <div className='flex flex-col'>
                <h3>Name</h3>
                <div className='flex justify-between items-center mb-2'>
                    {!nameEditToggle && <p>{name}</p>}
                    {!nameEditToggle &&
                        <button
                            className='bg-purple-400 rounded-lg text-white fond-semibold shadow-md text-lg px-2 py-1 min-w-[55px]'
                            onClick={() => setNameEditToggle(true)}>Edit</button>}
                    {nameEditToggle && (
                        <div className='grid grid-cols-editToggle w-full'>
                            <div className="input-box mr-2">
                                <input
                                    ref={nameRef}
                                    type="text"
                                    value={nameInput}
                                    onChange={(e) => { setNameInput(e.target.value) }}
                                    className="auth-input" required></input>
                                <span className="focus-border">
                                    <i></i>
                                </span>
                            </div>
                            <div className='flex flex-nowrap h-full'>
                                <button
                                    disabled={false}
                                    onClick={() => {
                                        setNameEditToggle(false);
                                        setNameInput(name);
                                    }}
                                    className='bg-slate-400 px-3 py-1 h-full mr-2'>
                                    Cancel
                                </button>
                                <button
                                    disabled={loading}
                                    onClick={async () => {
                                        await handleSubmit('name', name, nameInput)
                                        setName(nameInput);
                                        setNameEditToggle(false);

                                    }}
                                    className='bg-purple-400 px-3 py-1 h-full'>
                                    {loading ? <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div> : 'Save'}
                                </button>
                            </div>
                        </div>
                    )}

                </div>
                <h3>Email</h3>
                <div className='flex justify-between items-center mb-2'>
                    {!emailEditToggle && <p>{email}</p>}
                    {!emailEditToggle &&
                        <button
                            className='bg-purple-400 rounded-lg text-white fond-semibold shadow-md text-lg px-2 py-1 min-w-[55px]'
                            onClick={() => setEmailEditToggle(true)}>Edit</button>}
                    {emailEditToggle && (
                        <div className='grid grid-cols-editToggle w-full'>
                            <div className="input-box mr-2">
                                <input
                                    ref={emailRef}
                                    type="text"

                                    value={emailInput}
                                    onChange={(e) => { setEmailInput(e.target.value) }}
                                    className="auth-input" required></input>
                                <span className="focus-border">
                                    <i></i>
                                </span>
                            </div>
                            <div className='flex flex-nowrap h-full'>
                                <button
                                    disabled={loading}
                                    onClick={() => {
                                        setEmailEditToggle(false);
                                        setEmailInput(email);
                                    }}
                                    className='bg-slate-400 px-3 py-1 h-full mr-2'>
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        await handleSubmit('email', email, emailInput);
                                        setEmail(emailInput);
                                        setEmailEditToggle(false);
                                    }}
                                    disabled={loading}
                                    className='bg-purple-400 px-4 py-1 h-full'>
                                    {loading ? <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div> : 'Save'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <h3>Username</h3>
                <div className='flex justify-between items-center mb-2'>
                    {!usernameEditToggle && <p>{username}</p>}
                    {!usernameEditToggle &&
                        <button
                            className='bg-purple-400 rounded-lg text-white fond-semibold shadow-md text-lg px-2 py-1 min-w-[55px]'
                            onClick={() => setUsernameEditToggle(true)}>Edit</button>}
                    {usernameEditToggle && (
                        <div className='w-full flex flex-col'>
                            <div className='grid grid-cols-editToggle w-full'>
                                <div className="input-box mr-2">
                                    <input
                                        ref={usernameRef}
                                        type="text"
                                        onFocus={() => setUsernameFocus(true)}
                                        onBlur={() => setUsernameFocus(false)}
                                        value={usernameInput}
                                        onChange={(e) => {
                                            setUsernameInput(e.target.value)
                                            handleUsernameInputChange(e.target.value)
                                            if (loading) setLoading(false)
                                        }}
                                        className="auth-input" required></input>
                                    <span className="focus-border">
                                        <i></i>
                                    </span>
                                </div>
                                <div className='flex flex-nowrap h-full'>
                                    <button
                                        onClick={() => {
                                            setUsernameEditToggle(false);
                                            setUsernameInput(username);
                                        }}
                                        className='bg-slate-400 px-3 py-1 h-full mr-2'>
                                        Cancel
                                    </button>
                                    <button
                                        onClick={async () => {
                                            await handleSubmit('username', username, usernameInput);
                                            setUsername(usernameInput);
                                            setUsernameEditToggle(false);
                                        }}
                                        disabled={loading || !usernameAvailable || checkingUser}
                                        className='bg-purple-400 px-3 py-1 h-full'>
                                        {loading ? <div role="status">
                                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div> : 'Save'}
                                    </button>
                                </div>
                            </div>
                            {usernameFocus && !checkingUser && (
                                <div className='w-full '>
                                    {usernameAvailable ?
                                        <p className='text-green-300 text-md font-light'>Username available</p> :
                                        <p className='text-red-600 text-md font-light'>Username unavailable</p>}
                                </div>
                            )}

                            {usernameFocus && checkingUser && (
                                <div className='w-full flex items-center'>
                                    <p>Checking if username is available...</p>
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <h3>Title Language</h3>
                <div
                    className='w-full flex justify-between items-center relative flex-nowrap'>
                    <p>{settingsData.titlePreference ? (settingsData.titlePreference.charAt(0) + settingsData.titlePreference.substring(1)) : 'English'}</p>
                    <div className='flex items-center flex-nowrap'>
                        <motion.button
                            onClick={() => {
                                setTitlePreference('userPreferred')
                                handleSubmit('titlePreference', titlePreference, 'userPreferred');
                            }}
                            className={`flex font-semibold px-2 py-1 ${titlePreference === 'userPreferred' ? 'bg-purple-400 text-white' : 'bg-gray-300 text-black'} border-r-2 border-black border-dashed`}>
                            Default
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                setTitlePreference('english')
                                handleSubmit('titlePreference', titlePreference, 'english');
                            }}
                            className={`flex font-semibold px-2 py-1 ${titlePreference === 'english' ? 'bg-purple-400 text-white' : 'bg-gray-300 text-black'} border-r-2 border-black border-dashed`}>
                            English
                        </motion.button>
                        <motion.button
                            onClick={() => {
                                setTitlePreference('romaji')
                                handleSubmit('titlePreference', titlePreference, 'romaji');
                            }}
                            className={`flex font-semibold px-2 py-1 ${titlePreference === 'romaji' ? 'bg-purple-400 text-white' : 'bg-gray-300 text-black'}`}>
                            Romaji
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings;