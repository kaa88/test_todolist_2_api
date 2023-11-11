import { Sequelize } from 'sequelize'

export default new Sequelize( // database, username, password, {settings}
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		dialect: 'mysql',
		host: process.env.DB_HOST,
		port: process.env.DB_PORT
	}
)
