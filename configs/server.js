"use strict"

import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import apiLimiter from "../src/middlewares/request-limit.js"
import { dbConnection } from "./mongo.js"
import postRoutes from "../src/post/post.routes.js"
import commentRoutes from "../src/comment/comment.routes.js"
import { swaggerDocs, swaggerUi } from "./swagger.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/blog2023357/v1/post", postRoutes)
    app.use("/blog2023357/v1/comment", commentRoutes)
    app.use("/blog2023357/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
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
        console.log(`Swagger docs available at http://127.0.0.1:${process.env.PORT}/blog2023357/v1/api-docs`)
    }catch(err){
        console.log(`Error starting server: ${err}`)
    }
}