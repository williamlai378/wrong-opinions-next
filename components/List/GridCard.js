'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { statusColor } from '@/lib/textColor'
import { averageRatingColor } from '@/lib/textColor'
import Link from 'next/link'

export default function GridCard({ anime, session, username, router }) {
    return (
        <motion.div
            transition={{
                type: 'spring',
                damping: 10,
                stiffness: 200
            }}
            className='w-full aspect-9/12 relative rounded-lg overflow-hidden shadow-xl'>
            <Image
                fill
                priority
                src={anime.animeImage}
                alt={anime.animeTitle}
                sizes="(min-width: 480px) 500px, 100px"
                className="object-cover z-0 object-center"
            />
            <div className='w-full h-full flex flex-col z-20 relative'>
                <div className='flex w-full items-center justify-end'>
                    <div
                        style={{
                            border: `5px solid ${averageRatingColor(anime.rating)}`,
                        }}
                        className='rounded-full w-8 h-8 mr-2 mt-2 flex justify-center items-center bg-white p-2'>
                        <Link href={`/anime/${anime.animeId}`}>
                            <p
                                style={{ color: averageRatingColor(anime.rating) }}
                                className='text-lg'
                            >
                                {anime.rating}
                            </p>
                        </Link>

                    </div>
                </div>
            </div>
        </motion.div>
    )
}


