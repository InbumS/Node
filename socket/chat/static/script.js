// 네임스페이스 지정
const socket = io('http://127.0.0.1:3000/chat');
const roomSocket = io('http://127.0.0.1:3000/room');
let currentRoom = '';
const nickname = prompt('닉네임을 입력해주세요.');
socket.on('connect', () => {
  console.log('connected');
});

function sendMessage() {
  if (currentRoom === '') {
    alert('방을 선택해주세요.');
    // return으로 끝낸다
    return;
  }
  const message = $('#message').val();
  //나:{메시지} 형태로 저장
  const data = { message, nickname, room: currentRoom };
  $('#chat').append(`<div>나: ${message}</div>`);
  roomSocket.emit('message', data);
  return false;
}

roomSocket.on('message', (data) => {
  // Message 는 개행을 위해서
  console.log(data);
  $('#chat').append(`<div>${data.message}</div>`);
});

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.message}</div>`);
});

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

roomSocket.on('rooms', (data) => {
  console.log(data);
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">join</button></li>`,
    );
  });
});

function joinRoom(room) {
  // 현재 룸을 나간다
  roomSocket.emit('joinroom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html('');
  currentRoom = room;
}
