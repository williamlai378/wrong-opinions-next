import { BsStarFill } from "react-icons/bs"
import {FaHeart, FaRegHeart} from 'react-icons/fa'


const RankingsSection = ({ rankings, id}) => {


    const createRankingIcons = (ranking) => {
        switch (ranking.context) {
            case 'highest rated all time': {
                switch (true) {
                    case (ranking.rank <= 10): {

                        return (
                            <div className="flex ml-1">
                                <BsStarFill size={15} color={'#FED700'} />
                                <BsStarFill size={15} color={'#FED700'} />
                                <BsStarFill size={15} color={'#FED700'} />
                            </div>
                        )

                    }
                    case (ranking.rank > 10 && ranking.rank <= 100): {
                        return (
                            <div className="flex ml-1">
                                <BsStarFill size={15} color={'#FED700'} />
                                <BsStarFill size={15} color={'#FED700'} />
                            </div>
                        )
                    }
                    case (ranking.rank > 100): {
                        return (
                            <div className="flex ml-1" >
                                <BsStarFill size={15} color={'#FED700'} />
                            </div>
                        )
                    }
                }
                break;
            }
            case 'most popular all time': {
                switch (true) {
                    case (ranking.rank <= 10): {
                        return (
                            <div className="flex ml-1">
                                <FaHeart size={20} color={'#F9404B'} className="animate-ping"/>
                            </div>
                        )

                    }
                    case (ranking.rank > 10 && ranking.rank <= 100): {
                        return (
                            <div className="flex ml-1">
                                <FaHeart size={20} color={'#F9404B'} />
                            </div>
                        )
                    }
                    case (ranking.rank > 100): {
                        return (
                            <div className="flex ml-1">
                                <FaRegHeart size={20} color={'#F9404B'} />
                            </div>
                        )
                    }
                }
                break;
            }
            case 'highest rated': {
                switch (true) {
                    case (ranking.rank <= 10): {
                        return (
                            <div className="flex ml-1" >
                                <BsStarFill size={15} color={'#FED700'} />
                                <BsStarFill size={15} color={'#FED700'} />
                                <BsStarFill size={15} color={'#FED700'} />
                            </div>
                        )

                    }
                    case (ranking.rank > 10 && ranking.rank <= 100): {
                        return (
                            <div className="flex ml-1" >
                                <BsStarFill size={15} color={'#FED700'} />
                                <BsStarFill size={15} color={'#FED700'} />
                            </div>
                        )

                    }
                    case (ranking.rank > 100): {
                        return (
                            <div className="flex ml-1">
                                <BsStarFill size={15} color={'#FED700'} />
                            </div>
                        )

                    }
                }
            }
            case 'most popular': {
                switch (true) {
                    case (ranking.rank <= 10): {
                        return (
                            <div 
                                className="flex ml-1">
                                <FaHeart size={20} color={'#F9404B'} className="animate-pulse"/>
                            </div>
                        )

                    }
                    case (ranking.rank > 10 && ranking.rank <= 100): {
                        return (
                            <div className="flex ml-1">
                                <FaHeart size={20} color={'#F9404B'} />
                                <FaHeart size={20} color={'#F9404B'} />
                            </div>
                        )

                    }
                    case (ranking.rank > 100): {
                        return (
                            <div className="flex ml-1">
                                <FaHeart size={20} color={'#F9404B'} />
                            </div>
                        )

                    }
                }

            }
        }
    }

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 my-2">
            {rankings.map((ranking, index) => {
                let string = ranking.context.toLowerCase()
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');

                if (ranking.allTime && index < 6) {
                    return (
                        <div
                            className="flex justify-center text-center bg-white round-md  items-center rounded-md shadow-md p-1 text-lg"
                            key={`${ranking.rank}-${ranking.context}-${id}-${crypto.randomUUID()}`}>
                            <p
                                style={{
                                    marginLeft: '1rem'
                                }}>
                                {` #${ranking.rank} ${string}`}
                            </p>
                            {createRankingIcons(ranking)}
                        </div>
                    )
                }

                if ((ranking.context === 'highest rated' || ranking.context === 'most popular')
                    && ranking.year && index < 6) {

                    if (ranking.season) {
                        return (
                            <div
                                className="flex justify-center text-center bg-white round-md  items-center rounded-md shadow-md p-1 text-lg"
                                key={`${ranking.rank}-${ranking.context}-${id}-${crypto.randomUUID()}`}>
                                <p>
                                    {`#${ranking.rank} ${string} of ${ranking.season} ${ranking.year}`}
                                </p>
                                {createRankingIcons(ranking)}
                            </div>
                        )
                    }
                    else {
                        return (
                            <div
                                className="flex justify-center text-center bg-white round-md items-center rounded-md shadow-md p-1 text-lg"
                                key={`${ranking.rank}-${ranking.context}-${id}-${crypto.randomUUID()}`}>

                                <p>
                                    {`#${ranking.rank} ${string} in ${ranking.year}`}
                                </p>
                                {createRankingIcons(ranking)}
                            </div>
                        )
                    }
                }
            })}
        </div>
    )
}

export default RankingsSection;