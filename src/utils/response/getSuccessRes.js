/**
 * Описание: Файл содержит глобальный конструктор успешного ответа на запрос
 */

/**
 * Глобальный конструктор успешного ответа на запрос
 * @param {object} [data] - объект с данными
 * @param {*} data.resultData - данные для отправки
 * @return {object} результат, отправляемый на клиент
 */
module.exports.getSuccessRes = ({
	resultData = null,
}) => ({
	errorCode: 0,
	resultData,
});