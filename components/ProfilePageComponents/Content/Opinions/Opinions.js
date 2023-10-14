


import OpinionCard from "./OpinionCard";

const ProfileOpinions = ({profileData, session, isUserProfile}) => {
    let opinions = [];
    
    profileData.opinionData.forEach((opinion) => {
        let listItem = profileData.listData.find((listItem) => listItem.animeId === opinion.animeId)
        let tempOpinion = {
            ...opinion,
            ...listItem
        }
        opinions.push(tempOpinion);
    })

    console.log('opinions', opinions)
    return (
        <div className="w-full flex flex-col max-w-[1200px] 2xl:max-w-[1500px] px-5 md:px-10 xl:px-5">
            {opinions.map((opinion, index) => {
                return (
                    <OpinionCard 
                        key={`${index}-${crypto.randomUUID()}`}
                        isUserProfile={isUserProfile}
                        session={session}
                        opinions={opinions}
                        opinionData={opinion} index={index}/>
                )
            })}
            {opinions.length === 0 && (<div>
                <h1 className="text-2xl font-light w-full text-center my-20">No Opinions Yet</h1>
            </div>)}
        </div>
    )
}

export default ProfileOpinions;