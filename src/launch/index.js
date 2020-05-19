
const { commonRun } = require('./common');
const { dbRun } = require('./db');
const { modulesRun } = require('./modules');
const { errorHandlerRun } = require('./errorHandler');

/**
 * Инициализация приложения. Подключение к внешним зависимостям.
 * @param {object} app - экземпляр приложения
 * @returns {Promise<void>}
 */
module.exports = async ({ app }) => {
	commonRun({ app });
	await dbRun({ app });
	modulesRun({ app });
	errorHandlerRun({ app });
};