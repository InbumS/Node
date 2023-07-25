const express = require("express");
const handlebars = require("express-handlebars")
const app = express();

// CALLBACK Function
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-services");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Templete engine을 handlebars를 사용, helpers 함수 추가
app.engine("handlebars", handlebars.create({
     helpers: require("./configs/handlebars-helpers"),
    }).engine,
);
// Select template engine for webpage load
app.set("view engine","handlebars");
//__ 를 통해 절대경로 선택
app.set("views",__dirname+"/views");

app.get("/",async (req,res)=>{    
    // || 뒤는 기본 값을 설정
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try{
        // list 함수를 통해 글 목록과 페이지네이터(한 페이지에 일정한 수의 데이터만 보여주게 함)
        const [posts, paginator] = await postService.list(collection,  page, search);

        res.render("home", {title: "테스트 게시판", search, paginator, posts});
    }catch (error){
        console.error(error);
    }
});

app.get("/write",(req,res)=>{
    res.render("write",{title: "테스트 게시판"});
});

app.post("/write",async(req,res)=>{
    const post = req.body;
    //글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertId}`)
})

// 게시글 번호가 id로 매핑
app.get("/detail/:id",async(req,res)=>{
    const result = await postService
    res.render("detail",{
        title: "테스트 게시판"
    });
});

let collection; // Global scope
app.listen(3000, async ()=>  {
    console.log("server started");
    // mongodb 연결을 기다린다.
    const mongoClient = await mongodbConnection();
    // 컬렉션 선택 후 collection에 할당
    collection = mongoClient.db().collection("post");
    console.log("MongoDB CONNECTED")

});
