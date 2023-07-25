function waitOneSecond(msg){
    return new Promise((resolve,_)=>{
        setTimeout(()=> resolve(`${msg}`),1000);
    });
}

async function CountOneToTen(){
    // ...을주면 값만 추출;  
    for(let x of [...Array(10).keys()]){
        let result= await waitOneSecond(`${x+1}초 대기 중..`);
        console.log(result);
    }
    console.log("완료");
}

CountOneToTen()