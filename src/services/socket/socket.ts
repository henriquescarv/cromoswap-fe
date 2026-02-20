import { urlApi } from "@/fakeenv";
import { io, Socket } from "socket.io-client";
import useStore from "../store";

let socket: Socket | null = null;

export const connectSocket = (userId: number | string) => {
  if (!socket) {
    const state = useStore.getState();
    const token = state.login.token;

    socket = io(urlApi, {
      auth: { token },
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