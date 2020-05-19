/**
 * Описание: Файл содержит функции валидаторы для сервиса пользователей
 */
const { Validator } = require('../../../utils/validation');
const { ApplicationError } = require('../../../utils/response');
const { ERROR_CODES } = require('../../../constants');

const UserValidator = Object.create({});

UserValidator.createUpdateUserValidator = async function (values = {}) {
	const { name, age } = values;

	const errors = [
		...(new Validator({ value: name, field: 'name' }).required().result()),
		...(new Validator({ value: age, field: 'age' }).required().isNumber().result()),
	];

	if (errors.length) {
		throw new ApplicationError({
			statusCode: 400,
			errorMessage: 'User creation error',
			errorCode: ERROR_CODES.validation,
			errors,
		});
	}
}

module.exports.UserValidator = UserValidator;
