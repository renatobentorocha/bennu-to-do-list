import { Router } from 'express'
import UserController from './controllers/UserController'
import TaskController from './controllers/TaskController'

const routes = Router()

routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

routes.get('/tasks', TaskController.index)
routes.get('/tasks/:id', TaskController.show)
routes.post('/tasks', TaskController.store)
routes.put('/tasks/:id', TaskController.update)
routes.delete('/tasks/:id', TaskController.destroy)

export default routes
