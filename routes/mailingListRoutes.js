const express = require('express');
const router = express.Router();
const mailingListController = require('../controllers/mailingListController'); 
const authController = require('../controllers/authController');

/**
 * @swagger
 * tags:
 *   name: Mailing
 * components:
 *   schemas:
 *     MailingList:
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *       example:
 *         email: volunteer@email.com
 *
 *     ServerMessage:
 *       required:
 *       properties:
 *         message: string
 *       example:
 *         message: Server message text about failure (or success)
 */

/**
 * @swagger
 * /mailingList:
 *   get:
 *     summary: GET all mails
 *     tags: [Mailing]
 *     responses:
 *       200:
 *         description: The list of the mails
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MailingList'
 *       500:
 *          description: The list of the emails is not found
 *          content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ServerMessage'
 */
router.get('/', mailingListController.getAllMails);
router.get('/getlistmails', mailingListController.getListMails);

/**
 * @swagger
 *  /mailingList/{id}:
 *   get:
 *     summary: GET an mail by ID
 *     tags: [Mailing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The email id
 *     responses:
 *       200:
 *         description: The email response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MailingList'
 *       404:
 *         description: The email was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 * 
 *       500:
 *         description: The email is not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.get('/:id', mailingListController.getMailById);

/**
 * @swagger
 * /mailingList:
 *   post:
 *     summary: POST a new mail
 *     tags: [Mailing]
 *     requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/MailingList'
 *     responses:
 *       201:
 *         description: The email is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MailingList'
 *       400:
 *         description: The email is not created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.post('/', mailingListController.addMail);

/**
 * @swagger
 * /mailingList/{id}:
 *   put:
 *    summary: PUT (update) an mail by ID
*    tags: [Mailing]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The email id
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *          schema:
 *            $ref: '#/components/schemas/MailingList'
 *    responses:
 *      200:
 *        description: The email was updated
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/MailingList'
 *      400:
 *        description: The email was not found
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *      500:
 *        description: Some error happened
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.put('/:id',authController.protect, authController.resrictTo('admin'), mailingListController.updateMail);


/**
 * @swagger
 * /mailingList/{id}:
 *  delete:
 *     summary: DELETE an mail by ID
 *     tags: [Mailing]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The email id
 *
 *     responses:
 *       200:
 *         description: The email was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *       404:
 *         description: The email was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 *       500:
 *         description: The email is not deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerMessage'
 */
router.delete('/:id',authController.protect, authController.resrictTo('admin'), mailingListController.deleteMail);

module.exports = router;