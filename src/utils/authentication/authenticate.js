/**
 * Middleware для проверки прав доступа пользователя на основе его роли
 */
import jwt from 'jsonwebtoken';

import config from '@config';
import { UserController } from '@modules/v1/user/user.controller';
import { ApplicationError } from '@utils/response';
import { ERROR_CODES } from '@constants';

/**
 * Создание промежуточного обработчика для проверки прав доступа к роуту
 * @param {array|null} allowedRoles - массив разрешенных ролей. Если null, то разрешены все роли.
 * @returns {function} - промежуточный обработчик
 */
export const authenticate = (allowedRoles = []) => async (req, res, next) => {
	const { AUTHORIZATION_HEADER, JWT_SECRET } = config;
	const accessToken = ((req.get(AUTHORIZATION_HEADER) || req.get(AUTHORIZATION_HEADER.toLowerCase())) || '')
		.replace('Bearer ', '');
	const unauthorizedErrorPayload = {
		statusCode: 401,
		errorMessage: 'Access token is expired or invalid',
		errorCode: ERROR_CODES.security__invalid_token_error,
		errors: [],
	};

	if (!accessToken) {
		throw new ApplicationError(unauthorizedErrorPayload);
	}

	try {
		const decoded = await jwt.verify(accessToken, JWT_SECRET);
		const userData = await UserController._getEntityResponse({ id: decoded.userId });

		// if (allowedRoles !== null && !allowedRoles.includes(userData.role)) {
		// 	throw new ApplicationError({
		// 		statusCode: 403,
		// 		errorMessage: 'Доступ запрещен.',
		// 		errorCode: ERROR_CODES.security__no_permissions,
		// 		errors: [],
		// 	});
		// }

		if (allowedRoles !== null) {
			throw new ApplicationError({
				statusCode: 403,
				errorMessage: 'Доступ запрещен.',
				errorCode: ERROR_CODES.security__no_permissions,
				errors: [],
			});
		}

		req._userData = userData.dataValues;
	} catch (error) {
		throw new ApplicationError(unauthorizedErrorPayload);
	}

	next();
};
