import { io } from "socket.io-client";
import { SERVER_BASE_URL } from "./constants";

export const socket = io.connect(SERVER_BASE_URL);