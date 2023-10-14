
import AccountSettings from "@/components/Settings/AccountSetting"
import ProfileSettings from "@/components/Settings/ProfileSettings";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useTitlePreferenceStore } from "@/context/titlePreferenceContext";


export default async function SettingsPage({ params }) {

    const session = await getServerSession(authOptions);
    const { userId } = params

    
    if (!session?.user || session?.user.id !== userId) {
        throw new Error("You are not authenticated")
    }


    const res = await fetch(`http:localhost:3000/api/settings/get/${session?.user.id}`, {
        method: "GET",
    }).then(async (res) => {
        const response = await res.json();
        if (response.status === 'success') {
            return response;
        } else {
            return false;
        }
    })

    if (!res) {
        throw new Error("Something went wrong")
    }

    return (
        <main className="w-full flex  justify-center pt-10 pb-10">
            <div className="lg:max-w-[900px] w-full flex flex-col px-8 lg:px-0">
                <h1 className="text-4xl font-bold mb-8">Settings</h1>
                <AccountSettings settingsData={res.data} />
                <ProfileSettings settingsData={res.data}/>
            </div>
        </main>
    )
}   