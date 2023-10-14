import { getAnimeData } from "@/lib/anilistGraphQL"
import BannerSection from "@/components/AnimePageComponents/Banner"
import Header from "@/components/AnimePageComponents/Header"
import Description from "@/components/AnimePageComponents/Description"
import Content from "@/components/AnimePageComponents/Content/Content"

import parser from 'html-react-parser'
import './styles.css'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function AnimePage({ params }) {
    const anime = getAnimeData(params.id).then((response) => response.data.Media)
    const session = getServerSession(authOptions)

    const [animeData, sessionData] = await Promise.all([anime, session])
    let isListed = false
    if (sessionData?.user) {
        isListed = await fetch('http://localhost:3000/api/list/checkListed',
            {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    animeId: animeData.id,
                    userId: sessionData.user.id
                })
            }).then(async (response) => { return await response.json() })
        isListed = isListed.listed
    }
    



    return (
        <div className="w-full h-full flex flex-col">

            <BannerSection
                bannerImage={animeData.bannerImage ? animeData.bannerImage : 'https://res.cloudinary.com/dcuccwysz/image/upload/v1687822149/nullBanner_al8rsh.png'}
                color={animeData.coverImage.color}
                title={animeData.title}
                genres={animeData.genres} />
            <div className="w-full h-full flex flex-col px-5">
                <Header
                    animeData={animeData}
                    isListed={isListed}
                    session={sessionData}
                />
                <div className="w-full flex flex-wrap">
                    {animeData.genres.map((genre, index) => {
                        return (
                            <div
                                style={{ backgroundColor: `${animeData.coverImage.color}` }}
                                className={`mr-2 px-3 rounded-full py-1 mb-2 text-white`}
                                key={index}>
                                {genre}
                            </div>
                        )
                    })}
                </div>
                <Description description={parser(animeData?.description ? animeData.description : '')} />
            </div>
            <Content
                animeData={animeData}
                isListed={isListed}
            />

        </div>
    )
}