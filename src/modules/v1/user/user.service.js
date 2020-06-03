/**
 * Описание: Файл содержит сервис для модуля Партнеры
 */
import { getProp } from '@utils/helpers';
import { ERROR_CODES } from '@constants';
import { ApplicationError } from '@utils/response';
import { UserModel } from './user.model';
import { UserValidator } from './user.validator';
import { USER_ERROR_MESSAGES } from './constants';

// TODO: добавить basicService
export const UserService = Object.create({});

UserService._getModel = () => UserModel;
UserService._getModels = () => UserModel._getModels();

/**
 * Получить список пользователей
 * @param {object} where
 * @returns {Promise<object>}
 */
UserService.getUsers = async function ({
	where = {},
} = {}) {
	const users = await UserModel.findAndCountAll({ where });
	return {
		items: getProp(users, 'rows', []),
	};
};

/**
 * Получить пользователя
 * @param {object} where
 * @returns {Promise<object>}
 */
UserService.getUser = async function ({
	where = {},
} = {}) {
	return UserModel.findOne({ where });
};

/**
 * Создать пользователя
 * @param {object} values
 * @returns {object}
 */
UserService.createUser = async function ({ values = {} }) {
	await UserValidator.createUpdateUserValidator(values);

	// FIXME: заменить на dryPayloadValues
	const { name, age } = values;
	const createdUser = await UserModel.create({ name, age });

	return createdUser;
};

/**
 * Редактировать пользователя
 * @param {number|string} id
 * @param {object} values
 * @returns {object}
 */
UserService.updateUser = async function ({ id, values = {} }) {
	await UserValidator.createUpdateUserValidator(values);

	// FIXME: заменить на dryPayloadValues
	const { name, age } = values;
	const updatedUser = await UserModel.update(
		{ name, age },
		{
			where: { id },
			returning: true,
		},
	);

	return updatedUser[1][0];
};

/**
 * Загрузка файла компании-партнера
 * @param {number} id
 * @returns {number} - количество удаленных сущностей
 */
UserService.deleteUser = async function ({ id }) {
	const deletedRowsCount = await UserModel.destroy({ where: { id } });

	return deletedRowsCount;
};
