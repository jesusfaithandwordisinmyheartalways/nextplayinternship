



import { io } from 'socket.io-client'

export const socket = io('https://nextplayinternshipserver.onrender.com', {
    transports: ['websocket'],
  });