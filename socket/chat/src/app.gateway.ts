import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';

import cors from 'cors';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;
  //메시지 이벤트를 구독하는 리스너
  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: any): void {
    // 비구조화
    const { message, nickname } = data;
    // broadcast를 하면 전송 클라이언트 제외 모든 클라이언트 전송!
    socket.broadcast.emit('message', `${nickname}: ${message}`);
  }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
  constructor(private readonly chatGateway: ChatGateway) {}
  rooms = [];
  // 서버 인스턴스 접근
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createRoom')
  // data만 받는다
  handleMessage(@MessageBody() data) {
    const { nickname, room } = data;
    //rooms에다가 데이터 저장
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방을 만들었습니다. `,
    });
    this.rooms.push(room);
    // rooms이벤트로 채팅창 전송
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data) {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방에 입장했습니다. `,
    });
    socket.join(room);
  }

  @SubscribeMessage('message')
  handleMessageToRoom(socket: Socket, data) {
    const { nickname, room, message } = data;
    console.log(data);
    //room에 있는 사람들에게 메시지 전송
    socket.broadcast.to(room).emit('message', {
      message: `${nickname}: ${message}`,
    });
  }
}
