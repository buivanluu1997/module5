let arr = [1, 2, 3, 4, 5, 6];

arr.forEach((num) => console.log(num));

let newArr = arr.map( function(num){
    return num + 10;
});
console.log(newArr);

function check1(number) {
    if (number % 2 === 0) {
         return number + 10;
    } else {
        return number;
    }
}

let array = arr.map(number => {
    if (number % 2 === 0) {
        return number + 10;
    } else {
        return number;
    }
});
console.log(array);


