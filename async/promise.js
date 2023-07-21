const DB=[];

function SaveDB(user){
    // 원래 DB 사이즈보다 크면 업데이트 성공!
    const oldDBSize = DB.length;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    // promise는 객체라서 new를 붙여준다
    return new Promise((resolve, reject)=>{ 
        if (DB.length > oldDBSize){
            resolve(user);
        }else{
            reject(new Error("Save DB Error!")); // 실패시 에러 발생
        }
    });
}

function sendEmail(user){
    console.log(`email to ${user.email}`);
    return new Promise((resolve)=> 
    {resolve(user);});
    //객체 반환
}

function getResult(user){
    return new Promise((resolve, reject)=>{ //Promise 객체 반환
        resolve(`success register ${user.name}`) 
    });
}

// Promise 객체만 then 가능
function registerByPromise(user){
    const result = SaveDB(user).then(sendEmail).then(getResult);
    console.log(result);
    return result;
}

// 객체 생성
const myUser = {email : "andy@test.com", password: "1234", name: "andy"};
//const result = registerByPromise(myUser);
//result.then(console.log)
allResult = Promise.all([SaveDB(myUser),sendEmail(myUser),getResult(myUser)]);
allResult.then(console.log);


