/**
 * Описание: Файл содержит глобальный конструктор ошибки при обработке запроса
 */
const { INTERNAL_ERROR, ERROR_CODES } = require('../../constants');

class ApplicationError extends Error {
	constructor({
		errorMessage = 'Unknown error',
		errorCode = ERROR_CODES.internal_server_error,
		errors = [],
		statusCode = INTERNAL_ERROR,
	}) {
		super();

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this);
		} else {
			this.stack = new Error().stack;
		}

		this.errorMessage = errorMessage;
		this.errorCode = errorCode;
		this.errors = errors;
		this.statusCode = statusCode;
		this.name = 'ApplicationError';
	}
}

module.exports.ApplicationError = ApplicationError;