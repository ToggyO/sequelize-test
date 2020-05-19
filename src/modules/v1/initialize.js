/**
 * Описание: Глобальная инициализация 1-й версии API
 */
const { Router } = require('express');

// инициализаторы роутинга
const createUserRouter = require('./user/user.router');

// инициализаторы моделей
const { initializeUserModel } = require('./user/user.model');

/**
 * Инициализация роутинга
 * @returns {Router}
 */
module.exports.createV1Router = () => {
	const router = Router();

	router.use('/users', createUserRouter());

	return router;
};

/**
 * Инициализация моделей
 * @param app
 * @returns {void}
 */
module.exports.initializeV1Models = ({ app } = {}) => {
	const models = {};

	models.UserModel = initializeUserModel();

	Object.keys(models).forEach(modelKey => {
    // Обратный вызов модели на событии полной готовности всех доступных моделей
		try {
			if (typeof models[modelKey].onAllModelsInitialized === 'function' ) {
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
// TODO: инициализация сваггера