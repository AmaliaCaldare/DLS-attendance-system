export async function getAllCourses() {
    const response = await fetch('/api/courses/get');
    return await response.json();
}

export async function createCourse(name, teacherId, students){
    const rawResponse = await fetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify({name, teacherId, students})
    });
    const content = await rawResponse.json();
    console.log(content);
}