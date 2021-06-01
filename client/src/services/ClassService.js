export async function getClasses() {
    const response = await fetch('/api/classes/get', {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function getClassById(id) {
    const response = await fetch(`/api/classes/class/${id}`, {
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

export async function getClassesByStudent(studentId) {
    const response = await fetch(`/api/classes/student/${studentId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function getClassesByTeacher(teacherId) {
    const response = await fetch(`/api/classes/teacher/${teacherId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    });
    return await response.json();
}

export async function createClass(data = {}){
    const response = await fetch('/api/classes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function updateAttendanceList(classId, data = {}){
    console.log(classId);
    const response = await fetch(`/api/classes/${classId}/attendance`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    });
    return response.json();
}