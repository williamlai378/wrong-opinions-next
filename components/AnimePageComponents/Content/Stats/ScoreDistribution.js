import ProgressProvider from "@/lib/progressProvider"
import { averageScoreColor } from "@/lib/textColor";

const ScoreDistribution = ({ data }) => {
    let totalAmount = 0;

    if (data) {
        data.map((score) => {
            if (score.amount) {
                totalAmount += score.amount;
            }
        })
    }

    if (!data) {
        return (
            <div className="w-full">
                <h3 className="text-lg mb-2">Score Distribution</h3>
                <div className="flex flex-nowrap bg-white items-center justify-center w-full h-[190px] shadow-md">
                    <div className="bg-neutral-200 p-3 shadow-lg">
                        Data Unavailable
                    </div>
                </div>
            </div>
        )

    } else {
        return (
            <div className="w-full">
                <h3 className="mb-2">Score Distribution</h3>
                <div className="flex flex-nowrap bg-white items-end justify-evenly w-full h-[190px] shadow-md">
                    {data.map((score) => {
                        let amountPercentage = totalAmount <= 0 ? 1 : score.amount / totalAmount;
                        return (
                            <ProgressProvider
                                key={`${score}-${amountPercentage}-${crypto.randomUUID()}`}
                                valueStart={0} valueEnd={amountPercentage * 150}>
                                {(value) =>
                                    <div className="h-full w-[15px] flex flex-col flex-nowrap justify-end">
                                        <p className="text-sm relative right-2">{parseFloat(value).toFixed(1)}%</p>
                                        <div
                                            className="w-full flex items-end justify-between rounded-lg"
                                            style={{
                                                height: `${value}%`,
                                                backgroundColor: averageScoreColor(score.score),
                                                transition: 'all 2s ease'
                                            }}>
                                        </div>
                                        <p>
                                            {score.score}
                                        </p>

                                    </div>
                                }
                            </ProgressProvider>
                        )
                    })}
                </div>
            </div>
        )
    }

}

export default ScoreDistribution;