/**
 * Описание: Файл содержит роутинг и определения сваггера для модуля компаний партнеров
 */
// TODO: добавить сваггер
const { Router } = require('express');

const UserController = require('./user.controller');

/**
 * Роутер: Users
 */
module.exports = () => {
	const router = Router();

	router.get('/', UserController.getUsers);

	router.post('/create', UserController.createUser);

	router.put('/edit/:id', UserController.updateUser);

	router.delete('/delete/:id', UserController.deleteUser);

	return router;
};