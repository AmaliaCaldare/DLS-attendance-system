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