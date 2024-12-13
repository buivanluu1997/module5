//1. Viết hàm kiểm tra 1 số có phải là số nguyên tố
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
};

console.log(isPrime(2));
console.log(isPrime(3));
console.log(isPrime(4));

//2. Cho 1 mảng số nguyên. Sử dụng filter để lọc ra các số là số nguyên tố
let arr = [1, 2, 3, 4, 5, 6];
let checkIsPrime = (arr) => {
    return arr.filter((num) => isPrime(num));
};
console.log(checkIsPrime(arr));