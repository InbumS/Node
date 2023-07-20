import http from 'k6/http';

export const options = {
    //가상유저 및 지속 시간
    vus:100,
    duration:"10s",
};

export default function (){
    http.get("http://localhost:8000");
}