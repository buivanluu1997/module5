const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'male',
    occupation: 'developer',
    nationality: 'American',
    city: 'New York',
    hobbies: ['reading', 'traveling', 'photography'],
    languages: ['English', 'Spanish'],
    education: {
        degree: 'Bachelor',
        major: 'Computer Science',
        university: 'Harvard University'
    }
};

//Hãy tạo ra 1 đối tượng student gồm các thuộc tính và giá trị lấy từ đối tượng person
// và hiển thị ra thông tin của student vừa tạo
let {firstName, gender, education: {degree}, languages:[english]} = person;
let student = {
    firstName,
    gender,
    degree,
    english
}
console.log(student);