/**
 * Описание: Файл содержит роутинг и определения сваггера для модуля компаний партнеров
 */
import { Router } from 'express';

import { UserController } from './user.controller';
import { asyncWrapper } from '../../../utils/helpers';

/**
 * Роутер: Users
 */
export const createRouter = () => {
	const router = Router();

	/**
	 * Get list of users
	 * @swagger
	 * path:
	 *  /users:
	 *      get:
	 *        tags:
	 *          - Users
	 *        description: Get users
	 *        summary: Get list of users
	 *        produces:
	 *          - application/json
	 *        responses:
	 *          200:
	 *            description: Successful operation
	 *            content:
	 *              application/json:
	 *                schema:
	 *                  type: object
	 *                  properties:
	 *                    errorCode:
	 *                      type: number
	 *                      example: 0
	 *                    resultData:
	 *                      type: object
	 *                      $ref: '#/components/schemas/User'
	 */
	router.get('/', asyncWrapper(UserController.getUsers));

	/**
	 * Get list user by id
	 * @swagger
	 * path:
	 *  /users/{id}:
	 *      get:
	 *        tags:
	 *          - Users
	 *        description: Get user by id
	 *        summary: Get user by id
	 *        produces:
	 *          - application/json
	 *        parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *            required: true
	 *        responses:
	 *          200:
	 *            description: Successful operation
	 *            content:
	 *              application/json:
	 *                schema:
	 *                  type: object
	 *                  properties:
	 *                    errorCode:
	 *                      type: number
	 *                      example: 0
	 *                    resultData:
	 *                      type: object
	 *                      $ref: '#/components/schemas/User'
	 */
	router.get('/:id', asyncWrapper(UserController.getUser));

	/**
	 * Create user
	 * @swagger
	 * path:
	 *  /users:
	 *      post:
	 *        tags:
	 *          - Users
	 *        description: Create user
	 *        summary: Create user
	 *        requestBody:
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/User'
	 *        responses:
	 *          201:
	 *            description: Successful operation
	 *            content:
	 *              application/json:
	 *                schema:
	 *                  type: object
	 *                  properties:
	 *                    errorCode:
	 *                      type: number
	 *                      example: 0
	 *                    resultData:
	 *                      type: object
	 *                      $ref: '#/components/schemas/User'
	 */
	router.post('/', asyncWrapper(UserController.createUser));

	/**
	 * Update current user
	 * @swagger
	 * path:
	 *  /users/{id}:
	 *      put:
	 *        tags:
	 *          - Users
	 *        description: Update current user
	 *        summary: Update current user
	 *        requestBody:
	 *          content:
	 *            application/json:
	 *              schema:
	 *                $ref: '#/components/schemas/User'
	 *        responses:
	 *          200:
	 *            description: Successful operation
	 *            content:
	 *              application/json:
	 *                schema:
	 *                  type: object
	 *                  properties:
	 *                    errorCode:
	 *                      type: number
	 *                      example: 0
	 *                    resultData:
	 *                      type: object
	 *                      $ref: '#/components/schemas/User'
	 */
	router.put('/:id', asyncWrapper(UserController.updateUser));

	/**
	 * Delete user by id
	 * @swagger
	 * path:
	 *  /users/{id}:
	 *      delete:
	 *        tags:
	 *          - Users
	 *        description: Delete user by id
	 *        summary: Delete user by id
	 *        parameters:
   *          - in: path
   *            name: id
   *            schema:
   *              type: integer
   *            required: true
	 *        responses:
	 *          200:
	 *            description: Successful operation
	 */
	router.delete('/:id', asyncWrapper(UserController.deleteUser));

	return router;
};
