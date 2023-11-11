import ApiError from '../error.js'
import models from '../models/models.js'


export const defaultController = {
	async get(req, res, next, model, returnSimpleResponse) {
		let {max, order, ...filter} = req.query || {}
		let params = {where: filter}
		if (max) params.limit = Number(max)
		if (order) {
			order = order.toUpperCase()
			if (order.match(/^DESC/)) order = 'DESC'
			else order = 'ASC'
			params.order = [['id', order]]
		}

		try {
			let response = await model.findAll(params)
			if (returnSimpleResponse) return response
			else return res.json(response)
		}
		catch(err) {
			return next(ApiError.badRequest(err.message))
		}
	},

	async add(req, res, next, model, returnSimpleResponse) {
		let {createdAt, updatedAt, ...attributes} = model.getAttributes()
		let fields = {}, errors = [];

		Object.values(attributes).forEach((value) => {
			if (value.allowNull === false && !req.body[value.fieldName])
				errors.push(value.fieldName)
			else if (!value.autoIncrement) fields[value.fieldName] = req.body[value.fieldName]
		})

		if (errors.length) return next(ApiError.badRequest(`Error when creating a new entrie. Missing attributes: ${errors.toString()}`))
		try {
			let response = await model.create(fields)
			if (returnSimpleResponse) return response
			else return res.json(response)
		}
		catch(err) {
			return next(ApiError.badRequest(err.message))
		}
	},

	async edit(req, res, next, model, returnSimpleResponse) {
		let {id, createdAt, updatedAt, ...attributes} = req.body || {}
		if (!id) return next(ApiError.badRequest(`Error when editing an entrie. Missing attribute 'id'`))
		
		let response = await model.update(
			attributes,
			{where: {id}}
		)
		if (returnSimpleResponse) return true
		else return res.json({message: `Updated ${response[0]} entries`})
	},

	async delete(req, res, next, model, returnSimpleResponse) {
		let id = req.query.id ? Number(req.query.id) : null
		if (!id) return next(ApiError.badRequest(`Error when deleting an entrie. Missing attribute 'id'. Note that this API uses query attributes for 'delete' method`))

		let response = await model.destroy({where: {id}})
		if (!response) return next(ApiError.badRequest(`Entrie with 'id'= ${id} not found`))

		if (returnSimpleResponse) return true
		else return res.json({message: `Entrie with 'id'= ${id} has been successfully deleted`})
}
}

export function getDefaultControllers (names = []) {
	let controllers = {}
	if (Array.isArray(names) && names.length) {
		names.forEach((item) => {
			controllers[item] = {
				async get(req, res, next) {
					return await defaultController.get( req, res, next, models[item] )
				},
				async add(req, res, next) {
					return await defaultController.add( req, res, next, models[item] )
				},
				async edit(req, res, next) {
					return await defaultController.edit( req, res, next, models[item] )
				},
				async delete(req, res, next) {
					return await defaultController.delete( req, res, next, models[item] )
				}
			}
		})
	}
	return controllers
}
