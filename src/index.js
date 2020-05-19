/**
 * Описание: Корневой файл приложения
 */
const express = require('express');

const config = require('./config');
const launch = require('./launch');

/**
 * Функция инициализирующая приложения
 * @returns {function}
 */
const init = (async () => {
	const app = express();

	// TODO: добавить загрузку файлов
	try {
		await launch({ app });
	} catch (error) {
		console.log(error);
    process.exit(1);
	}

	const { PORT, HOST, NODE_ENV } = config;

	app.listen({ port: PORT, host: HOST }, () => {
		app.get('log').info(`Server running at http://${HOST}:${PORT}, in ${NODE_ENV} mode. `)
	});

  // app.listen({ port: PORT, host: HOST }, () => {
  //   app.get('log').info(`Server running at http://${HOST}:${PORT}, in ${NODE_ENV} mode. `
  //     + `Swagger: http://${HOST}:${PORT}${config.API_URL_PREFIX}/documentation`);
	// });
  return app;
})();
