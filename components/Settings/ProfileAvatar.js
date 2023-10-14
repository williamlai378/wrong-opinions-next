
import { useState, useEffect } from 'react'
import Image from 'next/image';
import { toast } from 'react-hot-toast'

const avatarImages = [
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/403024_avatar_boy_male_user_young_icon_nq1coq.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/403023_avatar_user_woman_female_person_icon_atp1of.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/628297_avatar_grandmother_mature_old_person_icon_lcwkkx.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/628283_avatar_grandfather_male_man_mature_icon_sxycdw.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/ninja-g0aca138d5_1280_pigrsb.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758641/Wrong%20Opinions/surprised-gfd0629ac5_1280_jtpp5h.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758641/Wrong%20Opinions/11766632_21378462_itnk9p.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758643/Wrong%20Opinions/29108294_JEMA_GER_1446-03_inmgvj.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758644/Wrong%20Opinions/5685694_58659_cw3x4p.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676765610/Wrong%20Opinions/trash_gxsz1r.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676765850/Wrong%20Opinions/ramen_qu6tvx.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676765929/Wrong%20Opinions/swords_nmpevt.webp",
]



const ProfileAvatar = ({ profileId, userId }) => {
    const [currAvatar, setCurrAvatar] = useState(profileId);
    const [tempSelected, setTempSelected] = useState(profileId);
    const [loading, setLoading] = useState(false)

    const handleSave = async (oldVal, newVal) => {
        if (oldVal === newVal) return;
        setLoading(true);

        const bodyData = {
            dataType: 'image',
            oldVal: oldVal,
            newVal: newVal
        }
        const response = await fetch(`http://localhost:3000/api/settings/change/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        }).then(async (res) => await res.json())

        if (response.status === 'success') {
            setCurrAvatar(tempSelected)
            toast.success(`Profile avatar has been successfully updated`)
        } else {
            toast.error(`Something went wrong. Update failed.`)
        }

        setLoading(false);
        return
    }

    return (
        <div className='flex flex-col '>
            <div
                className='grid grid-cols-4 gap-4 box-border'>
                {avatarImages.map((image, index) => {
                    return (
                        <div
                            key={`wo-avatar-image-${index}`}
                            onClick={() => {
                                console.log('click picture')
                                setTempSelected(index)
                            }}
                            className={`${(index === currAvatar) ? "border-purple-400  border-2 border-dashed" : ""}
                            ${(index === tempSelected ? "border-purple-400 border-4 border-solid" : "border-transparent-purple-400 border-4 border-solid")}
                            relative w-full aspect-square cursor-pointer`}>
                            <Image
                                fill
                                src={image}
                                alt={`avatar-${index}`}
                            />
                        </div>
                    )
                })}
            </div>
            {(tempSelected !== currAvatar) && (
                <div className='w-full flex justify-end items-center mt-4'>
                    <button
                        onClick={() => {
                            handleSave(currAvatar, tempSelected)
                        }}
                        className="save-changes-button">
                        {loading ? <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div> : 'Save'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default ProfileAvatar