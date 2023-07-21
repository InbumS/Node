function waitOneSecond(msg){
    return new Promise((resolve,_)=>{
        setTimeout(()=> resolve(`${msg}`),1000);
    });
}

async function CountOneToTen(){
    // ...을주면 10면을 돌며 리스트에 숫자를 채운다
    for(let x of [...Array(10).keys()]){
        let result= await waitOneSecond(`${x+1}초 대기 중..`);
        console.log(result);
    }
    console.log("완료");
}

CountOneToTen()