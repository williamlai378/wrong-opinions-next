
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { ImDisplay, ImPlay3 } from 'react-icons/im'
import { MdScore } from 'react-icons/md'
import { BsChatText, BsGraphUp } from 'react-icons/bs'
import { averageRatingColor, statusColor } from '@/lib/textColor'
import ProgressProvider, { progressProvider } from '@/lib/progressProvider'
import OpinionDistribution from './Opinions/OpinionDistribution'
import { useState, useEffect } from 'react'

const ProfileStats = ({ profileData }) => {
    let ratingDistribution = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0
    }
    let statusDistribution = {
        'WATCHING': 0,
        'COMPLETED': 0,
        'PAUSED': 0,
        'DROPPED': 0,
        'PLANNING': 0

    }

    let totalRatings = 0;
    let totalStatus = 0;

    const calculateDistributions = () => {
        let tempRateDist = ratingDistribution;
        let tempStatusDist = statusDistribution;

        profileData.listData.forEach((list) => {
            if(list?.rating) {
                tempRateDist[list.rating] += 1;
                totalRatings++;
            }
            if(list?.viewStatus) {
                console.log(list.viewStatus)
                tempStatusDist[list.viewStatus] += 1;
                totalStatus++;
            }
            

            statusDistribution = tempStatusDist;
            ratingDistribution = tempRateDist; 
        })

    }

    calculateDistributions();

    const calculateTotalAnime = () => {
        let count = 0;
        profileData.listData.forEach((list) => {
            count++;
        })

        return count;
    }
    const calculateTotalEpisodes = () => {
        let count = 0;
        profileData.listData.forEach((list) => {
            count += list.episodeProgress;
        })

        return count;
    }

    const calculateAverageScore = () => {
        let totalScore = 0;
        let animeCount = 0;

        profileData.listData.forEach((list) => {
            totalScore += list.rating;
            animeCount++;
        })

        if(totalScore && animeCount) {
            return Number(totalScore / animeCount).toFixed(1);
        }else {
            return "???"
        }

        
    }

    const calculateTotalOpinions = () => {
        let count = 0;
        profileData.opinionData.forEach((opinion) => {
            count++;
        })

        return count
    }


    return (
        <div
            className="w-full max-w-[1200px] 2xl:max-w-[1500px] px-5 md:px-10 xl:px-5 flex flex-col">
            <div
                className="grid grid-cols-2 md:grid-cols-4 my-4 gap-4">
                <div className='profile-stat-card'>
                    <div className='rounded-full flex justify-center items-center p-3 w-1/4 aspect-square bg-purple-100'>
                        <ImDisplay size={30} className='text-purple-300 p-0 m-0 bg-transparent' />
                    </div>
                    <h3 className='text-lg font-semibold mt-2 flex-1'>Animes Watched</h3>
                    <p className='text-4xl mt-2'>
                        {calculateTotalAnime()}
                    </p>
                </div>
                <div className='profile-stat-card'>
                    <div className='rounded-full flex justify-center items-center w-1/4 aspect-square bg-purple-100'>
                        <ImPlay3 size={30} className='text-purple-300 p-0 m-0 bg-transparent' />
                    </div>
                    <h3 className='text-lg font-semibold mt-2 flex-1'>Episodes</h3>
                    <p className='text-4xl mt-2'>
                        {calculateTotalEpisodes()}
                    </p>
                </div>
                <div className='profile-stat-card'>
                    <div className='rounded-full flex justify-center items-center w-1/4 aspect-square bg-purple-100'>
                        <BsGraphUp size={30} className='text-purple-300 p-0 m-0 bg-transparent' />
                    </div>
                    <h3 className='text-lg font-semibold mt-2 flex-1'>Avg. Rating</h3>
                    <p
                        style={{
                            color: averageRatingColor(calculateAverageScore())
                        }}
                        className='text-4xl mt-2'>
                        {calculateAverageScore()}
                    </p>
                </div>
                <div className='profile-stat-card'>
                    <div className='rounded-full flex justify-center items-center w-1/4 aspect-square bg-purple-100'>
                        <BsChatText size={30} className='text-purple-300 p-0 m-0 bg-transparent' />
                    </div>
                    <h3 className='text-lg font-semibold mt-2 flex-1'>Opinions</h3>
                    <p
                        className='text-4xl mt-2'>
                        {calculateTotalOpinions()}
                    </p>
                </div>
            </div>
            <div
                className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='w-full'>
                    <h3 className='text-lg mb-2'>Rating Distribution</h3>
                    <div
                        className='flex flex-nowrap bg-white items-end justify-evenly w-full h-[190px] shadow-md'>
                        {
                            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => {
                                let amountPercentage = totalRatings <= 0 ? 1 : ratingDistribution[rate] / totalRatings;
                                return (
                                    <ProgressProvider
                                        key={`${rate}-${ratingDistribution[rate]}-${crypto.randomUUID()}`}
                                        start={0} end={amountPercentage * 150}>
                                        {(value) =>
                                            <div className="h-full w-[15px] flex flex-col flex-nowrap justify-end">
                                                <p 
                                                    className="text-sm relative right-2">
                                                    {amountPercentage === 0 ? parseFloat(value).toFixed(1) : 0}%
                                                </p>
                                                <div
                                                    className="w-full flex items-end justify-between rounded-lg"
                                                    style={{
                                                        height: `${value}%`,
                                                        backgroundColor: averageRatingColor(rate),
                                                        transition: 'all 2s ease'
                                                    }}>
                                                </div>
                                                <p>
                                                    {rate}
                                                </p>

                                            </div>
                                        }
                                    </ProgressProvider>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='w-full'>
                    <h3 className='text-lg mb-2'>View Status Distribution</h3>
                    <div
                        className='flex flex-col flex-nowrap bg-white justify-between w-full h-[190px] shadow-md'>
                        {
                            ["WATCHING", "PLANNING", "COMPLETED", "DROPPED", "PAUSED"].map((status) => {
                                let amountPercentage = totalStatus <= 0 ? 1 : statusDistribution[status] / totalStatus;
                                return (
                                    <ProgressProvider
                                        key={`${crypto.randomUUID()}`}
                                        start={0}
                                        end={amountPercentage * 100}>
                                        {(value) =>
                                            <div className={`h-[30px] w-full flex flex-row flex-nowrap items-center justify-between`}>
                                                <div
                                                    style={{
                                                        width: `${value}%`,
                                                        backgroundColor: statusColor(status === 'WATCHING' ? 'CURRENT' : status),
                                                        transition: 'all 2s ease'
                                                    }}
                                                    className={`h-full bg-[${statusColor(status === 'WATCHING' ? 'CURRENT' : status)}] flex items-center shadow-mdjustify-between rounded-e-lg`}>
                                                    <h4 className="ml-1 relative z-10 bg-transparent font-bold">
                                                        {amountPercentage === 0 ? parseFloat(amountPercentage * 100).toFixed(2) : 0}%
                                                    </h4>
                                                </div>
                                                <p
                                                    style={{
                                                        marginRight: '.5rem'
                                                    }}>
                                                    {status}
                                                </p>
                                            </div>
                                        }
                                    </ProgressProvider>
                                )
                            })
                        }
                    </div>
                </div>  
            </div>
            <OpinionDistribution opinionData={profileData.opinionData} />
        </div>
    )
}

export default ProfileStats;