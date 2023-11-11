import {defaultController} from './defaultController.js'
import {task, file} from '../models/models.js'


const fileController = {
	async get(req, res, next) {
		return await defaultController.get( req, res, next, file )
	},
	async add(req, res, next) {
		let response = await defaultController.add( req, res, next, file )
		updateCount(req.body.taskId)
		return response
	},
	async edit(req, res, next) {
		return await defaultController.edit( req, res, next, file )
	},
	async delete(req, res, next) {
		let response = await defaultController.delete( req, res, next, file )
		updateCount(req.body.taskId)
		return response
	},
}
export default fileController



async function updateCount(taskId) {
	if (typeof taskId !== 'number') return;
	let files = await file.findAll({where: {taskId}})
	task.update(
		{filesCount: files.length},
		{where: {id: taskId}}
	)
}
