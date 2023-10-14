import { NextResponse } from "next/server"


export const UpdateListItem = async (listItem) => {
    console.log('updating list item from updatelistitem func')
    const response = await fetch('http://localhost:3000/api/list/edit', {
        method: 'PUT',
        body: JSON.stringify({listItem: listItem}),
        headers: {
            "Content-Type": 'application/json'
        },

    } ).then(async (response) => await response.json())

    console.log('response from updatelistItem', response)

    return response;
}