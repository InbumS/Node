const WebSocket=require('ws');
// Create Server Instance
const server = new WebSocket.Server({port:3000});
//  connection => 클라이언트 접속시 이벤트
server.on('connection', ws =>{
    ws.send('[서버 접속 완료]');
    // on을 통헤 이벤트를 받는다 
    ws.on('message', message=> {
    ws.send(`서버로부터 응답: ${message}`);
    });

    ws.on('close', ()=>{
        console.log('클라이언트 접속 해제');
    });
});