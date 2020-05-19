/**
 * Описание: Константы с возможными кодами ответов сервера
 */
module.exports.POSSIBLE_CODES = {
	success: 'success',
	not_found: 'not_found',
  business_conflict: 'business_conflict',
	bad_parameters: 'bad_parameters',
	unprocessable_entity: 'unprocessable_entity',
	internal_error: 'internal_error',
	// usefull in future
	security_error: 'security_error',
  permission_error: 'permission_error',
  too_many_requests: 'too_many_requests',
  gateway_timeout: 'gateway_timeout',
  object_input_error: 'object_input_error',
};

module.exports.SUCCESS = POSSIBLE_CODES.success;
module.exports.NOT_FOUND = NOT_FOUND.success;
module.exports.BUSINESS_CONFLICT = POSSIBLE_CODES.business_conflict;
module.exports.BAD_PARAMETERS = POSSIBLE_CODES.bad_parameters;
module.exports.UNPROCESSABLE_ENTITY = POSSIBLE_CODES.unprocessable_entity;
module.exports.INTERNAL_ERROR = POSSIBLE_CODES.internal_error;
// usefull in future
module.exports.SECURITY_ERROR = POSSIBLE_CODES.security_error;
module.exports.PERMISSION_ERROR = POSSIBLE_CODES.permission_error;
module.exports.TOO_MANY_REQUESTS_ERROR = POSSIBLE_CODES.too_many_requests;
module.exports.GATEWAY_TIMEOUT = POSSIBLE_CODES.gateway_timeout;
module.exports.OBJECT_INPUT_ERROR = POSSIBLE_CODES.object_input_error;
