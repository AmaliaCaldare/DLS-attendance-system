export async function getTeachers() {
    const response = await fetch('/api/teachers/get', {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function getTeacherById(id) {
    const response = await fetch(`/api/teachers/${id}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function getStudents() {
    const response = await fetch('/api/students/get', {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function createUser(data = {}){
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    return response.json();
}