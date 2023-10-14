


export const checkUsernameAvailability = async (username) => {
    const res = await fetch(`http://localhost:3000/api/register/username/availability/${username}`, {
        method: 'GET'
    }).then(async (res) => await res.json())

    console.log(`${username}: ${res.usernameAvailable}`)

    if(res?.usernameAvailable) {
        return res.usernameAvailable
    }
}