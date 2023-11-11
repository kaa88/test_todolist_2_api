import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

export const user = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	sortBy: {type: DataTypes.STRING, defaultValue: 'id'},
	showSubtasks: {type: DataTypes.BOOLEAN, defaultValue: false},
	queueAscendingOrder: {type: DataTypes.BOOLEAN, defaultValue: false},
	devAscendingOrder: {type: DataTypes.BOOLEAN, defaultValue: false},
	doneAscendingOrder: {type: DataTypes.BOOLEAN, defaultValue: false},
})

export const project = sequelize.define('project', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.TEXT},
	taskCount: {type: DataTypes.INTEGER, defaultValue: 0},
})

export const task = sequelize.define('task', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	title: {type: DataTypes.TEXT},
	description: {type: DataTypes.TEXT},
	createDate: {type: DataTypes.DATE},
	expireDate: {type: DataTypes.DATE},
	priority: {type: DataTypes.STRING, defaultValue: 'normal'},
	status: {type: DataTypes.STRING, defaultValue: 'queue'},
	subtasks: {type: DataTypes.JSON},
	commentsCount: {type: DataTypes.INTEGER, defaultValue: 0},
	filesCount: {type: DataTypes.INTEGER, defaultValue: 0},
})

export const comment = sequelize.define('comment', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	parentCommentId: {type: DataTypes.INTEGER},
	date: {type: DataTypes.DATE},
	author: {type: DataTypes.STRING},
	content: {type: DataTypes.TEXT},
	rating: {type: DataTypes.INTEGER},
})

export const file = sequelize.define('file', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	path: {type: DataTypes.STRING, allowNull: false},
	description: {type: DataTypes.TEXT},
	date: {type: DataTypes.DATE},
})

user.hasMany(project)
project.belongsTo(user)

project.hasMany(task)
task.belongsTo(project)

task.hasMany(comment)
comment.belongsTo(task)

task.hasMany(file)
file.belongsTo(task)

const models = {
	user,
	project,
	task,
	comment,
	file,
}
export default models