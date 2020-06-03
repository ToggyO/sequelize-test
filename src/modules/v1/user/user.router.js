/**
 * Описание: Файл содержит роутинг и определения сваггера для модуля компаний партнеров
 */
import { Router } from 'express';

import { UserController } from './user.controller';

/**
 * Роутер: Users
 */
export const createRouter = () => {
	const router = Router();

	/**
	 * Получить список компаний
	 * @swagger
	 * /users:
	 *    get:
	 *      tags:
	 *        - Users
	 *      description: Get users
	 *      summary: Get list of users
	 *      produces:
	 *      	- application/json
	 *      responses:
	 *      	'200':
	 *          description: Successful operation
	 *					content:
	 *						application/json:
	 *							schema:
	 *								type: object
	 *								properties:
	 *    	        		errorCode:
	 *                		type: number
	 *										example: 0
	 *									resultData:
	 *                		type: object
	 *										$ref: '#/components/schemas/User'
	 */

	router.get('/', UserController.getUsers);

	router.post('/create', UserController.createUser);

	router.put('/edit/:id', UserController.updateUser);

	router.delete('/delete/:id', UserController.deleteUser);

	return router;
};
