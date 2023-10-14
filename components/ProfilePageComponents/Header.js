'use client'
import { BsPersonBadge } from "react-icons/bs"
import Image from "next/image"
import woodyImage from "@/public/woody-image.jpg"
import { useSession } from "next-auth/react"

export default async function ProfileHeader({ profileImage, bio }) {

    return (
        <div className="grid grid-cols-1 px-5">
            <div className="inner-header-wrap flex h-fit flex-col items-center">
                <div className="relative flex flex-col items-center md:grid md:grid-cols-profileHeader md:items-start w-full md:gap-8">
                    <div
                        className="w-1/2 md:w-full aspect-square rounded-full relative overflow-hidden z-10 border-solid border-white border-2 -mt-[25%] md:-top-[50%] md:-mt-0">
                        <Image
                            fill
                            alt="woody-image"
                            className="object-cover absolute z-0"
                            sizes="(min-width: 768px) 460px"
                            src={profileImage} />
                    </div>

                    <p 
                        className="text-lg tracking-wider italic font-medium my-2">
                        {bio}
                    </p>

                </div>
            </div>
        </div>

    )
}