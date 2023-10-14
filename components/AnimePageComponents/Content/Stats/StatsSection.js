import RankingsSection from "../Overview/RankingsSection";
import ScoreDistribution from "./ScoreDistribution";
import StatusDistribution from "./StatusDistribution";

const StatsSection = ({ animeData }) => {
    return (
        <div
            className="w-full flex flex-col items-center">
            <div
                className="w-full max-w-[1200px] flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                    <div 
                        className="w-full h-full flex flex-col justify-center items-center">
                            <div>
                                
                            </div>
                    </div>
                </div>
                <RankingsSection rankings={animeData.rankings} id={animeData.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <StatusDistribution data={animeData.stats.statusDistribution} />
                    <ScoreDistribution data={animeData.stats.scoreDistribution} />
                </div>
            </div>

        </div>
    )
}

export default StatsSection;