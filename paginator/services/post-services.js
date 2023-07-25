const paginator = require("../utils/paginators")
async function writePost(collection, post){
    post.hits=0 //조회수
    post.createdDt=new Date().toISOString();
    // 몽고디비에 POST 저장
    return await collection.insertOne(post);
}

async function list(collection, page, search){
    const perPage=10;
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
// require()로 파일을 임포트 시 외부로 노출되는 객체
module.exports ={
    list,
    writePost,
};