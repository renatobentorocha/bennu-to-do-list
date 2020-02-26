import { Router } from 'express'

import auth from "./middlewares/auth";
import UserController from './controllers/UserController'
import TaskController from './controllers/TaskController'
import SessionController from './controllers/SessionController'

const routes = Router()

routes.post('/session', SessionController.store)
routes.post('/users', UserController.store)

routes.use(auth)

routes.get('/users', UserController.index)

routes.get('/tasks', TaskController.index)
routes.get('/tasks/:id', TaskController.show)
routes.post('/tasks', TaskController.store)
routes.put('/tasks/:id', TaskController.update)
routes.delete('/tasks/:id', TaskController.destroy)

export default routes
