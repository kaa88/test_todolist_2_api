import {defaultController} from './defaultController.js'
import {task, comment} from '../models/models.js'


const commentController = {
	async get(req, res, next) {
		return await defaultController.get( req, res, next, comment )
	},
	async add(req, res, next) {
		let response = await defaultController.add( req, res, next, comment )
		updateCount(req.body.taskId)
		return response
	},
	async edit(req, res, next) {
		return await defaultController.edit( req, res, next, comment )
	},
	async delete(req, res, next) {
		let response = await defaultController.delete( req, res, next, comment )
		updateCount(req.body.taskId)
		return response
	},
}
export default commentController



async function updateCount(taskId) {
	if (typeof taskId !== 'number') return;
	let comments = await comment.findAll({where: {taskId}})
	task.update(
		{commentsCount: comments.length},
		{where: {id: taskId}}
	)
}
