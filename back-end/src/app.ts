import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {  
    const url = process.env.MONGO_DB_URL as string;

    try {
      mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
