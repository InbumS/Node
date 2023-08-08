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

// 타입을 바꿔가면 넣어야 하는 코드일시..
let anyValue: any = 10;
// 여러 라이브러리에서 타입이 지정 안될 시 any로 접근 가능
anyValue = "hello";
anyValue = true;

function prints(value: any): void{
    console.log(value);
}

function InfiniteLoop(): never{
    while (true){}
}

let anyValues: number | string | boolean = 10;
anyValues = "Goodday";
anyValues = false;

// 유니온 타입들의 형을 한정 지을 때
const str = typeof anyValues === "string";

//type 별칭을 통해 type 이름을 바꾸기 가능
type nsb = number | string | boolean;

// Intersection
type cup = {
    size: string;
};

type brand = {
    brandName : string;
};

// 두개의 인자를 갖는다
type brandedCup = cup & brand;
let starbuckGrandeSizeCup : brandedCup= {
    brandName: "스타벅스",
    size: "grande"
};

function echo(message: string): string{
    console.log(message);
    return message;
}

const FuncEcho = echo; 
type FuncEcho = (message:string) => string;
// 타입지정
const funcEcho2 : FuncEcho = echo;

// 객체 타입 함수
type FuncEcho3 = {
    (message: string): string;
};
const funcEcho3: FuncEcho3 = echo;