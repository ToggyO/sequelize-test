/**
 * Описание: Глобальный роутинг приложения по версиям и инициализация моделей
 */
const { initializeV1Models, createV1Router } = require('../modules/v1/initialize');

/**
 * Инициализация моделей и роутинга для различных версий приложения
 * @param {object} app - экземпляр приложения
 * @returns {void}
 */
module.exports.modulesRun = ({ app }) => {
	initializeV1Models({ app });
	app.use('/', createV1Router());
};