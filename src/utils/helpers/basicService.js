
/**
 * Описание: Конструктор сервисов, который используется для инициализации сервисов модулей
 */

export const basicService = {
	/**
   * Подготовка данных по схеме модели
   * @param values
   * @param options
   * @returns {*}
   * @private
   */
	_useSchema: (values = {}, options = {}) => {
		const {
			model: { rawAttributes },
			modelSchemaKey = '',
			callback = (data) => data,
			additionalAttributes = [],
		} = options;
		const modelAttributes = ((list = []) => (
			list.reduce((accumulator, [key, value = {}] = []) => [
				...accumulator,
				...(key && value[modelSchemaKey] ? [key] : []),
			], [...additionalAttributes])
		))(Object.entries(rawAttributes));
		const allowedValues = Object.keys(values).reduce((accumulator, attrKey) => ({
			...accumulator,
			...(modelAttributes.includes(attrKey) ? { [attrKey]: values[attrKey] } : {}),
		}), {});

		if (callback) return callback(allowedValues);

		return allowedValues;
	},

	/**
   * Получить перечень доступных аттрибутов по схеме модели
   * @param {object} props
   * @param {object} props.model
   * @param {array} props.additionalAttributes
   * @returns {*}
   * @private
   */
	_getModelAttributes: (props = {}) => {
		const {
			model: { rawAttributes },
			additionalAttributes = [],
		} = props;
		return ((list = []) => (
			list.reduce((acc, [key, value = {}] = []) => [
				...acc,
				...(key && !value._isHidden ? [key] : []),
			], [...additionalAttributes])
		))(Object.entries(rawAttributes));
	},

	/**
   * Предварительная подготовка и форматирование входных данных на создание / изменение сущности
   * @param {object} payload
   * @param {object} schema
   * @returns {object|array}
   */
	_dryPayload(payload = {}, schema = {}) {
		return (
			Object.keys(schema).reduce((accumulator, propName) => {
				let data = {};
				try {
					const value = schema[propName](payload[propName]);
					if (typeof value !== 'undefined') {
						data[propName] = value;
					}
				} catch (error) {
					data = {};
				}
				return {
					...accumulator,
					...data,
				};
			}, {})
		);
	},

};
