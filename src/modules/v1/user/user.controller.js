/**
 * Описание: Файл содержит контроллер для обработки роутинга модуля пользователей
 */
import { ApplicationError, getSuccessRes } from '@utils/response';
import { getProp } from '@utils/helpers';
import { BUSINESS_CONFLICT, ERROR_CODES } from '@constants';
import { UserService } from './user.service';
import { USER_ERROR_MESSAGES } from './constants';
import { UserModel } from './user.model';

// const { Op } = Sequelize;

export const UserController = {};

const notFoundErrorPayload = {
	statusCode: 404,
	errorMessage: USER_ERROR_MESSAGES.NOT_FOUND,
	errorCode: ERROR_CODES.not_found,
	errors: [],
};

/**
 * Получить пользователя как общий ответ
 * на операции создания / редактирования / получения по id
 * @param {string|number} id
 * @returns {Promise<object>}
 */
UserController._getEntityResponse = async ({ id }) => {
	const userAttributes = UserService._getModelAttributes({
		model: UserModel,
	});

	return UserService.getUser({
		where: { id },
		attributes: userAttributes,
	});
};

/**
 * Получить список пользователей
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
UserController.getUsers = async (req, res, next) => {
	try {
		const users = await UserService.getUsers({});

		res.status(200).send(getSuccessRes({ resultData: users }));
	} catch (error) {
		next(error);
	}
};

/**
 * Получить пользователя
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
UserController.getUser = async (req, res, next) => {
	try {
		const id = parseInt(getProp(req, 'params.id'), 10);
		if (!id) throw new ApplicationError(notFoundErrorPayload);

		const resultData = await UserController._getEntityResponse({ id });

		if (!resultData) throw new ApplicationError(notFoundErrorPayload);

		res.status(200).send(getSuccessRes({ resultData }));
	} catch (error) {
		next(error);
	}
};

/**
 * Создание пользователя
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
UserController.createUser = async (req, res, next) => {
	try {
		const body = getProp(req, 'body', {});
		const createdUser = await UserService.createUser({ values: body });

		const resultData = await UserController._getEntityResponse({ id: createdUser.id });

		res.status(201).send(getSuccessRes({ resultData }));
	} catch (error) {
		next(error);
	}
};

/**
 * Редактирование пользователя
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
UserController.updateUser = async (req, res, next) => {
	try {
		const body = getProp(req, 'body', {});
		const id = parseInt(getProp(req, 'params.id', {}), 10);
		// FIXME: убрать badParameterErrorPayload после создания проверки токена
		const badParameterErrorPayload = {
			statusCode: 400,
			errorMessage: USER_ERROR_MESSAGES.NO_USER_ID,
			errorCode: BUSINESS_CONFLICT,
			errors: [],
		};

		if (!id) throw new ApplicationError(badParameterErrorPayload);

		const updatedUser = await UserService.updateUser({
			id,
			values: body,
		});

		res.status(200).send(getSuccessRes({ resultData: updatedUser }));
	} catch (error) {
		next(error);
	}
};

/**
 * Удаление пользователя
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
UserController.deleteUser = async (req, res, next) => {
	try {
		const id = parseInt(getProp(req, 'params.userId', {}), 10);
		// FIXME: убрать badParameterErrorPayload после создания проверки токена
		const badParameterErrorPayload = {
			statusCode: 400,
			errorMessage: USER_ERROR_MESSAGES.NO_USER_ID,
			errorCode: BUSINESS_CONFLICT,
			errors: [],
		};

		if (!id) throw new ApplicationError(badParameterErrorPayload);

		const deletedRowsCount = await UserService.deleteUser({ id });

		if (deletedRowsCount === 0) throw new ApplicationError(notFoundErrorPayload);

		res.status(200).send(getSuccessRes({}));
	} catch (error) {
		next(error);
	}
};
