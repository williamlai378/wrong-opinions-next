'use client'
import styled, { keyframes } from 'styled-components'
import convert from 'color-convert'
import { useTitlePreferenceStore } from '@/context/titlePreferenceContext'

const MovingImageAnimation = keyframes`
    from {
        background-position: 20% 0%;
    }
    to {
        background-position: 90% 0%;
    }
`

const BannerContainer = styled.div`
    min-height: 30vh;
    height: 30vh;
    background-image: radial-gradient(circle, rgba(${props => props.r},${props => props.g},${props => props.b},.15), rgba(${props => props.r},${props => props.g},${props => props.b},.8)), url("${props => props.imagesrc}");
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    animation: ${MovingImageAnimation} 15s linear infinite alternate;
`

const BannerSection = ({ bannerImage, color, title}) => {
    
    let bannerColor = [0,0,0];
    if(color) {
        bannerColor = convert.hex.rgb(color);
    }

    const titlePreference = useTitlePreferenceStore((state) => state.titlePreference);
    

    return (
        <BannerContainer imagesrc={bannerImage} r={bannerColor[0]} g={bannerColor[1]} b={bannerColor[2]} >
            <div
                className="w-full h-full bg-transparent flex justify-center items-center text-center p-4">
                <h1 
                    className='banner-title p-3 md:p-5 rounded-2xl shadow-2xl md:mb-8'>
                    {title[titlePreference]}
                </h1>
            </div>
        </BannerContainer>
    )
}

export default BannerSection;