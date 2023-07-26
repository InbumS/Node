const express = require("express");
const {ObjectId} =  require("mongodb");
const handlebars = require("express-handlebars");
const app = express();

// CALLBACK Function
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-services");
const { posts } = require("moongose/models");

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
    res.render("write",{title: "테스트 게시판",  mode: "create"});
});

app.post("/write",async(req,res)=>{
    const post = req.body;
    //글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    res.redirect(`/detail/${result.insertId}`)
})

app.get("/modify/:id", async(req,res)=>{
    // 들어오는 request가 axios와 같은 
    const{ id }= req.params.id;
    const post = await postService.getPostById(collection, req.params.id);
    console.log(post);
    res.render("write",{title:"테스트 게시판", mode : "modify", post});
});

app.post("/modify/", async(req,res)=>{
    const {id, title, writer, password, content} = req.body;
    // post DB안 구성요소
    const post = {
        title,
        writer,
        password,
        content,
        // 자주 쓰는 날짜 변형 형태
        createdDt: new Date().toISOString(),
    };
    const result = postService.updatePost(collection,id,post);
    res.redirect(`/detail/${id}`);
});

app.delete("/delete", async(req,res)=>{
    const {id, password} = req.body;
    try{
        const result = await collection.deleteOne({_id: ObjectId(id), password: password});
        if (result.deleteCount!==1){
            console.log("삭제 실패");
            return res.json({isSuccess: false});
        }
        return res.json({isSuccess: true});
    }
    catch(error){ // 데이터베이스 연결이 안되는 에러
        console.error(error);
        return res.json({isSuccess: false});
    }
});

app.post("/write-comment", async(req,res)=>{
    const {id, name, password, comment} =req.body;
    // 아이디로 댓글 정보 갖고 온다
    const post = await postService.getPostById(collection, id);
    // 댓글이 존재 시 추가
    if (post.comments) {
        post.comments.push({
            idx : post.comments.length+1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        });
    }
    else{
        // 이중 리스트 형식으로 선언
        post.comments=[{
            idx : 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
    },];
    }
    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});

// 댓글 삭제 API

app.delete("/delete-comment", async(req,res)=>{
    const {id, idx, password}=req.body;
    const post = await collection.findOne({
        _id: ObjectId(id),
        // 리스트에 조건에 맞는 데이터 존재시 도큐먼트를 결과값으로 제공
        comments: {$elemMatch: {idx:parseInt(idx), password}},
    },
    postService.projectionOption
    );

    if (!post){
        return res.json({isSuccess:false});
    }
    // 댓글 삭제 후 남은 댓글들을 다시 저장 
    post.comments = post.comments.filter((comment)=> comment.idx !=idx);
    postService.updatePost(collection,id,post);
    return res.json({isSuccess:true});
});

// 게시글 번호가 id로 매핑
app.get("/detail/:id",async(req,res)=>{
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail",{
        title: "테스트 게시판",
        post: result.value,
    });
});

app.post("/check-password", async(req,res)=>{
    const {id, password} = req.body;
    const post = await postService.getPostByIdAndPasswodrd(collection, {id,password});
    if (!post){
        return res.status(404).json({isExist : false});
    }else { 
        return res.json({isExist:true});
    }
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
