/**
 * Описание: Файл для инициализации логгера.
 * Логгер может быть запущен в development(логирование в консоль) и production(логирование в файл) режимах.
 */
const LocalDevLogger = require('./strategies/local');
const ProdLogger = require('./strategies/production');

 /**
 * Система логирования
 * @param {object} props - опции для инициализации
 * @returns {object} - логгер
 */
module.exports = (props = {}) => {
	const { mode = 'development' } = props;
	return mode === 'production' ? new ProdLogger(props) : new LocalDevLogger(props);
};