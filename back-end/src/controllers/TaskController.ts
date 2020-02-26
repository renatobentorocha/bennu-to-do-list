import { Request, Response } from 'express'
import Task from '../schemas/Task'

class TaskController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const tasks = await Task.find()

      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).json('server error')
    }
  }

  public async show (req: Request, res: Response): Promise<Response> {
    try {
      const task = await Task.findById(req.params.id)

      return res.status(200).json(task)
    } catch (error) {
      console.log(error)
      return res.status(500).json('server error')
    }
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const task = await Task.create(req.body)

      return res.status(201).json(task)
    } catch (error) {
      return res.status(500).json('server error')
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })

      if (task) {
        return res.status(200).json(task)
      } else {
        return res.status(400).json('Task not found')
      }
    } catch (error) {
      return res.status(500).json('server error')
    }
  }

  public async destroy (req: Request, res: Response): Promise<Response> {
    try {
      const task = await Task.findByIdAndDelete(req.params.id)

      if (task) {
        return res.status(204).json()
      } else {
        return res.status(400).json('Task not found')
      }
    } catch (error) {
      return res.status(500).json('server error')
    }
  }
}

export default new TaskController()
