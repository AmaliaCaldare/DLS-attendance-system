export async function getAllCourses() {
    const response = await fetch('/api/courses/get', {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function getCourseById(id) {
    const response = await fetch(`/api/courses/${id}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function getCoursesByStudent(studentId) {
    const response = await fetch(`/api/courses/student/${studentId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function createCourse(data = {}){
    const response = await fetch('/api/courses', {
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
