





const OpinionDistribution = ({ opinionData }) => {
    let likes = 0;
    let dislikes = 0;

    opinionData.forEach((opinion) => {
        opinion.responses.forEach((response) => {
            if (response.response) {
                likes++;
            } else {
                dislikes++;
            }
        })
    })

    const likePercentage = likes / (likes + dislikes) * 100 || 0;
    const dislikePercentage = dislikes / (likes + dislikes) * 100 || 0;
    return (
        <div className="my-4">
            <h3 className="text-xl">Opinion Response Distribution</h3>
            <div className="w-full flex flex-nowrap h-[30px]">
                <div
                    style={{ width: `${likePercentage ? likePercentage : '100' }%` }}
                    className="h-full bg-pink-400">
                    <p
                        className="text-center text-white relative z-10 ">
                        {`Valid Opinion (${likePercentage}% : ${likes ? likes : 0} votes)`}`
                    </p>
                </div>
                <div
                    style={{ width: `${dislikePercentage ? dislikePercentage : '100'}%` }}
                    className="h-full bg-purple-300">
                    <p
                        className="text-center text-white relative z-10">
                        {`Wrong Opinion (${dislikePercentage}% : ${dislikes ? dislikes : 0} votes)`}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default OpinionDistribution