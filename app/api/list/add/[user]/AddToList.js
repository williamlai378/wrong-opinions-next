import axios from "axios"
export const AddToList = async (userId, listItemData) => {
    
    const res = await axios({
        url: `http://localhost:3000/api/list/add/${userId}`,
        method: 'POST',
        data: {
            listItemData
        }
    })
    

    return res;
}