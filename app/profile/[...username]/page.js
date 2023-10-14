
import '@/app/globals.css'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileHeader from "@/components/ProfilePageComponents/Header";
import ProfileBanner from "@/components/ProfilePageComponents/Banner";
import Content from "@/components/ProfilePageComponents/Content/Content";
import axios from "axios";

const avatarImages = [
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/403024_avatar_boy_male_user_young_icon_nq1coq.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/403023_avatar_user_woman_female_person_icon_atp1of.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/628297_avatar_grandmother_mature_old_person_icon_lcwkkx.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/628283_avatar_grandfather_male_man_mature_icon_sxycdw.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758640/Wrong%20Opinions/ninja-g0aca138d5_1280_pigrsb.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758641/Wrong%20Opinions/surprised-gfd0629ac5_1280_jtpp5h.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758641/Wrong%20Opinions/11766632_21378462_itnk9p.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758643/Wrong%20Opinions/29108294_JEMA_GER_1446-03_inmgvj.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676758644/Wrong%20Opinions/5685694_58659_cw3x4p.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676765610/Wrong%20Opinions/trash_gxsz1r.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676765850/Wrong%20Opinions/ramen_qu6tvx.webp",
    "https://res.cloudinary.com/dcuccwysz/image/upload/v1676765929/Wrong%20Opinions/swords_nmpevt.webp",
]

const bannerImages = [
    'https://res.cloudinary.com/dcuccwysz/image/upload/v1696692305/Wrong%20Opinions/wrong-opinions-banner-1_edapr8.webp',
    'https://res.cloudinary.com/dcuccwysz/image/upload/v1696692819/Wrong%20Opinions/wrong-opinions-banner-2_r3fxyx.webp',
    'https://res.cloudinary.com/dcuccwysz/image/upload/v1696695656/Wrong%20Opinions/jorg-angeli-CAMwIxYk5Xg-unsplash_opbphl.webp'
]

export default async function ProfilePage({ params }) {
    const { username } = params;

    const profileData = await axios.get(`http://localhost:3000/api/profile/${username[0]}`)
    .then((response) => response.data)
    .catch((error) => {
        console.log("fetch user error", error.response);
        throw new Error('User not found')
    })

    console.log('profile data', profileData?.data?.userData)



    
    return (
        <main className="min-h-[80vh] flex flex-col">
            <ProfileBanner 
                bannerImage={bannerImages[profileData.data.userData.bannerImage]} 
                username={username}
                />
            <ProfileHeader 
                username={username} 
                profileImage={avatarImages[profileData.data.userData.image]}
                bio={profileData.data?.userData?.bio ? profileData.data.userData.bio : ''}    
                />
            <Content 
                username={username}
                profileData={profileData.data}
                
                />
        </main>
    )
}