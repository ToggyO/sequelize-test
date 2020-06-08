/**
 * Описание: миграции для таблицы users
 */

/**
 * Экспорт схемы для sequelize
 * @param {object} sequelize
 * @param {object} DataTypes
 * @returns {object}
 */
const scheme = (sequelize, DataTypes) => ({
	id: {
		type: DataTypes.BIGINT,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(45),
		unique: true,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	passwordHash: {
		type: DataTypes.STRING,
		allowNull: false,
		_isHidden: true,
	},
	name: {
		field: 'name',
		type: DataTypes.STRING,
		allowNull: false,
	},
	age: {
		field: 'age',
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	createdAt: {
		field: 'created_at',
		type: DataTypes.DATE,
		defaultValue: sequelize.fn('NOW'),
	},
	updatedAt: {
		field: 'updated_at',
		type: DataTypes.DATE,
		defaultValue: sequelize.fn('NOW'),
	},
});

module.exports = scheme;
