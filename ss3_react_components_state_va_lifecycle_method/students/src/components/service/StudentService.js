const studentList = [
    {id: 1, name: "Nguyen Van An", age: 20},
    {id: 2, name: "Hoang Ngoc Huy", age: 18},
    {id: 3, name: "Tran Thanh Nhan", age: 21}
]

export function getAll(){
    return studentList;
}

export function addStudent(student){
    studentList.push(student);
}

export function deleteStudent(id){
    for (let i = 0; i < studentList.length; i++){
        if (studentList[i].id === id){
            studentList.splice(i, 1);
            break;
        }
    }
}