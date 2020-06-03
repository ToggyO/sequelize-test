/**
 * Описание: Константы с возможными кодами ответов сервера
 */
export const ERROR_CODES = {
	success: 0,
	not_found: 1,
	// ошибки пользовательских данных
	validation: 400,
	// внутренние ошибки сервера
	internal_server_error: 500,
};
