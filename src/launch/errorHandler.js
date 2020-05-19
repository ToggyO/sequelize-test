/**
 * Описание: Корневой обработчик ошибок запросов пользователей
 */
const { log } = require('./common');
const { ERROR_CODES } = require('../constants');

/**
 * Инициализация базового обработчика ошибок, возникающих при пользовательских запросах
 * @param {object} app - экземпляр приложения
 * @returns {void}
 */
module.exports.errorHandlerRun = ({ app }) => {
	app.use((err, req, res, next) => {
		if (!err.errorCode) {
			log.error(err);
		}
		if (err.statusCode && err.errorMessage) {
			const {
				statusCode, errorCode, errorMessage, errors = [],
			} = err;
			return res.status(statusCode).send({
				errorCode,
				errorMessage,
				errors,
			});
		}

		res.status(err.statusCode || ERROR_CODES.internal_server_error).send({
			errorCode: err.errorCode || ERROR_CODES.internal_server_error,
			errorMessage: err.errorCode && err.errorCode !== ERROR_CODES.internal_server_error
				? err.errorMessage : `Внутренняя ошибка сервера: ${err.errorMessage || err.message}`,
			errors: err.errors || [],
		});
	});
};