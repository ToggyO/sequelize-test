/**
 * Описание: Файл содержит класс для работы с криптографическим функционалом
 */
import crypto from 'crypto';
import config from '../../config';

export class CustomCrypto {
  static #algorithm = 'aes-192-cbc';

  static #key = crypto.scryptSync(config.CRYPTO_SECRET, 'salt', 24);

  static #iv = Buffer.alloc(16, 0);

  /**
   * Зашифровать строку
   * @param {string} string - строка для шифрования
   * @returns {string} - шифр
   */
  static encrypt = string => {
  	const cipher = crypto.createCipheriv(this.#algorithm, this.#key, this.#iv);
  	console.log(cipher);
  	let encrypted = cipher.update(string, 'utf8', 'hex');
  	console.log(encrypted);
  	encrypted += cipher.final('hex');
  	console.log(encrypted);
  	return encrypted;
  }

  /**
   * Захешировать пароль
   * @param {string} password - пароль
   * @returns {string[]} - соль и хэш
   */
  static hashPassword = password => {
  	const salt = crypto.randomBytes(32).toString('hex');
  	console.log(crypto.randomBytes(32).toString('hex'));
  	console.log(crypto.randomBytes(32).toString('her'));
    const saltWithPepper = this.encrypt(salt);
    const hash = crypto.pbkdf2Sync(password, saltWithPepper, 2048, 124, 'sha512').toString('hex');
  	return [salt, hash];
  }

	/**
   * Сравнить пароль с захешированным паролем
   * @param {string} password - пароль
   * @param {string} passwordHash - хэш пароля
   * @returns {boolean} - эквивалентность пароля и захешированного пароля
   */
	static verifyPassword = (password, passwordHash) => {}
}
