import { urlApi } from "@/fakeenv";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: number | string) => {
  if (!socket) {
    socket = io(urlApi, {
      query: { userId },
      transports: ["websocket"],
    });
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