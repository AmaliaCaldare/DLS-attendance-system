export async function getAllGroups() {
    const response = await fetch('/api/groups/get', {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function createGroup(data = {}){
    const response = await fetch('/api/groups', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}