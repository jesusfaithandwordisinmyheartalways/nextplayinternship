



import { io } from 'socket.io-client'

export const socket = io('http://3.15.232.45:3001/', {
    transports: ['websocket'],
  });