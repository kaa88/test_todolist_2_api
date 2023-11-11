import 'dotenv/config'
import { Op } from 'sequelize'
import sequelize from './db.js'
import models from './models/models.js'


const loginMaxDays = 7

async function cleanUsers() {
	let outdatedUsers = await getOutdatedUsers()
	let userDeleteList = [null].concat(outdatedUsers)
	let projectDeleteList = await getDeleteList(models.project, 'userId', userDeleteList)
	let taskDeleteList = await getDeleteList(models.task, 'projectId', projectDeleteList)

	await models.comment.destroy({
		where: {
			taskId: {
				[Op.or]: taskDeleteList
			}
		}
	})
	await models.file.destroy({
		where: {
			taskId: {
				[Op.or]: taskDeleteList
			}
		}
	})
	await models.task.destroy({
		where: {
			projectId: {
				[Op.or]: projectDeleteList
			}
		}
	})
	await models.project.destroy({
		where: {
			userId: {
				[Op.or]: userDeleteList
			}
		}
	})
	await models.user.destroy({
		where: {
			id: {
				[Op.or]: userDeleteList
			}
		}
	})
}
async function getOutdatedUsers() {
	const threshold = Date.now() - (loginMaxDays * 24 * 60 * 60 * 1000)
	let deleteList = []
	let users = await models.user.findAll()
	users.forEach(user => {
		let createdAt = user.createdAt ? user.createdAt.getTime() : 0
		if (createdAt < threshold) {
			deleteList.push(user.id)
		}
	})
	return deleteList
}

async function getDeleteList(model, whereType, whereValues) {
	if (typeof whereValues === 'number') whereValues = [whereValues]
	if (!Array.isArray(whereValues) || !whereValues.length) return []
	let items = await model.findAll({where: {
		[whereType]: {
			[Op.or]: whereValues
		}
	}})
	return items.map(item => item.id)
}





async function start() {
	try {
		await sequelize.authenticate()
			.then(() => {
				console.log('MySQL authentication is OK')
				console.log('DataBase cleaning script is in progress...')
				cleanUsers()
			})
	} catch (err) {
		console.log(err)
	}
}
start()
