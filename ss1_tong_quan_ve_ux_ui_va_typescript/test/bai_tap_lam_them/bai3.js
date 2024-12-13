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
//"Viết một function có tham số là một đối tượng bất kỳ .
// Function sẽ hiển thi ra 2 thuộc tính firstName và degree
//   + Nếu đối tượng truyền vào không có thuộc tính firstName thì
//   firstNam có giá trị mặc định là ""Quân"", tương tự với degree là ""NA"""
const addStudent = ({firstName = "Quan", degree = "NA"}) => {
    const student = {
        firstName,
        degree
    }
    console.log(student);
}
addStudent(student1);
addStudent(student2);