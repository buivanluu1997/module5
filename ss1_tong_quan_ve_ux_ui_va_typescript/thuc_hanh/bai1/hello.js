//duyệt qua từng phần tử của mảng
[1, 2, 3].forEach((num) => console.log(num));

//tạo mảng mới bằng cách áp dụng lên mảng cũ
const numbers = [1, 2, 3].map((num) => num * 2);
console.log(numbers);

//lọc các phần tử thoả mãn điều kiện trong hàm
const evens = [1, 2, 3].filter((num) => num % 2 === 0);
console.log(evens);

//gộp các phần tử thành 1 giá trị duy nhất dựa trên hàm được cung cấp
const sum = [1, 2, 3].reduce((total, num) => total + num, 0);
console.log(sum);

//•	Spread Operator (...)
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
console.log(newArr);

const obj = {a: 1, b: 2};
const newObj = {...obj, c: 3, d: 4};
console.log(newObj);

//•	Rest Parameter (...)
function sum1(...number) {
    return number.reduce((total, num) => total + num, 0);
}

console.log(sum1(1, 2, 3));

//Cú pháp Arrow Function
const add = (a, b) => a + b;
console.log(add(3,5));