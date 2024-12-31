import dotenv from "dotenv";
dotenv.config();

import express from "express"

import serverConfig from "./framework/webserver/server"
import expressConfig from "./framework/webserver/express"

import http from "http"
import colors from 'colors.ts'
import connectDB from "./framework/database/mongodb/connection"
import routes from "./framework/webserver/routes"
import errorHandlingMidlleware from "./framework/webserver/middleware/errorHandlingMidlleware"
import {Server} from 'socket.io'

colors?.enable()

const app = express()
const server = http.createServer(app)
connectDB()
export const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE"],
    }
})


expressConfig(app)
routes(app);
app.use(errorHandlingMidlleware);

serverConfig(server).startServer();