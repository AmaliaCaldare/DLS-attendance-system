export async function getClasses() {
    const response = await fetch('/api/classes/get', {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function getClassesByCourseId(courseId) {
    const response = await fetch(`/api/classes/${courseId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function createClass(data = {}){
    const response = await fetch('/api/classes', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    return response.json();
}