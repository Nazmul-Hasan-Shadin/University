/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import cors from 'cors'
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  request,
} from 'express'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

// application routes

app.use('/api/v1', router)


app.get('/', (req: Request, res: Response) => {
  const a = 23
  res.send(a)
})

app.use(globalErrorHandler)

// not found
app.use(notFound)

export default app
