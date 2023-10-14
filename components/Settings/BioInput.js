'use client'
import { useRef, useState, useEffect } from "react";
import { convert } from "html-to-text";
import { toast } from "react-hot-toast";
const BioInput = ({ settingsData }) => {

    const inputRef = useRef(null);
    const [bio, setBio] = useState(settingsData.bio ? settingsData.bio : '') //the saved user's bio
    const [bioInput, setBioInput] = useState(bio) // stores value of the bio input as temp storage when changing user's bio
    const [focus, setFocus] = useState(null); //used to toggle the cancel/save button along with char count
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        if(inputRef.current) {
            console.log(bio)
            inputRef.current.innerHTML = bio;
        }
        const keyListener = () => {
            if (inputRef.current) {
                setBioInput(convert((inputRef.current.innerHTML)))
            }
        }

        window.addEventListener('keyup', keyListener)

        return () => {
            window.removeEventListener('keyup', keyListener)
        }
    }, [focus])

    const handleSave = async (oldVal, newVal) => {
        setLoading(true)
        const bodyData = {
            dataType: 'bio',
            oldVal: oldVal,
            newVal: newVal
        }
        const response = await fetch(`http://localhost:3000/api/settings/change/${settingsData.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }).then(async (res) => await res.json())

        if (response.status === 'success') {
            setBio(bioInput)
            toast.success(`${bodyData.dataType.charAt(0).toUpperCase() + bodyData.dataType.slice(1)} has been successfully updated`)
        } else {
            toast.error(`Something went wrong. Update failed.`)
        }

        setLoading(false)
    }

    return (
        <div className="flex flex-col">
            <div className="input-box w-full h-full overflow-hidden">
                <span
                    className="auth-input block w-full h-full opinion-input"
                    role='textbox'
                    ref={inputRef}
                    onFocus={() => { setFocus(true) }}
                    placeholder='Got an Opinion?'
                    contentEditable />
                <span className="focus-border">
                    <i></i>
                </span>
            </div>
            {(focus) && (
                <div
                    className="w-full flex justify-between items-center py-2">
                    <div>
                        <p key={'string length'}
                        >
                            <span
                                className={`text-black transition-colors ${bioInput.length > 250 ? "text-red-400" : ''}`}>
                                {bioInput.length}
                            </span>
                            /250</p>
                    </div>
                    <div className="flex">
                        <button
                            onClick={() => {
                                setFocus(false);
                                setBioInput(bio);
                            }}
                            className='mr-4 px-4 rounded-md bg-gray-300 py-1 font-bold'>
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            onClick={() => {
                                handleSave(bio, bioInput)
                            }}
                            className={`bg-purple-400 font-bold text-white px-4 py-1 rounded-md transition-all`}>
                            {loading ?
                            (<div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>) : 'Save'}
                        </button>
                    </div>

                </div>
            )}
        </div>

    )
}

export default BioInput;