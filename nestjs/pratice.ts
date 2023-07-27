const numbers: number[] = [1,2,3,4,5];
const stringArr: Array<string> = ["a","b","C"];  // using Generic Function

// Spread for add Array
const numbers2: number[]=[2,3,4];
const oneToTen = [...numbers, ...numbers2]
console.log(oneToTen)

// 객체 배열
const life: {name: string, birth: number} [] = [
    {name: "inbum", birth: 1998},
    {name: "jiyoung", birth: 2001},
    {name: "bomi", birth: 2002},
];

// 제너릭 객체 배열
const lifegeneric: Array<{ name: string, birth: number} >=[
    {name: "inbum", birth: 1998},
    {name: "jiyoung", birth: 2001},
    {name: "bomi", birth: 2002},
];

// tuple => 원소 개수만큼 정의
const myTuple : [string, number] = ["Korea", 2023]

// 튜플은 함수에 많이 적용
function myinfo(label: string, info:[string, number]):void{
    console.log(`[${label}]`,...info);
}

// Function Checking
myinfo("튜플 테스트", myTuple);

// destructuring
function fetchUser():[string, number]{
    return ["Bomi", 160];
}

const[x,y] = fetchUser();
console.log(x,y);

