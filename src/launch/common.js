/**
 * Описание: Конфигурация основных настроек сервера
 */
const bodyParser = require('body-parser');
const path = require('path');

const config = require('../config');
const logger = require('../utils/logger');
const pack = require('../../package.json');

(function SomeResource() {
  // Initially set the loaded status to a rejected promise
  this.loaded = Promise.reject(new Error('Resource not yet loaded!'));
})();
/**
 * Поиск необработанных ошибок
 * @param {object} app - экземпляр приложения
 * @returns {void}
 */
// FIXME: SENTRY NODE разобраться и, возможно, добавить
const unhandledRejection = ({ app }) => {
	const log = app.get('log');
	const unhandledRejections = [];
	const { isProduction } = config;

	// if (isProduction && SENTRY_DSN) {
  //   Sentry.init({ dsn: `${SENTRY_DSN}` }); // Логирование ошибок с помощью sentry.io
  // }

	process.on('unhandledRejection', (reason, promise) => {
		const errorMsgContent = `${reason.stack || reason}`;
		const errorMsg = errorMsgContent.replace(/(\r\n|\n|\r)|(\s{2,})/gm, ' ');
		log.warn(errorMsg);
		unhandledRejections.push(promise); // or Promise.reject(new Error())
	});

	process.on('rejectionHandled', (promise) => {
    const index = unhandledRejections.indexOf(promise);
    unhandledRejections.splice(index, 1);
  });
};

const log = logger({
	mode: config.NODE_ENV,
	app: {
    name: pack.name,
    version: pack.version,
  },
});

module.exports.log = log;

/**
 * Инициализация базовых промежуточных обработчиков
 * @param {object} app - экземпляр приложения
 * @returns {void}
 */
module.exports.commonRun = ({ app }) => {
	// подключение логирования к приложению
	app.set('log', log);
  // Отключение заголовка x-powered-by
  app.disable('x-powered-by');
  // Парсинг данных запроса
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
	// Указание двжка представлений
	const viewsPath = path.join(__dirname, '/views');
	app.set('view engine', 'hbs');
	app.set('views', viewsPath);
  // Обработка глобальных необработанных ошибок
	unhandledRejection({ app });
};