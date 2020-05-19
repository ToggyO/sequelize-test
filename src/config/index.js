/**
 * Описание: файл для экспорта конфигурациия приложения
 */
const env = require('./env');

const config = {
  ...env,
  API_URL_PREFIX: `/swagger/v${env.API_VERSION || 1}`,
  isProduction: env.NODE_ENV === 'production',
};

module.exports = config;
