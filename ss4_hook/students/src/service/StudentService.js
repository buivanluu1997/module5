const listStudent = [{id: 1, name: "Nguyen Van Trung", age: "18"},
    {id: 2, name: "Hoang Ngoc Huy", age: "17"},
    {id: 3, name: "Tran Trong Hoang", age: "18"}];

export function getAllStudent(){
    return listStudent;
}
export function addStudent(student){
    listStudent.push(student);
}
export function searchStudent(name){
    return listStudent.filter((student) => (
        student.name.toLowerCase().includes(name.toLowerCase())
    ))
}
export function deleteStudentById(id){
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id === id){
            listStudent.splice(i, 1);
            break;
        }
    }
}
export function studentFindById(id){
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].id === id){
            return listStudent[i];
        }
    }
}