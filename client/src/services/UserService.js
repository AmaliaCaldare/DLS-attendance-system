export async function getTeachers() {
    const response = await fetch('/api/teachers/get');
    return await response.json();
}

export async function getStudents() {
    const response = await fetch('/api/students/get');
    return await response.json();
}