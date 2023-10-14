
import RankingsSection from "./RankingsSection"
import CharactersSection from "../Characters/CharactersSection"
import StaffSection from "../Staff/StaffSection"
import StatusDistribution from "../Stats/StatusDistribution"
import ScoreDistribution from "../Stats/ScoreDistribution"
import RelationsSection from "../Relations/RelationsSection"
import RecommendationssSection from "../Recommendations/RecommendationsSection"
import OpinionSection from "../Opinions/Opinions"
import ExternalSourceSection from "../ExternalSources/ExternalSourceSection"
import { useSession } from "next-auth/react"

const Overview = ({animeData, isListed}) => {
    const animeRelations = animeData.relations.edges.filter((relation) => relation.node?.format !== "MANGA" 
    && relation.node?.format !== 'NOVEL')
    const session = useSession();

    const animeRecommendations = animeData.recommendations.edges.filter((recommendation) => recommendation.node.mediaRecommendation?.format !== "MANGA" 
    && recommendation.node.mediaRecommendation?.format !== "NOVEL")
   
    return (
        <div className="h-full flex flex-col px-5 max-w-[920px]">
            <ExternalSourceSection animeData={animeData}/>
            <RankingsSection rankings={animeData.rankings} id={animeData.id}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-6">
                <StatusDistribution data={animeData.stats.statusDistribution}/>
                <ScoreDistribution data={animeData.stats.scoreDistribution}/>
            </div>
            <CharactersSection data={animeData.characters.edges} amount={8}/>
            <StaffSection data={animeData.staff.edges} index={8}/>
            {animeRelations.length > 0 && <RelationsSection data={animeData.relations.edges} amount={8}></RelationsSection>}
            {animeRecommendations.length >0 && <RecommendationssSection data={animeData.recommendations.edges} amount={8}></RecommendationssSection>}
            <OpinionSection session={session} animeId={animeData.id} isListed={isListed}/> 
        </div>
    )
}

export default Overview;