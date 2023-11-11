import {getDefaultControllers} from './defaultController.js'
import task from './taskController.js'
import comment from './commentController.js'
import file from './fileController.js'
import user from './userController.js'

const defaultControllerNames = [
	'project',
	// 'task',
	// 'comment',
	// 'file',
	// 'user'
]
const defaultControllers = getDefaultControllers(defaultControllerNames)

const mainController = Object.assign(
	{},
	defaultControllers,
	{task},
	{comment},
	{file},
	{user},
)

export default mainController