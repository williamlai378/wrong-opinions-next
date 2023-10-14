'use client'

import {useState, useEffect, useRef} from 'react'

const contentCategories = [
    'Overview',
    'Characters',
    'Staff',
    'Opinions',
    'Stats',
    'Tags'
]
const Categories = ({selected, setActiveCategory}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [underlineWidth, setUnderlineWidth] = useState(0);
    const [underlineLeft, setUnderlineLeft] = useState(0);
    const tabsRef = useRef([]);

    useEffect(() => {
        const setTabPosition = () => {
            const currentTab = tabsRef.current[activeIndex];
            setUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setUnderlineWidth(currentTab?.clientWidth ?? 0);
        }

        setTabPosition();
        window.addEventListener('resize', setTabPosition);

        return () => window.removeEventListener('resize', setTabPosition)
    }, [activeIndex])


    return (
        <div className="relative w-full overflow-x-hidden flex items-center ">
            <div className="category-container w-full whitespace-nowrap flex h-full overflow-x-scroll mb-1">
                    {contentCategories.map((category, index) => {
                        return (
                            <div 
                                ref={(el) => (tabsRef.current[index] = el)}
                                key={`${category}-${index}`}
                                onClick={() => {
                                    setActiveCategory(category)
                                    setActiveIndex(index)
                                }}
                                
                                className={`hide-scrollbar text-center font-bold w-full px-4 cursor-pointer ${category === selected ? 'text-purple-400' : 'text-black'}`}>
                                <p>{category}</p>
                            </div>
                        )
                    })}
            </div>
            <span
                style={{
                    left: underlineLeft,
                    width: underlineWidth,
                }}
                className='absolute bottom-0 block h-1 bg-purple-400 transition-all'
            />
        </div>
    )
}

export default Categories;