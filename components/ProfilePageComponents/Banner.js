'use client'


import Image from 'next/image'

export default async function ProfileBanner({ username, bannerImage, bioStyle = 'default', bio = "Pass an array of motion values and the provided function will receive the latest ouput as an array." }) {

    return (
        <div className="w-full aspect-video max-h-[40vh] relative z-0 flex flex-col border-2 border-black border-solid">
            <Image
                src={bannerImage}
                fill
                alt="banner-background"
                className='z-0 object-cover object-center'
            />
            <h2 
                className='bg-black px-4 py-1 rounded-lg tracking-wide text-white bg-opacity-75 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                {username}
            </h2>
        </div>
    )
}