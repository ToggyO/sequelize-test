/**
 * Описание: Файл содержит функции валидаторы для сервиса пользователей
 */
import { Validator } from '@utils/validation';
import { ApplicationError } from '@utils/response';
import { ERROR_CODES } from '@constants';

export const UserValidator = Object.create({});

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
};
