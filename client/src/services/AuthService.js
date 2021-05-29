export async function getAccessToken(user) {
    const response = await fetch('/api/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    return response.json();
}

export function checkToken(userRoles){
    if(localStorage.getItem('token' === null)) {
        return false;
    }
    if(!userRoles.includes(localStorage.getItem('role'))) {
        return false;
    }

    return true;
}
