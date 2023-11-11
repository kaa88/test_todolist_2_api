import {defaultController} from './defaultController.js'
import {project, task} from '../models/models.js'


const taskController = {
	async get(req, res, next) {
		return await defaultController.get( req, res, next, task )
	},
	async add(req, res, next) {
		let response = await defaultController.add( req, res, next, task )
		updateCount(req.body.projectId)
		return response
	},
	async edit(req, res, next) {
		return await defaultController.edit( req, res, next, task )
	},
	async delete(req, res, next) {
		let response = await defaultController.delete( req, res, next, task )
		updateCount(req.body.projectId)
		return response
	},
}
export default taskController



async function updateCount(projectId) {
	if (typeof projectId !== 'number') return;
	let tasks = await task.findAll({where: {projectId}})
	project.update(
		{taskCount: tasks.length},
		{where: {id: projectId}}
	)
}
