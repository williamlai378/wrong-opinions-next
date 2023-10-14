
import moment from "moment"
import Link from "next/link";
export const AiringItem = ({animeData}) => {
    const title = animeData.media.title.english ? animeData.media.title.english : animeData.media.title.romaji;

    const determineTrending = (trending) => {
    
        if(trending) {
            switch(true) {
                case(trending > 40 && trending < 100): {
                    return <div className={`h-full w-auto border-2 border-solid trending-sticker ml-2 p-1`}>TRENDING</div>
                }
                case(trending > 100): {
                    return <div className={`h-full w-auto border-2 border-solid hot-sticker ml-2 p-1`}>HOT</div>
                    
                }
                default: {
                    return false
                }
            }
        }
    }

    return (
        <div className="w-full airing-item p-[1px] flex items-center">
            <p className="text-lg">{moment.unix(animeData.airingAt).format('hh:mm')}</p>
            <div className="relative flex items-center">
                <h4>
                   <Link href={`/anime/${animeData.media.id}`}>{title}</Link>
                </h4>
                {determineTrending(animeData.media.trending)}
            </div>
            <p className="font-bold">Ep. {animeData.episode}</p>
        </div>
    )
}