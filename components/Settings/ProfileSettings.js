
'use client'

import BioInput from "./BioInput";
import ProfileAvatar from "./ProfileAvatar";
import BannerSettings from "./BannerSettings";

const ProfileSettings = ({settingsData}) => {
    return (
        <div 
            className="flex flex-col w-full box-border">
            <h2>Profile Settings</h2>
            <h3>Bio</h3>
            <BioInput settingsData={settingsData}/>
            <h3>Avatar</h3>
            <ProfileAvatar profileId={settingsData.image} userId={settingsData.id}/>
            <h3>Banner</h3>
            <BannerSettings bannerId={settingsData.bannerImage} userId={settingsData.id}/>
        </div>
    )
}  

export default ProfileSettings;