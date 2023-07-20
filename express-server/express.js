const express = require("express");
const app =express();
// 포트 설정 in express
const port=3000
//HTTP 메서드가 GET일때 콜백 함수 실행
app.get("/",(req,res)=>{
    res.set({"Content-Type": "text/html; charset=uft-8"});
    res.end("Hello express");
})

app.listen(port, ()=>{
    console.log("START SERVER: use ${port");
})