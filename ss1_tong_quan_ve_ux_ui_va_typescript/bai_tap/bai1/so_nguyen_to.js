//Bài1	Sử dụng ES6 ( arrow function, fitter)
// 1. Viết hàm kiểm tra 1 số có phải là số nguyên tố

let isPrime = (number) => {
    if (number <= 1) {
        return false;
    }
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

console.log(isPrime(2));
console.log(isPrime(3));
console.log(isPrime(4));

// 2. Cho 1 mảng số nguyên. Sử dụng filter để lọc ra các số là số nguyên tố
let array = [1, 2, 3, 4, 5, 6];
let filterIsPrime = (arr) => arr.filter((num) => isPrime(num));
let newArr = filterIsPrime(array);
console.log("Các số nguyên tố trong mảng: " + array + " đã lọc là: ")
console.log(newArr);