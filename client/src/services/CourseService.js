export async function getAllCourses() {

    const response = await fetch('/api/courses/get');
    console.log(response);
    return await response.json();
}