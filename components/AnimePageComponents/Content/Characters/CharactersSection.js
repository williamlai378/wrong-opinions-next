

import CharacterCard from "./CharacterCard"
const CharactersSection = ({data, amount}) => {
    const characters = data.filter((character, index) => index < amount)


    
    return (
        <div className="flex flex-col my-4 max-w-[920px] pt-8">
            <h3 className="mb-2">Characters</h3>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
                {characters.map((character) => {
                    return (
                        <CharacterCard
                            key={character.id}
                            character={character} />
                    )
                })}
            </div>
        </div>
    )
}

export default CharactersSection