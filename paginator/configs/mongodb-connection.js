// API 호출을 위한 데이터 베이스 연결 MongoDB
const {MongoClient} =  require("mongodb");

const uri="mongodb://127.0.0.1:27017/test";

module.exports=function(callback){
    return MongoClient.connect(uri,callback);
}       