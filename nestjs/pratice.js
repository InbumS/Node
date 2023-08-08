var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var numbers = [1, 2, 3, 4, 5];
var stringArr = ["a", "b", "C"]; // using Generic Function
// Spread for add Array
var numbers2 = [2, 3, 4];
var oneToTen = __spreadArray(__spreadArray([], numbers, true), numbers2, true);
console.log(oneToTen);
// 객체 배열
var life = [
    { name: "inbum", birth: 1998 },
    { name: "jiyoung", birth: 2001 },
    { name: "bomi", birth: 2002 },
];
// 제너릭 객체 배열
var lifegeneric = [
    { name: "inbum", birth: 1998 },
    { name: "jiyoung", birth: 2001 },
    { name: "bomi", birth: 2002 },
];
// tuple => 원소 개수만큼 정의
var myTuple = ["Korea", 2023];
// 튜플은 함수에 많이 적용
function myinfo(label, info) {
    console.log.apply(console, __spreadArray(["[".concat(label, "]")], info, false));
}
// Function Checking
myinfo("튜플 테스트", myTuple);
// destructuring
function fetchUser() {
    return ["Bomi", 160];
}
var _a = fetchUser(), x = _a[0], y = _a[1];
console.log(x, y);
// 타입을 바꿔가면 넣어야 하는 코드일시..
var anyValue = 10;
// 여러 라이브러리에서 타입이 지정 안될 시 any로 접근 가능
anyValue = "hello";
anyValue = true;
function prints(value) {
    console.log(value);
}
function InfiniteLoop() {
    while (true) { }
}
var anyValues = 10;
anyValues = "Goodday";
anyValues = false;
// 유니온 타입들의 형을 한정 지을 때
var str = typeof anyValues === "string";
var starbuckGrandeSizeCup = {
    brandName: "스타벅스",
    size: "grande"
};
function echo(message) {
    console.log(message);
    return message;
}
var FuncEcho = echo;
// 타입지정
var funcEcho2 = echo;
var funcEcho3 = echo;
