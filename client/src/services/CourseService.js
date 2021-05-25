export async function getAllCourses() {
    const response = await fetch('/api/courses/get');
    return await response.json();
}

export async function createCourse(data = {}){
    const response = await fetch('/api/courses', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}