import {create} from 'zustand'
import getConfig from 'next/config'

const store = (set) => ({
    titlePreference: 'userPreferred',
    getUserTitlePreference: async (userId) => {
        const response = await fetch(`https://localhost:3000/api/settings/get/${userId}`)
        .then(async (res) => await res.json())
        .catch((err) => {
            return false
        })
        
        if(!response) {
            return
        }else {
            const {titlePreference} = response;
            set({titlePreference: titlePreference.toString().toLowerCase()})
        }
    }
})


export const useTitlePreferenceStore = create(store)

 

