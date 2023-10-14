
import HomeHeader from "@/components/HomeComponents/HomeHeader"
import { 
    getUpcomingHype, 
    getTrending, 
    getLastSeason, 
    getCurrentYear, 
    getPopularAllTimeAnime } from "@/lib/anilistGraphQL"
import { AnimeSlider } from "@/components/HomeComponents/AnimeSlider/AnimeSlider"
import { AiringSchedule } from "@/components/HomeComponents/AiringSchedule/AiringSchedule"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
export const metadata = {
    title: 'Wrong Opinion',
}

export default async function HomePage() {

    const upcoming = getUpcomingHype(); 
    const trending = getTrending();
    const today = new Date();

    let currentSeason = today.getMonth() + 1;
    const session = await getServerSession(authOptions)

    // if current season is Winter, set currentSeason value to Fall (year must be prev year)
    if(currentSeason >= 1 && currentSeason <= 3) {
        currentSeason = 'Fall'
    } // if current season is Spring, set currentSeason value to Winter
    else if(currentSeason >= 4 && currentSeason <= 6) {
        currentSeason = 'Winter'
    } // if current season is Summer, set currentSeason value to Spring
    else if(currentSeason >= 7 && currentSeason <= 9) {
        currentSeason = 'Spring'
    } //  if current season is Fall, set currentSeason value to Summer
    else if(currentSeason >= 10 && currentSeason <=12) {
        currentSeason = 'Summer'
    }

    const lastSeason = getLastSeason(currentSeason, 
        (currentSeason === 'Fall' ? today.getFullYear() - 1 : today.getFullYear()));
    
    const currentYear = getCurrentYear(today.getFullYear() - 1)
    const popularAllTime = getPopularAllTimeAnime()

    const [upcomingData, trendingData, lastSeasonData, currentYearData, popularAllTimeData] = await Promise.all(
        [
            upcoming, trending, lastSeason, currentYear, popularAllTime
        ]
    )


    return (
        <div className="h-full flex flex-col w-full">
            <HomeHeader data={upcomingData.data.Page.media} session={session}/>
            <div className="w-full flex flex-col my-5 items-center px-5">
                <h3 className="text-left w-full md:w-4/5">TRENDING</h3>
                <AnimeSlider data={trendingData.data.Page.media} sliderName={'trending'}/>
                <h3 
                    className="text-left w-full md:w-4/5">
                    {`Best of ${currentSeason} ${currentSeason === 'Fall' ? today.getFullYear() - 1 : today.getFullYear()}`}
                </h3>
                <AnimeSlider data={lastSeasonData.data.Page.media} sliderName={'past-season'}/>
                <h3 className="text-left w-full md:w-4/5">{`Best of ${today.getFullYear()}`}</h3>
                <AnimeSlider data={currentYearData.data.Page.media} sliderName={'current-year'}/>
                <h3 className="text-left w-full md:w-4/5">Most Popular of All Time</h3>
                <AnimeSlider data={popularAllTimeData.data.Page.media} sliderName={'most-popular'}/>
                <AiringSchedule today={today} />
            </div>
            
        </div>
    )
}