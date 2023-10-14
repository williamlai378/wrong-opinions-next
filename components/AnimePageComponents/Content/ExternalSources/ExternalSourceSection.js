
import YoutubeVideo from "@/components/Youtube/YoutubeIFrame"
import Image from "next/image"
import { FaLink } from 'react-icons/fa'
const ExternalSourceSection = ({ animeData }) => {
    const createLinkCard = (link, index) => {

        if (link.site === 'Official Site' && !link.icon) {
            return (
                <div
                    key={`${link.site}-${index}`}
                    className="w-full flex items-center bg-white shadow-md rounded-md pr-1">
                    <div className="w-8 h-8 relative mr-2">
                        <FaLink className="text-purple-400 w-full h-full mr-2" />
                    </div>
                    <a
                        className="hover:text-purple-400"
                        href={link.url}
                        target="_blank">
                        {link.site}
                    </a>
                </div>
            )
        }
        return (
            <div
                key={`${link.site}-${index}`}
                className="w-full flex items-center bg-white shadow-md rounded-md pr-1">
                <div
                    style={{
                        backgroundColor: link.color ? link.color : '#C084FC',
                        padding: '2px'
                    }}
                    className="w-8 h-8 relative p-4 mr-2">
                    <img
                        src={link.icon}
                        alt={link.site}
                        className="w-full h-full relative"
                    ></img>
                </div>
                <a
                    className="hover:text-purple-400"
                    href={link.url}
                    target="_blank">
                    {link.site === "Twitter" ? "Twitter | X" : link.site}
                </a>
                {link.language &&
                    <p className="text-sm font-extralight flex-1 text-end">
                        ({link.language})
                    </p>}
            </div>
        )
    }

    return (
        <div
            className="my-4">
            <h3
                className="mb-2">
                {`${animeData?.trailer ?
                    (animeData?.externalLinks.length > 0 ? 'Media and External Links' : 'Trailer') :
                    (animeData?.externalLinks.length > 0 ? 'External Links' : "")}`}
            </h3>
            {animeData?.trailer && <div className="w-full aspect-video">
                <YoutubeVideo videoId={animeData?.trailer?.id} />
            </div>}
            <div
                className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-4">
                {animeData?.externalLinks.length > 0 && (
                    animeData?.externalLinks.map((link, index) => {
                        if (!link.isDisabled) {
                            return createLinkCard(link, index)
                        }

                    })
                )}
            </div>
        </div>
    )
}
export default ExternalSourceSection;