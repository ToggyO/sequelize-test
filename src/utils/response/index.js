/**
 * Описание: Файл для экспорта функций генерации ответов клиенту
 */
const { ApplicationError } = require('./applicationError');
const { getSuccessRes } = require('./getSuccessRes');

module.exports = {
	ApplicationError,
	getSuccessRes,
};