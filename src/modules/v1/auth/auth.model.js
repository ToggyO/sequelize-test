/**
 * Описание: Слой для работы с таблицей рефреш токенов в базе данных
 */
import { Model, DataTypes } from 'sequelize';
import scheme from '@db/models/refreshToken';
import { db } from '@db';

export class AuthModel extends Model {}

export const initializeModel = () => {
	const sequelize = db.getSequelizeInstance();

	AuthModel.init(
		scheme(sequelize, DataTypes),
		{
			sequelize,
			modelName: 'refresh_token',
			tableName: 'refresh_tokens',
			timestamps: true,
		},
	);

	// AuthModel.beforeCreate((model) => {
	// 	const now = new Date();
	// 	const sevenDaysFromNow = now.setDate(now.getDate() + 7);
	// 	model.expiresIn = sevenDaysFromNow.toISOString();
	// });

	/**
   * Обратный вызов на момент инициализации всех доступных моделей
   * @param models
   */
	AuthModel.onAllModelsInitialized = (models = {}) => {
		const { UserModel } = models;

		AuthModel.belongsTo(UserModel, {
			foreignKey: 'user_id',
			as: 'user',
		});

		AuthModel._getModels = () => models;
	};

	return AuthModel;
};
