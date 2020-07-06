/**
 * Описание: Файл содержит сервис для модуля Авторизации
 */
import { ERROR_CODES } from '@constants';
import { basicService, customCrypto } from '@utils/helpers';
import { ApplicationError } from '@utils/response';
import { generateToken } from '@utils/authentication';
import { UserService } from '@modules/v1/user/user.service';
import { AuthValidator } from './auth.validator';

export const AuthService = Object.create(basicService);

/**
 * Авторизация
 * @param {object} values - Объект пользователя
 * @param {string} values.email - Почтовый ящик пользователя
 * @param {string} values.password - Пароль пользователя
 * @returns {Promise<any>} - Результат
 */
AuthService.login = async (values = {}) => {
	const driedValues = AuthService._dryPayload(values, AuthService._getLoginPayloadScheme());

	await AuthValidator.login(driedValues);

	const invalidCredentialsErrorPayload = {
		statusCode: 400,
		errorMessage: 'User doesnt exist or credentials is wrong',
		errorCode: ERROR_CODES.authorization__invalid_credentials_error,
		errors: [],
	};

	const user = await UserService.getUser({ where: { email: driedValues.email } });

	if (!user) {
		throw new ApplicationError(invalidCredentialsErrorPayload);
	}

	const { passwordHash, salt } = user;
	const verifiedPassword = customCrypto.verifyPassword(
		driedValues.password,
		passwordHash,
		salt,
	);

	if (!verifiedPassword) {
		throw new ApplicationError(invalidCredentialsErrorPayload);
	}

	const tokens = generateToken({ userId: user.id, login: user.email });

	await user.createRefreshToken({
		userId: user.id,
		refreshToken: tokens.refreshToken,
		expiresIn: tokens.refreshExpire,
	});

	const authData = {
		id: user.id,
		email: user.email,
		// role: user.role,
		tokens,
	};

	return authData;
};

/**
 * Схема преобразования данных для аутентификации пользователя
 */
AuthService._getLoginPayloadScheme = () => ({
	email: value => value,
	password: value => value,
});
