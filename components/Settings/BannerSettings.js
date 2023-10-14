import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'

const bannerImages = [
    'https://res.cloudinary.com/dcuccwysz/image/upload/v1696692305/Wrong%20Opinions/wrong-opinions-banner-1_edapr8.webp',
    'https://res.cloudinary.com/dcuccwysz/image/upload/v1696692819/Wrong%20Opinions/wrong-opinions-banner-2_r3fxyx.webp',
    'https://res.cloudinary.com/dcuccwysz/image/upload/v1696695656/Wrong%20Opinions/jorg-angeli-CAMwIxYk5Xg-unsplash_opbphl.webp'
]

const BannerSettings = ({ bannerId = 0, userId }) => {
    if (!userId) throw new Error('You are not authenticated')
    const [selectedBanner, setSelectedBanner] = useState(bannerId);
    const [tempSelected, setTempSelected] = useState(bannerId);
    const [loading, setLoading] = useState(false);

    const handleSave = async (oldVal, newVal) => {
        if (oldVal === newVal) return;
        setLoading(true);

        const bodyData = {
            dataType: 'bannerImage',
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
            setSelectedBanner(tempSelected)
            toast.success(`Profile banner has been successfully updated`)
        } else {
            toast.error(`Something went wrong. Update failed.`)
        }

        setLoading(false);
        return
    }


    return (
        <div className='flex flex-col'>
            <AnimatePresence>
                {!loading && <motion.div
                    key={"selected-banner-image-display"}
                    initial={{
                        opacity: 0,
                        filter: 'blur(5px)'
                    }}
                    animate={{
                        opacity: 1,
                        filter: 'blur(0px)'
                    }}
                    exit={{
                        opacity: 0,
                        filter: 'blur(5px)'
                    }}
                    transitions={{
                        duration: .1
                    }}
                    className='relative w-full h-[200px] aspect-video border-2 border-dashed border-black mb-6'>
                    <Image
                        fill
                        src={bannerImages[selectedBanner]}
                        alt={`wo-banner-image-${bannerId}`}
                    />
                </motion.div>}
                {loading && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: .25
                        }}
                        className='relative w-full h-[200px] aspect-video flex justify-center items-center'>
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='grid grid-cols-2 box-border gap-6 mb-2'>
                {bannerImages.map((image, index) => {
                    return (
                        <div
                            key={`wo-banner-image-key-${index}`}
                            onClick={() => {
                                setTempSelected(index)
                            }}
                            className={`${tempSelected === index ? 'border-purple-400' : ' border-gray-300 '} relative w-full h-[100px] border-solid border-4 cursor-pointer`}>
                            <Image
                                fill
                                src={image}
                                alt={`wo-banner-image-grid-${index}`}
                            />
                        </div>
                    )
                })}
            </div>
            {tempSelected !== selectedBanner && (
                <div
                    onClick={() => {
                        handleSave(selectedBanner, tempSelected)
                    }}
                    className='w-full flex justify-end items-center'>
                    <button
                        className='save-changes-button'>
                        {loading ? <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export default BannerSettings;