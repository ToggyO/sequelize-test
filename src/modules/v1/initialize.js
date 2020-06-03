/**
 * Описание: Глобальная инициализация 1-й версии API
 */
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import config from '@config';
// инициализаторы роутинга
import { createRouter as createUserRouter } from './user/user.router';
// инициализаторы моделей
import { initializeModel as initializeUserModel } from './user/user.model';

/**
 * Инициализация роутинга
 * @returns {Router}
 */
export const createV1Router = () => {
	const router = Router();

	router.use('/users', createUserRouter());

	return router;
};

/**
 * Инициализация моделей
 * @param app
 * @returns {void}
 */
export const initializeModels = ({ app } = {}) => {
	const models = {};

	models.UserModel = initializeUserModel();

	Object.keys(models).forEach((modelKey) => {
		// Обратный вызов модели на событии полной готовности всех доступных моделей
		try {
			if (typeof models[modelKey].onAllModelsInitialized === 'function') {
				models[modelKey].onAllModelsInitialized(models);
			}
		} catch (error) {
			app.get('log').error(error);
		}
	});
};

/**
 * Инициализация сваггера
 * @param {string} basePath
 */
export const initializeSwagger = ({ basePath }) => {
	const { isProduction } = config;

	const modulesSwaggerSchemes = {
		/* eslint-disable global-require */
		...require('./user/swagger.json').schemas,
		/* eslint-enable global-require */
	};
	console.log(modulesSwaggerSchemes);
	const swaggerOptions = {
		swaggerDefinition: {
			openapi: '3.0.0',
			info: {
				title: 'Sequelize test API',
				version: '1.0',
				description: 'API Documentation',
			},
			basePath,
			servers: [
				{
					url: `http://${config.HOST}:${config.PORT}`,
					description: 'Local server',
				},
			],
			components: {
				schemas: {
					...modulesSwaggerSchemes,
					// successResponse: {}
				},
			},
		},
		apis: [`${process.cwd()}/src/modules/v1/*/*.router.js`],
	};

	const swaggerSpec = swaggerJsdoc(swaggerOptions);

	return swaggerUi.setup(swaggerSpec);
};
