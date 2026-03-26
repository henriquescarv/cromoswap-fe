import { urlApi } from "@/fakeenv";
import { io, Socket } from "socket.io-client";
import useStore from "../store";

let socket: Socket | null = null;

export const connectSocket = (userId: number | string) => {
  if (!socket) {
    const state = useStore.getState();
    const token = state.login.token;

    console.log('🔌 Creating socket connection...', { urlApi, userId, hasToken: !!token });

    socket = io(urlApi, {
      auth: { token },
      query: { userId },
      transports: ["websocket"],
    });

    socket.on('connect', () => {
      console.log('✅ Socket connected, ID:', socket?.id);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
    });
  } else {
    console.log('♻️ Reusing existing socket connection, ID:', socket.id, 'connected:', socket.connected);
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};