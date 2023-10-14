import { averageScoreColor } from "@/lib/textColor"
import { GiHumanTarget } from "react-icons/gi"
import { IoMdAddCircle } from "react-icons/io"
import Link from "next/link"

const RelationsSection = ({ data, amount = -1 }) => {

    const relationData = data.filter((item, index) => (index < amount && item.relationType !== "ADAPTATION"))

    const getReturnCountdown = (anime) => {
        if (!anime.nextAiringEpisode) return ''
        let daysLeft = Math.floor(anime.nextAiringEpisode.timeUntilAiring / (1000 * 60 * 60 * 24));
        let hoursLeft = Math.floor((anime.nextAiringEpisode.timeUntilAiring % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutesLeft = Math.floor((anime.nextAiringEpisode.timeUntilAiring % (1000 * 60 * 60)) / (1000 * 60));
        let secondsLeft = Math.floor((anime.nextAiringEpisode.timeUntilAiring % (1000 * 60)) / 1000);

        return `Ep.${anime.nextAiringEpisode.episode} in 
        ${daysLeft > 0 ? `${daysLeft}D:` : ''}
        ${hoursLeft > 0 ? `${hoursLeft}H:` : ''}
        ${minutesLeft > 0 ? `${minutesLeft}M:` : ''}
        ${secondsLeft >= 0 ? `${secondsLeft}s` : ''}`
    }

    const relationType = (relationString) => {
        let tempStr = relationString.split('_')
        let result = ""
        for(let i = 0; i < tempStr.length; i++ ){ 
            tempStr[i] = tempStr[i].toLowerCase();
            result = (i+1 < tempStr.length) ? 
            `${result}${tempStr[i].charAt(0).toUpperCase() + tempStr[i].slice(1)} `:
            `${result}${tempStr[i].charAt(0).toUpperCase() + tempStr[i].slice(1)}`
        }
        return result
    }

    return (
        <div className="flex flex-col w-full mt-3">
            <h3 className="mb-2">Relations</h3>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                {relationData.map((relation, index) => {
                    return (
                        <div key={`${relation.id}-${index}`}>
                            <div
                                style={{
                                    backgroundImage: `url(${relation.node.coverImage.large})`,
                                }}
                                className="w-full rounded-t-lg shadow-lg relative aspect-9/12 bg-cover item-card">
                                <div
                                    className="overlay flex flex-col group relative text-white font-extrabold w-full h-full p-3 rounded-lg text-center">
                                    <h4
                                        title={relation.node.title.userPreferred}
                                        className="card-title opacity-0 group-hover:opacity-100"
                                    >
                                        {relation.node.title.userPreferred}
                                    </h4>
                                    <div
                                        style={{
                                            color: averageScoreColor(relation.node.averageScore)
                                        }}
                                        className="animeScore opacity-0 group-hover:opacity-100">
                                        <p className="text-xl">{relation.node.averageScore}</p>
                                    </div>
                                    <div className="flex flew-nowrap items-center justify-center opacity-0 group-hover:opacity-100">
                                        <GiHumanTarget size={30} className="mr-2" />
                                        <p>{relation.node.popularity}</p>
                                    </div>
                                    {relation.node.nextAiringEpisode && (
                                        <div className="hidden md:flex w-full justify-center items-center opacity-0 group-hover:opacity-100">
                                            <h6 className="text-bold text-sm md:text-lg">{getReturnCountdown(relation)}</h6>
                                        </div>)}
                                    <div className="w-full flex flex-row justify-between flex-nowrap opacity-0 group-hover:opacity-100 absolute card-add-container">
                                        <button className="border-none ml-2">
                                            <IoMdAddCircle size={40} color={'white'} />
                                        </button>
                                        <div className="bg-purple-400 flex justify-center items-center p-1 md:p-2 rounded-lg mr-2 hover:text-blue-600">
                                            <Link className="text-sm" href={`${relation.node.id}`}>Go To Page</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-purple-400 text-center text-white font-normal text-xl tracking-wider">
                                <p>{relationType(relation.relationType).toString().toUpperCase()}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default RelationsSection;