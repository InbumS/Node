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
