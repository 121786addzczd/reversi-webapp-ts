const v1: number = 1
console.log(v1)

let v2:number = 2
// v2 = 'hello' // 違う型の変数は代入することができない
console.log(v2)

let v3 = 3
console.log(v3)

let v4 = 4
// v4 = 'hello'
console.log(v4)

let v5: number| string = 5
v5 = 'hello'
console.log(v5)

// const arr1 = []
// arr1.push(1)
// console.log(arr1)

const arr2: number[] = [] //空の配列に値を入れる時は明示的に型を宣言
arr2.push(2)
console.log(arr2)
