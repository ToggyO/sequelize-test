/**
 * Описание: Файл содержит контроллер для обработки роутинга модуля пользователей
 */
const Sequelize = require('sequelize');

const UserService = require('./user.service');
const { getSuccessRes } = require('../../../utils/response');
const { getProp } = require('../../../utils/helpers');
const { ApplicationError } = require('../../../utils/response');
const { USER_ERROR_MESSAGES } = require('./constants');
const { ERROR_CODES, BUSINESS_CONFLICT } = require('../../../constants');
// const { Op } = Sequelize;

const UserController = Object.create({});

const notFoundErrorPayload = {
	statusCode: 404,
	errorMessage: USER_ERROR_MESSAGES.NOT_FOUND,
	errorCode: ERROR_CODES.not_found,
	errors: [],
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
		// FIXME: убрать badParameterErrorPayload после создания проверки токена
		const badParameterErrorPayload = {
			statusCode: 400,
			errorMessage: USER_ERROR_MESSAGES.NO_USER_ID,
			errorCode: BUSINESS_CONFLICT,
			errors: [],
		};

		if (!id) throw new ApplicationError(badParameterErrorPayload);
		
		const user = await UserService.getUser({
			where: { id },
		});

		if (!user) throw new ApplicationError(notFoundErrorPayload);
		
		res.status(200).send(getSuccessRes({ resultData: user }));
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
		const createdUser = await UserService.createUser({ values: req.body });
		
		res.status(201).send(getSuccessRes({ resultData: createdUser }));
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
		const id = parseInt(getProp(req, 'params.id', {}), 10);
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

module.exports = UserController;
