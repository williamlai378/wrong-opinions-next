
'use client'
import { getCharactersData } from "@/lib/anilistGraphQL";
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast";
import CharacterCard from "./CharacterCard";


const PaginatedCharacterSection = ({ animeId }) => {

    const [charactersData, setCharactersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationLoading, setPaginationLoading] = useState(false)
    const [isLast, setIsLast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(0);

    const handleLoadMore = () => {
        setPaginationLoading(true);
        setCurrentPage(currentPage + 1);
    }

    useEffect(() => {
        const fetchData = async () => {
            const results = await getCharactersData(animeId, currentPage).then((res) => {
                if (res.data?.characters.edges) {
                    return res.data.characters.edges
                }
            }).catch((e) => {
                console.log(e);
                toast.error(e)
            });

            if (!(results.length) || results.length <= 0) {
                setIsLast(true);
                if (paginationLoading) {
                    setPaginationLoading(false);
                }
                if (loading) {
                    setLoading(false)
                }
                return
            }

            if (results) {
                setPrevPage(currentPage);
                setCharactersData([...charactersData, ...results]);
                if (paginationLoading) {
                    setPaginationLoading(false)
                }
            }

            if (loading) {
                setLoading(false);
            }
        }

        if (!isLast) {
            if (charactersData?.length <= 0) {
                setLoading(true);
            }
            fetchData();
        }

        fetchData();
    }, [currentPage, loading])


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-400"></div>
            </div>
        )
    }
    return (
        <div className="w-full flex flex-col items-center max-w-[920px] pt-4">
            <div className="w-full grid h-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {charactersData?.length >= 0 && (
                    charactersData.map((character, index) => {
                        return (
                            <CharacterCard
                                key={`${character.node.id}-${index}`}
                                character={character}
                            />
                        )
                    })
                )}
            </div>
            {!isLast &&
                <button
                    onClick={() => { handleLoadMore() }}
                    className="bg-purple-400 rounded-full w-fit m-5 px-4 py-1 text-white font-semibold">
                    {paginationLoading ?
                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                        </div>
                        : "Load More"}
                </button>}
        </div>
    )

}


export default PaginatedCharacterSection