const student1 = {
    firstName: "John",
    gender: "male",
    degree: "Bachelor",
    english: "English"
};

const student2 = {
    name: "Henry",
    gender: "male",
    english: "English"
};

const addStudent = ({firstName = "Quân", degree = "NA"}) => {
    const student = {
        firstName: firstName,
        degree: degree
    }
    console.log(student);
}

addStudent(student1);
addStudent(student2)