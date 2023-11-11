import express from 'express'
import controllers from '../controllers/index.js'

function defaultRouter(routeNames = []) {
	let routers = {}
	if (Array.isArray(routeNames) && routeNames.length) {
		routeNames.forEach((item) => {
			let router = express.Router()

			router.get('/', controllers[item].get)
			router.post('/', controllers[item].add)
			router.put('/', controllers[item].edit)
			router.delete('/', controllers[item].delete)

			routers[item] = router
		})
	}
	return routers
}

export default defaultRouter