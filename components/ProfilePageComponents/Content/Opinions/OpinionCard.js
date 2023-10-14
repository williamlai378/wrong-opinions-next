import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BsTrash } from 'react-icons/bs'


const OpinionCard = ({ opinionData, index, session, isUserProfile, opinions }) => {
    const [showMore, setShowMore] = useState(false);
    const [editToggle, setEditToggle] = useState(false);
    const [opinion, setOpinion] = useState(opinionData.text);
    const [editText, setEditText] = useState(opinionData.text);
    const [editLoad, setEditLoad] = useState(false);
    const [deleteLoad, setDeleteLoad] = useState(false);
    const [focus, setFocus] = useState(false);
    const editTextRef = useRef(null);

    const onEditSummit = async () => {

        const response = await axios.post(`http://localhost:3000/api/opinion/edit/${opinionData.opinionId}`,
            {
                username: session.data.user.username,
                reqUserId: session.data.user.id,
                newOpinion: editTextRef.current.innerHTML
            }).then((response) => response.data)

        if (response.status === 'success') {
            setOpinion(response.data.text);
            setEditLoad(false);
            setEditToggle(false);
        }
    }

    const onDelete = async () => {
        const response = await axios.delete(`http://localhost:3000/api/opinion/delete/${opinionData.opinionId}`);
        if (response.status === 'success') {
            opinions.splice(index, 1);
        }
    }
    useEffect(() => {
        editTextRef.current.innerHTML = opinionData.text;

    }, [editToggle])

    return (
        <div
            className={`w-full my-2 flex flex-row flex-nowrap ${showMore || editToggle ? 'h-fit' : 'max-h-[300px]'} items-start`}
            key={`${index}-${crypto.randomUUID()}`}>
            <div className={`w-1/5 md:w-[15%] relative shadow-md aspect-9/12 overflow-hidden rounded-xl mr-3 `}>
                <Image
                    fill
                    priority
                    alt={opinionData.animeTitle}
                    className="object-cover"
                    src={opinionData.animeImage}
                    sizes='(min-width: 480px) 500px, 50px'
                />
            </div>

            <div className={`bg-gray-200 h-full w-4/5 max-w-4/5 md:w-[85%] md:max-w-[85%] p-4 rounded-2xl ${editToggle ? 'hidden' : 'flex'} flex-col justify-between`}>
                <p className={`${showMore ? 'opinion-text-display' : 'opinion-text-display-show'}`}>
                    {showMore ? opinion : opinion.substring(0, 370)}
                    {opinion.length >= 370 && !showMore &&
                        (<span
                            onClick={() => setShowMore(true)}
                            className="text-blue-700 font-light underline cursor-pointer">...Show More</span>)}
                    {opinion.length >= 370 && showMore &&
                        (<span
                            className="text-blue-700 font-light underline cursor-pointer"
                            onClick={() => setShowMore(false)}>...Show Less</span>)}
                </p>
                <div className="w-full flex justify-between items-center flex-nowrap">
                    <p className="font-light text-sm">10/3/23</p>
                    {session.status === 'authenticated' && isUserProfile &&
                        <button
                            onClick={() => setEditToggle(true)}
                            className="bg-purple-400 px-2 py-1 rounded-md text-sm">
                            Edit
                        </button>}
                </div>
            </div>
            <div className={`${editToggle ? 'flex' : 'hidden'} flex-col w-4/5 max-w-4/5 md:w-[85%] md:max-w-[85%] min-h-[200px] }`}>
                <div
                    className="input-box h-full overflow-hidden">
                    <span
                        className={`auth-input block w-full h-full opinion-input max-w-[100%]  ${editLoad ? 'opacity-40' : 'opacity-100'}`}
                        role='textbox'
                        ref={editTextRef}
                        onFocus={() => setFocus(true)}
                        placeholder='Got an Opinion?'
                        contentEditable />
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={() => {
                            //editTextRef.current.innerHTML = opinion;
                            setEditToggle(false)
                        }}>
                        Cancel
                    </button>
                    <div className="flex items-center">

                        <button
                            className="bg-purple-400 px-2 py-1 rounded-md text-sm mr-2"
                            onClick={() => {
                                setEditLoad(true)
                                onEditSummit()
                            }}
                            disabled={!focus}>
                            Save
                        </button>
                        <button
                            disabled={deleteLoad}
                            onClick={() => onDelete()}
                            className="py-1 px-2 bg-red-500 rounded-lg flex items-center text-white">
                            <BsTrash size={15} className="" />
                            {deleteLoad ? 
                            (
                                <div role="status">
                                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                </div>
                            ) : "Delete"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default OpinionCard;