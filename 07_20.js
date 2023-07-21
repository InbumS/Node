// REST API를 사용한 비휘발성 게시판 예제

const express = require("express")
const app = express();
let posts=[]

// JSON Middleware 사용
app.use(express.json());
//express.json과 같이 사용, 컨텐트 타입이 application/x-www-form-urlencoded 파싱
app.use(express.urlencoded({extended: true}));

app.get("/",(_, res)=>{
  //json 형식으로 리스트를 보여준다
  res.json(posts);
});

app.post("/posts",(req, res) => {
  const {title, name, text}= req.body;  
  posts.push({id: posts.length+1, title, name, text, createdDt: Date()});
  res.json({title,name,text});
});

// 아이디를 통해 삭제 by params
app.delete("/posts/:id",(req,res)=>{
  const id=req.params.id;
  // id가 아닌것들만 리스트에 재 할당 (+id -> parseInt(id)) 
  const filteredPosts=posts.filter((post)=> post.id!== +id);
  const isLengthChanged = posts.length !== filteredPosts.length;
  posts=filteredPosts;
  if(isLengthChanged){
    res.json("OK");
    return;
  }
  res.json("NOT CHANGED");
});


app.listen(3000,()=>{
  console.log("연습 성공");
})