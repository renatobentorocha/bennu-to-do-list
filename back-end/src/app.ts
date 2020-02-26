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
    try {
      mongoose.connect('mongodb+srv://bennu:454545@cluster0-rt7cd.mongodb.net/bennu?retryWrites=true&w=majority', {
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
