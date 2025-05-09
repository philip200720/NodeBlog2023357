"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import apiLimiter from "../src/middlewares/request-limit.js"
import { dbConnection } from "./mongo.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {

}

const connectDB = async() => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Error connecting to database: ${err}`)	
    }
}

export const initServer = async() => {
    const app = express()
    try{
        middlewares(app)
        connectDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Error starting server: ${err}`)
    }
}