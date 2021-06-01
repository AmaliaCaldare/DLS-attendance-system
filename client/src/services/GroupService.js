export async function getAllGroups() {
    const response = await fetch('/api/groups/get', {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function getGroupById(id) {
    const response = await fetch(`/api/groups/${id}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function createGroup(data = {}){
    const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    return response.json();
}