import express from 'express'
import getDefaultRouters from './defaultRouter.js'

const defaultRouterNames = [
	'project',
	'task',
	'comment',
	'file',
	'user'
]
const defaultRouters = getDefaultRouters(defaultRouterNames)

const mainRouter = express.Router()
defaultRouterNames.forEach((route) =>
	mainRouter.use('/' + route.toLowerCase(), defaultRouters[route])
)
// specific:
// mainRouter.use('/connect', connectionRouter)
// mainRouter.use('/user', userRouter)


export default mainRouter