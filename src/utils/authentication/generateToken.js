import jwt from 'jsonwebtoken';

import config from '@config';
import { CustomDate } from '@utils/format';

/**
 * Генерация токена
 * @param {int} userId - идентификатор пользователя
 * @param {string} login - логин пользователя
 * @return {string} - токен
 */
export const generateToken = ({ userId, login }) => {
	const {
		JWT_SECRET,
		JWT_ACCESS_EXPIRES_IN,
		JWT_REFRESH_EXPIRES_IN,
	} = config;

	return {
		accessToken: jwt.sign({
			userId,
			login,
			type: 'access',
		}, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRES_IN }),
		refreshToken: jwt.sign({
			userId,
			type: 'refresh',
		}, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN }),
		expire: new CustomDate().addHours(1).toISOString(),
	};
};
