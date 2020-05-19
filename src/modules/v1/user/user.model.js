/**
 * Описание: Слой для работы с таблицей компании партнера в базе данных
 */
const { Model, DataTypes } = require('sequelize');

const { db } = require('../../../db');
const scheme = require('../../../db/models/user');

class UserModel extends Model {};

module.exports.UserModel = UserModel;

module.exports.initializeUserModel = () => {
	const sequelize = db.getSequelizeInstance();

	UserModel.init(
		scheme(sequelize, DataTypes),
		{
			sequelize,
      modelName: 'user',
      tableName: 'users',
      timestamps: true,
		},
	);

	 /**
   * Обратный вызов на момент инициализации всех доступных моделей
   * @param models
   */
	UserModel.onAllModelsInitialized = (models = {}) => {
    UserModel._getModels = () => models;
	};

	return UserModel;
};

