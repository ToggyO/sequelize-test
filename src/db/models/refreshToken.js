/**
 * Описание: миграции для таблицы refreshToken
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
	userId: {
		field: 'user_id',
		type: DataTypes.BIGINT,
		allowNull: false,
	},
	refreshToken: {
		field: 'refresh_token',
		type: DataTypes.STRING,
		allowNull: false,
		_isCreatale: true,
	},
	expiresIn: {
		field: 'expires_in',
		type: DataTypes.DATE,
		allowNull: false,
		// defaultValue: sequelize.literal(`${sequelize.fn('NOW')} + INTERVAL '7' days`),
		// defaultValue: sequelize.query("SELECT created_at + interval `7 day` FROM refresh_tokens", { type: QueryTypes.SELECT }),
		// defaultValue: sequelize.fn('ADDDATE', sequelize.fn('NOW'), 7),
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
	// FIXME: need to be tested
});

module.exports = scheme;
