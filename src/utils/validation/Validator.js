/**
 * Описание: Файл содержит класс хелпер (и функцию, инициализирующую его)
 * для валидации входных параметров запросов
 */
const { VALIDATION_ERRORS } = require('../../constants');

class Validator {	
	constructor({
		value,
		field,
		shouldTrimValue = true,
    additionalParams,
	}) {
    this.error = null;
    this.value = shouldTrimValue && typeof value === 'string' ? value.trim() : value;
    this.field = field;
    this.additionalParams = additionalParams;
	};

	/**
   * Константа, определяющая, необходимо ли возвращать массив ошибок пустым
   * @private shouldReturnEmptyError
   */
	#shouldReturnEmptyError = false;

	/**
   * Установить новую ошибку как результат валидации
   * @private
   * @param {string} errorMessage - сообщение об ошибке
   * @param {string} field - код ошибки
   * @param {string} errorCode - код ошибки
   * @param {object} additionalParams - дополнительные параметры для отображения ошибки на клиенте
   * @returns {object}
   */
	#setNewError = ({
		field,
		errorCode,
		errorMessage,
	}) => {
		this.error = {
			field,
			errorCode,
			errorMessage,
		};
	};

	/**
   * Вернуть результат валидации
   * @returns {object}
   */
  result = () => {
    if (this.#shouldReturnEmptyError) {
      return [];
    }
    return this.error ? [this.error] : [];
	};
	
	/**
   * Валидация: необязательный параметр
   * Останавливает цепочку валидации, при пустом проверяемом значении
   * @returns {this}
   */
  notRequired = () => {
    if (!this.value && this.value !== false) {
      this.#shouldReturnEmptyError = true;
    }
    return this;
	};
	
	/**
   * Валидация: обязательный параметр
   * @param required - если required === false, то метод работает как this.notRequired
   * @returns {this}
   */
	required = (required = true) => {
		if (this.error || this.#shouldReturnEmptyError) return this;
    if (!required) {
      this.notRequired();
      return this;
    }
		if (!this.value && this.value !== false && this.value !== 0) {
			this.#setNewError(VALIDATION_ERRORS.requiredField({ field: this.field }));
		}
		return this;
	};
	
  /**
   * Валидация: значение является числом
   * @returns {this}
   */
	isNumber = () => {
		if (this.error || this.#shouldReturnEmptyError) return this;
		if (typeof this.value !== 'number') {
			this.#setNewError(VALIDATION_ERRORS.isNumber({ field: this.field }));
		}
		return this;
	};
}

module.exports.Validator = Validator;