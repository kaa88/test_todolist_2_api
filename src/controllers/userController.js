import {defaultController} from './defaultController.js'
import {comment, file, project, task, user} from '../models/models.js'


const userController = {
	async get(req, res, next) {
		return await defaultController.get( req, res, next, user )
	},
	async add(req, res, next) {
		let response = await defaultController.add( req, res, next, user, true )
		let userId = response.id
		await createDemoData(userId)
		return res.json(response)
	},
	async edit(req, res, next) {
		return await defaultController.edit( req, res, next, user )
	},
	async delete(req, res, next) {
		return await defaultController.delete( req, res, next, user )
	},
}
export default userController





// User Demo Data
const createDemoData = async (userId) => {
	let projectId = await createProjects(userId)
	let taskId = await createTasks(projectId)
	await createComments(taskId)
	await createFiles(taskId)
}

const createProjects = async (userId) => {
	let projectId = null
	for (let item of projects) {
		let response = await project.create({...item, userId})
		if (projectId === null) projectId = response.id
	}
	return projectId
}
const createTasks = async (projectId) => {
	let taskId = null
	for (let item of tasks) {
		let response = await task.create({...item, projectId})
		if (taskId === null) taskId = response.id
	}
	return taskId
}
const createComments = async (taskId) => {
	let parentId = null
	for (let item of comments) {
		let response = await comment.create({...item, taskId, parentCommentId: item.parentId === null ? null : parentId})
		if (parentId === null) parentId = response.id
	}
}
const createFiles = async (taskId) => {
	for (let item of files) {
		await file.create({...item, taskId})
	}
}

const projects = [
	{
		name: "Project One",
		taskCount: 4
	},
	{
		name: "Sunday sprint",
		taskCount: 0
	},
	{
		name: "Demo projects",
		taskCount: 0
	},
]
const tasks = [
	{
		"title": "Tempore saepe quos voluptatem totam a architecto",
		"description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore saepe quos voluptatem totam a architecto optio deleniti porro sint eveniet.",
		"createDate": '2023-10-04T16:56:00.000Z',
		"expireDate": '2024-11-04T16:00:00.000Z',
		"priority": "high",
		"status": "queue",
		"subtasks": [
			{
				"id": 10001,
				"title": "Tempore saepe quos voluptatem totam a architecto",
				"isDone": true
			},
			{
				"id": 10002,
				"title": "Hic id ratione sed minima, modi necessitatibus sit temporibus deleniti omnis rerum in quisquam eius beatae labore aperiam deserunt excepturi sint.",
				"isDone": false
			}
		],
		"commentsCount": 6,
		"filesCount": 5
	},
	{
		"title": "Lorem ipsum dolor sit amet consectetur adipisicing elit",
		"description": "Expedita voluptate nobis, quaerat autem consequuntur illo totam",
		"createDate": '2023-10-05T11:26:00.000Z',
		"expireDate": '2023-11-04T16:00:00.000Z',
		"priority": "normal",
		"status": "queue",
		"subtasks": [
			{
				"id": 10003,
				"title": "subtask1",
				"isDone": false
			},
			{
				"id": 10004,
				"title": "subtask2",
				"isDone": false
			}
		],
		"commentsCount": 0,
		"filesCount": 0
	},
	{
		"title": "Ex provident",
		"description": "",
		"createDate": '2023-04-04T16:00:00.000Z',
		"expireDate": '2023-11-04T16:00:00.000Z',
		"priority": "normal",
		"status": "queue",
		"subtasks": [
			{
				"id": 10005,
				"title": "adffasdgsdgaeasdfedwdaswaadafw",
				"isDone": true
			}
		],
		"commentsCount": 0,
		"filesCount": 0
	},
	{
		"title": "Molestias dolorem facilis enim culpa nisi voluptatum minima",
		"description": "illo totam?",
		"createDate": '2023-11-01T08:10:00.000Z',
		"expireDate": '2024-04-04T16:00:00.000Z',
		"priority": "top",
		"status": "development",
		"subtasks": [],
		"commentsCount": 0,
		"filesCount": 0
	}
]
const comments = [
	{
		"parentId": null,
		"date": '2023-11-01T16:56:00.000Z',
		"author": "Cesar",
		"content": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex provident, officia odio inventore pariatur dicta, quam saepe quas nostrum ducimus ut, adipisci perspiciatis asperiores illum laboriosam consequatur harum reiciendis. Ex voluptate dolor quae consequatur a eius dolorem quo ducimus optio laborum ab fugiat at, qui modi sit veniam sint. Molestias dolorem facilis enim culpa nisi voluptatum minima alias corporis eveniet quia, architecto impedit, earum maxime numquam blanditiis? Modi saepe blanditiis eligendi? Hic id ratione sed minima, modi necessitatibus sit temporibus deleniti omnis rerum in quisquam eius beatae labore aperiam deserunt excepturi sint. Expedita voluptate nobis, quaerat autem consequuntur illo",
		"rating": 5
	},
	{
		"parentId": 0,
		"date": '2023-11-03T22:06:02.000Z',
		"author": "author 3",
		"content": "some comment",
		"rating": 0
	},
	{
		"parentId": null,
		"date": '2023-10-28T10:24:00.000Z',
		"author": "Aaa",
		"content": "Ex voluptate dolor quae consequatur a eius dolorem quo ducimus optio laborum ab fugiat at, qui modi sit veniam sint. Molestias dolorem facilis enim",
		"rating": 1
	},
	{
		"parentId": 0,
		"date": '2023-11-02T05:55:00.000Z',
		"author": "%@#-funny-#@%",
		"content": "LOL!",
		"rating": 0
	},
	{
		"parentId": 3,
		"date": '2023-11-02T08:20:00.000Z',
		"author": "Cesar",
		"content": "Lorem ipsum dolor sit amet consectetur adipisicing elit!!!",
		"rating": 0
	},
	{
		"parentId": null,
		"date": '2023-11-05T22:41:00.000Z',
		"author": "hater#1",
		"content": "-1",
		"rating": 2
	}
]

const files = [
	{
		"date": '2023-04-04T16:00:00.000Z',
		"path": "document.docx",
		"description": ""
	},
	{
		"date": '2023-04-04T16:01:00.000Z',
		"path": "file2.jpg",
		"description": "image 2"
	},
	{
		"date": '2023-04-04T16:02:00.000Z',
		"path": "file3.jpg",
		"description": "image 3"
	},
	{
		"date": '2023-04-04T16:04:00.000Z',
		"path": "long_file_name_92093157.txt",
		"description": "txt 4"
	},
	{
		"date": '2023-04-04T16:05:00.000Z',
		"path": "img5555555.png",
		"description": "png file"
	}
]