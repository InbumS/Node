const paginator = require("../utils/paginators")
const {ObjectId} = require("mongodb")

async function writePost(collection, post){
    post.hits=0 //조회수
    post.createdDt=new Date().toISOString();
    // 몽고디비에 POST 저장
    return await collection.insertOne(post);
}

async function list(collection, page, search){
    const perPage= 10;
    // RegExp : 정교 표현식 (대/소 문자 구별 없이)
    const query = {title: new RegExp(search, "i")};
    // query를 찾는데 
    const cursor = collection.find(query, {limit: perPage, skip: (page-1) *perPage }).sort({
        createdDt: -1
    });
    const totalCount = await collection.count(query); //검색어에 나온 게시물 총합
    const posts = await cursor.toArray(); // cursor로 받아온것을 array로 변환
    const paginatorObj = paginator({totalCount, page, perPage: perPage});
    return [posts, paginatorObj];
}

const projectionOption= {
    // 결과값에서 내가 추출하고 싶은 것만 추출할때 사용 
    // 즉 비밀번호는 추출 안해!
    projection:{
        password:0,
        "comments.password":0,
    },
}

async function getDetailPost(collection, id){
    //$inc => 값을 1씩 증가한다는 의미 _id => mongodb의 id 필드
    return await collection.findOneAndUpdate({_id: ObjectId(id)},{ $inc: {hits:1}}, projectionOption);
}


async function getPostByIdAndPasswodrd(collection, {id, password}){
    return await collection.findOne({_id: ObjectId(id), password: password},projectionOption);
}

async function updatePost(collection, id, post){
    // set 속성값안에 존재하는 값만 update한다
    const toUpdatePost={
        $set:{
            ...post,
        },
    };
    return await collection.updateOne({_id: ObjectId(id)}, toUpdatePost);
}

//MongoDB에서 id 불러오기
async function getPostById(collection, id){
    return await collection.findOne({_id : ObjectId(id)}, projectionOption);
}

// require()로 파일을 임포트 시 외부로 노출되는 객체
module.exports ={
    list,
    writePost,
    getDetailPost,
    getPostById,
    getPostByIdAndPasswodrd,
    updatePost,
    
};